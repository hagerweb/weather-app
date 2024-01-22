// >>>>>>>>>>>>>> Today Variabels >>>>>>>>>>>>>>>>>>>>>>>>>>>>
let today = document.getElementById("today");
let todayNum = document.getElementById("todayNum");
let todayMon = document.getElementById("todayMon");
let todayLocation = document.getElementById("location");
let todayTemp = document.getElementById("temp");
let todayImg = document.getElementById("wImg");
let todayText = document.getElementById("text");
let todayHumidity = document.getElementById("umbrella");
let todayWind = document.getElementById("wind");
let todayDirection = document.getElementById("compass");
let searchCity = document.getElementById("search");
let findBtn = document.getElementById("find")
// ------------------------------------------------------------

// >>>>>>>>>>>>>> Next Variabels >>>>>>>>>>>>>>>>>>>>>>>>>>>>
let nextday = document.getElementsByClassName("nextday");
let nextDayImg = document.getElementsByClassName("nextDayImg");
let nextDayMax = document.getElementsByClassName("nextDayMax");
let nextDayMin = document.getElementsByClassName("nextDayMin");
let nextDayText = document.getElementsByClassName("nextDayText");
// ----------------------------------------------------------




// >>>>>>>>>>>>>>>>>> Weather API Data <<<<<<<<<<<<<<<<<<<<<<<<<<<
async function getData(city){
     let weatherResponse =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c99d8a3de22f436d8b7170826241901&q=${city}&days=3`);
     let weatherData =  await weatherResponse.json();
     return weatherData;
}
// ----------------------------------------------------------------



// >>>>>>>>>>>>> Display Weather Data For Today <<<<<<<<<<<<<<<<<<<<<<<
function displayData(data){
    let todayDate =  new Date();
     today.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"});
     todayNum.innerHTML = todayDate.getDate();
     todayMon.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});
      todayLocation.innerHTML= data.location.name;
      todayTemp.innerHTML= data.current.temp_c + "<sup>o</sup>C";
      todayImg.setAttribute("src", data.current.condition.icon);
      todayText.innerHTML= data.current.condition.text;
      todayHumidity.innerHTML= data.current.humidity +"%";
      todayWind.innerHTML= data.current.wind_kph +"km/h";
      todayDirection.innerHTML= data.current.wind_dir ;''
      
}

// ---------------------------------------------------------------------
// >>>>>>>>>>>>>>>>> Display Weather Data For =Towmorrow <<<<<<<<<<<<<<<

function displayTowmrow(data){

     
    
    for(let i=0 ; i<2; i++){

       

         let nextDayData =data.forecast.forecastday;

         let nextDate =  new Date(nextDayData[i+1].date);
         nextday[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"});
         
        nextDayMax[i].innerHTML = nextDayData[i+1].day.maxtemp_c + "<sup>o</sup>C";
        nextDayMin[i].innerHTML = nextDayData[i+1].day.mintemp_c + "<sup>o</sup>C";
        nextDayImg[i].setAttribute("src", nextDayData[i+1].day.condition.icon);
        nextDayText[i].innerHTML = nextDayData[i+1].day.condition.text;
    }

}

// >>>>>>>>>>>>>>>> Calling Functions <<<<<<<<<<

async function calling(city="London"){
    let getWeatherData =  await getData(city);

    if(!getWeatherData.error){
        displayData(getWeatherData);
        displayTowmrow(getWeatherData);
       

    }
   

   
}
calling();

searchCity.addEventListener("keyup" , function(){
    let search = searchCity.value;
    calling(search);
   
  
    
    
})