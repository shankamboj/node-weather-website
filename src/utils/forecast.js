const request= require('request')

// const url = 'https://api.darksky.net/forecast/6cd16fa931ebbd579e1dc210dc111a14/37.8267,122.4233?units=si'

// request({ url: url,json: true},(error,response)=>{
//    // const data = JSON.parse(response.body)
//    if(error){
//        console.log("Unable to connect to weather service.")
//    }
//    else if(response.body.error){
//        console.log('unable to find location!')

//    }
//    else
//    {
//     console.log(response.body.daily.data[0].summary+"It is "+ response.body.currently.temperature+" degrees outside.The probability of rain is "+response.body.currently.precipProbability+"%")
//    }
// })

const forecast=(latitude,longitude,callback) =>
{
    const url = 'https://api.darksky.net/forecast/6cd16fa931ebbd579e1dc210dc111a14/'+latitude+','+longitude+'?units=si'

    request({ url,json: true},(error,{body})=>{
       // console.log(response.body)

     
       
       
    if(error){
        callback('Unable to connect to weather service.',undefined)
    }
    else if(body.error){
        callback('unable to find location',undefined)
        
    }
    else {

        callback(undefined ,"It is "+body.daily.data[0].summary+"It is "+ body.currently.temperature+" degrees outside .High today is "+body.daily.data[0].temperatureHigh+" with a low of " + body.daily.data[0].temperatureLow+" .The probability of rain is "+body.currently.precipProbability+"%" )
    }
})


}
module.exports=forecast