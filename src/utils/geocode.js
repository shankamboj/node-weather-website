
const request= require('request')



// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angel.json?access_token=pk.eyJ1Ijoic2hhbmthbWJvaiIsImEiOiJjandpd2RqMXEwMWFlM3lxcGE4OHN4ZmgyIn0.mVuxK1czMrRMoBxLM4G1Wg&limit=1'

// request({ url : geocodeURL,json:true},(error,response)=>{
//     if(error){
//         console.log('Unable to conmect to weather service 2')
//     }
//     else if(response.body.features.length==0){
//         console.log('Location entered is invalid')
//     }
//     else
//     {
//     const latitute = response.body.features[0].center[1]
//     const longitute = response.body.features[0].center[0]
//     console.log('latitute '+latitute)
//     console.log('longitute '+longitute)
//     }
// }
// )





const geocode= (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2hhbmthbWJvaiIsImEiOiJjandpd2RqMXEwMWFlM3lxcGE4OHN4ZmgyIn0.mVuxK1czMrRMoBxLM4G1Wg&limit=1'
       //writing url except of url : url           
    request({url  , json : true},(error,{body}={})=>{//creatinng body variable from response object's data
            if(error)
            {
                callback('Unable to conmect to weather service 2',undefined)
            }
             else if(body.features.length==0){
                 callback('Location entered is invalid',undefined)
        }
        else
        {

            
            callback(undefined,{
                //latitute : "shan"
                 latitude : body.features[0].center[1] ,    //wriiting body rather than respponse.body.....
                 longitude :body.features[0].center[0] ,
                 location : body.features[0].place_name
            })
        }
        })
}



module.exports= geocode