const path  = require('path')
const express= require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')
// console.log(port)

const app = express()
const port = process.env.PORT || 300
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views',viewsPath)//changing hbs files filder to look into from views(set by default) to viewsPath location                   
hbs.registerPartials(partialPath)


//setup static directory to serve(from html files)
app.use(express.static(publicDirectoryPath))//page comes from the static directory

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name : ' Shan'
    })
})      

app.get('./about',(req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Shan"
    })
})

app.get('./help',(req,res)=>{
    res.render('help',{
        info : "Contact me for more info",
        title : "Help",
        name : "Shan"
    })
})  
// app.get('',(req, res)=>{             Commented this because app.use(express.static(publicDirectoryPath))  is dominant over this because that one was written before and the lcoation is set acc to the file name and as the file name is index.html the home page is now that one...nnot this one
//     res.send("<h1>Hello</h1>")
// })



app.get('./weather',(req,res)=>{
    if(!req.query.adress){
        res.send({
            error: "Please provide an adress"
        })
         
    }
geocode(req.query.adress,(error,{latitude , longitude , location }={})=>{
        if(error){
            return res.send({
                error : error       
             })
        }       
        
        forecast(latitude,longitude,(error,forecastData)=> {
                if(error){

                    return res.send({
                        error:error
                    })
                }
                res.send({
                        forecast: forecastData,
                        location ,
                        adress:req.query.adress
                })

                     
            // else {
            // res.send({
            //     forecast : "it is snowing" ,
            //     location : "sirsa",
            //     adress : req.query.adress
               
            // })
        //}
    })
})
})




app.get('/products',(req,res)=>{
    if(!req.query.search) { 
        res.send({
            error: "You must provide a search term"
        })
    }
    else{
    console.log(req.query.search)
    res.send({
        products: []
    })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "Help 404" ,
        name :"Shan" ,
        errorMessage :"Help article not fount"
})
})



app.get('*',(req,res)=>{
    res.render('404',{
            title :"404" ,
            errorMessage : "Page 404 Not Found",
            name: " Shan"
        }
    )
})          

app.listen(port,()=>{
    console.log("Web server is star to up at "+port)
})

