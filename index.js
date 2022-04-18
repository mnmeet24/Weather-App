// Select Elements

const iconElement=document.querySelector(".weather_icon");
const locationIcon=document.querySelector(".location_icon");
const tempElement=document.querySelector(".temperature_value p");
const descElement=document.querySelector(".temperature_description p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");


var input=document.getElementById("search")
let city=""
let latitude= 0.0
let longitude= 0.0

locationIcon.addEventListener("click",function(event)
{
  city=input.value;
  getSearchWeather(city);
  console.log(city);


})

//App Data
const weather={};

weather.temperature ={
   unit : "celsius"
}

//App consts and vars
const KELVIN = 273

//Api key
const key='d083bc7512090dd32bca9e937a53cae0' ;

//Check if browser supports geolocation
if("geolocation" in navigator)
{
   navigator.geolocation.getCurrentPosition(setPosition,showError)
}
else{
   notificationElement.style.display="block"
   notificationElement.innerHTML= "<p>Browser doesnt support geolocation</p>"
}

function setPosition(position){
   latitude = position.coords.latitude ;
   longitude = position.coords.longitude ;

   getWeather(latitude,longitude);
}

locationIcon.addEventListener("click",function(event)
{
   console.log("hey");
   getWeather(latitude,longitude)
})

// Show error when there is an issue with the geolocation service
function showError(error){
   notificationElement.style.display="block" ;
   notificationElement.innerHTML=`<p>${error.message}</p>`
}

function getSearchWeather(city){
   let api=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}` ;

   fetch(api)
   .then(function(response){
      let data=response.json();
      return data;
   })

   .then(function(data){
      weather.temperature.value=Math.floor(data.main.temp-KELVIN);
      weather.description=data.weather[0].description;
      weather.iconId=data.weather[0].icon;
      weather.city=data.name;
      weather.country=data.sys.country;
   })

   .then(function(){
      displayWeather()
   })
}

// Display weather to UI

function displayWeather()
{
   iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/> `;
   tempElement.innerHTML=`${weather.temperature.value} °<span>C</span>` ;
   descElement.innerHTML=weather.description ;
   locationElement.innerHTML=`${weather.city},${weather.country}` ; 
}


