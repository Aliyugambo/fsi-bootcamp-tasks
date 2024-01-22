// const iconElement = document.querySelector('.weather-icon');
const locationIcon = document.querySelector('.location-icon');
const tempElement = document.querySelector('#temperature-value');
const descElement = document.querySelector('#temperature-discription');
const locationElement = document.querySelector('#location');
const notificationElement = document.querySelector('#notification');


let input = document.getElementById('search');
let city = "";
let latitude = 0.0;
let longitude = 0.0;

input.addEventListener("keyup", function(event){

    if (event.keyCode ==13){
        event.preventDefault();

        city=input.value;
        getSearchweather(city);
        console.log(city);
    }
});

const weather ={};

weather.temperature = {
    unit: "celsius"
};

const KELVIN = 273;

const key ="12bc564a933705b5fcf528d988701f0e";

if ("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML= '<p>Browser does not suport geolocation</p>';
}

function setPosition(position){
    latitude=position.coords.latitude;
    longitude =position.coords.longitude;
    getWeather(latitude,longitude);

}

locationIcon.addEventListener("click", function(event){
    console.log('hey');
    getWeather(latitude,longitude);
});

function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p>${error.message}</p>`;
}

function getSearchweather(city){
    let api= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value=Math.round(data.main.temp -KELVIN);
            weather.description=data.weather[0].description;
            // weather.iconId= data.weather[0].icon;
            weather.city= data.name;
            weather.date=data.date;
            weather.country= data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function getWeather(latitude, longitude){
    let api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
   
    fetch(api)
        .then(function (response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value=Math.round(data.main.temp -KELVIN);
            weather.description=data.weather[0].description;
            // weather.iconId= data.weather[0].icon;
            weather.city= data.name;
           
            weather.country= data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    // iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML= `${weather.temperature.value} <span class="unit">c&#176;</span>`;
    descElement.innerHTML= weather.description;
    locationElement.innerHTML= `${weather.city}, ${weather.country}`;
    let date = new Date();
var current_date = date.toDateString();
document.getElementById('current-date').innerHTML = `<span>${current_date}</span>`;
}
