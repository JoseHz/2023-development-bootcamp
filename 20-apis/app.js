const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res) => {
  const query = req.body.cityName;
  const apikey = '8a76a53923021344f12a9c8409f122c3';
  const units = 'metric'

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=${units}`;

  console.log(url);
  
  https.get(url, response => {
    if (response.statusCode === 200) {
      response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const country = weatherData.sys.country;
        const city = weatherData.name;
        const icon = weatherData.weather[0].icon;
        console.log(temperature, country, city);
        res.send(`<h2>Consulta temperatura</h2>
        <p>Pais: ${country}</p>
        <p>Ciudad: ${city}</p>
        <p>Temperatura: ${temperature} grados centigrados</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png">`)
      })
    } else {
      console.log('statusCode', statusCode);
    }
  })
  
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})

