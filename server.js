const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request') 

let apiKey = "your_Open_Weather_Map_api_key"     // **** ADD YOUR OPEN WEATHER MAP API KEY BEFORE EXECUTING
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', function (req, res) { 

    res.render('weatherhome', {weather: null, error: null})


})

app.post('/', function(req, res) {
    
    //console.log(req.body.city)   // bodyParser allows you to access/parse info stored in req, res 
    
        let city = req.body.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      request(url, function (err, response, body) {
          if(err){
            res.render('weatherhome', {weather: null, error: 'Error, please try again'});
          } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
              res.render('weatherhome', {weather: null, error: 'Error, please try again'});
            } else {
              inCelsius = (weather.main.temp-32)*.5556
              let weatherText = `It's ${inCelsius.toPrecision(3)} degrees in ${weather.name}!`;
              res.render('weatherhome', {weather: weatherText, error: null});
            }
          }
        });
      })



app.listen(3002, function (){
    console.log('Testing at port 3002!')
})


