const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const path  = require('path')
// const express= require('express')

// //const hbs=require('hbs')
// const hbs = require('hbs')

// const geocode = require('./utils/geocode.js')
// const forecast = require ('./utils/forecast.js')
// // console.log(port)

// const app = express()
// const port = process.env.PORT || 3000
// //Define paths for express config
// const publicDirectoryPath = path.join(__dirname,'../public')
// const viewsPath = path.join(__dirname,'../templates/views')
// const partialPath= path.join(__dirname,'../templates/partials')


// //Setup handlebars engine and views locations
// app.set('view engine', 'hbs')
// app.set('views',viewsPath)//changing hbs files filder to look into from views(set by default) to viewsPath location                   
// hbs.registerPartials(partialPath)


// //setup static directory to serve(from html files)
// app.use(express.static(publicDirectoryPath))//page comes from the static directory

// app.get('',(req,res)=>{
//     res.render('index',{
//         title: 'Weather',
//         name : ' Shan'
//     })
// })      

// app.get('/about',(req,res)=>{
//     res.render('about',{
//         title: "About Me",
//         name: "Shan"
//     })
// })

// app.get('/help',(req,res)=>{
//     res.render('help',{
//         info : "Contact me for more info",
//         title : "Help",
//         name : "Shan"
//     })
// })  
// // app.get('',(req, res)=>{             Commented this because app.use(express.static(publicDirectoryPath))  is dominant over this because that one was written before and the lcoation is set acc to the file name and as the file name is index.html the home page is now that one...nnot this one
// //     res.send("<h1>Hello</h1>")
// // })



// app.get('/weather',(req,res)=>{
//     if(!req.query.adress){
//         res.send({
//             error: "Please provide an adress"
//         })
         
//     }
// geocode(req.query.adress,(error,{latitude , longitude , location }={})=>{
//         if(error){
//             return res.send({
//                 error : error       
//              })
//         }       
        
//         forecast(latitude,longitude,(error,forecastData)=> {
//                 if(error){

//                     return res.send({
//                         error:error
//                     })
//                 }
//                 res.send({
//                         forecast: forecastData,
//                         location ,
//                         adress:req.query.adress
//                 })

                     
//             // else {
//             // res.send({
//             //     forecast : "it is snowing" ,
//             //     location : "sirsa",
//             //     adress : req.query.adress
               
//             // })
//         //}
//     })
// })
// })




// app.get('/products',(req,res)=>{
//     if(!req.query.search) { 
//         res.send({
//             error: "You must provide a search term"
//         })
//     }
//     else{
//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
//     }
// })

// app.get('/help/*',(req,res)=>{
//     res.render('404',{
//         title: "Help 404" ,
//         name :"Shan" ,
//         errorMessage :"Help article not fount"
// })
// })



// app.get('*',(req,res)=>{
//     res.render('404',{
//             title :"404" ,
//             errorMessage : "Page 404 Not Found",
//             name: " Shan"
//         }
//     )
// })          

// app.listen(port,()=>{
//     console.log("Web server is star to up at "+port)
// })

