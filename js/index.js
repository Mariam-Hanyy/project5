let searchInput = document.getElementById("searchInput");
let weather=[];
let weatherLocation ="";

let form = document.getElementById("form");
form.addEventListener("submit",function(e){
    e.preventDefault()
})



async function checkWeather(index ="cairo"){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4759d3975c00448c8e1190708241101&q=${index}&days=3`)
    weather =(await response.json()).forecast.forecastday;
    
    displayData(index)
}

async function checkLocation(index ="cairo"){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4759d3975c00448c8e1190708241101&q=${index}&days=3`)
    weatherLocation =(await response.json()).location.name;
    displayData(weatherLocation)
    getWeather(weatherLocation)
}


function displayData(location ="cairo"){
    
    const date = new Date(weather[0].date);
    const date2 = new Date(weather[1].date);
    const date3 = new Date(weather[2].date);
    const options = { weekday: 'long' };
    const today = date.toLocaleDateString('en-US', options);
    const tommorrow = date2.toLocaleDateString('en-US', options);
    const afterTomm = date3.toLocaleDateString('en-US', options);
    let weatherToday =`
        <div class="row align-items-stretch weatherTable">
            <div class="col-md-4 py-3 day1 ">
              <div class="h-100">
                <div class="today px-2  d-flex justify-content-between align-items-center">
                  <p>${today}</p>
                  <p>${weather[0].date}</p>
                </div>
              <div class=" py-1 px-3 todayDetails ">
                <div>
                  <h5 class="text-capitalize" >${location}</h5>
                  <div class="weatherDegree d-flex justify-content-between align-items-center">
                    <h1>${weather[0].day.maxtemp_c}<sup>o</sup>C</h1>
                    <img  src=${weather[0].day.condition.icon} "alt=${weather[0].day.condition.text}>
                  </div>
                </div>

                <div >
                  <p class="conditionText">${weather[0].day.condition.text}</p>
                  <ul class="list-unstyled d-flex justify-content-between align-items-center">
                    <li><i class="fa-solid fa-umbrella"></i> <span>20%</span></li>
                    <li><i class="fa-solid fa-wind"></i> <span>18km/h</span></li>
                    <li><i class="fa-regular fa-compass"></i> <span>East</span></li>
                  </ul>
                </div>
              </div>
              </div>
            </div>

            <div class="tommorrow col-md-4 text-center py-3">
              
                <div class="h-100">
                  <div class="d-flex justify-content-center title" >
                    <p>${tommorrow}</p>
                  </div>
                    
                      <img class="icon" src=${weather[1].day.condition.icon} alt=${weather[1].day.condition.text}>
                      <h5 class="maxDeg">${weather[1].day.maxtemp_c}<sup>o</sup>C</h5>
                      <p class="minDeg">${weather[1].day.mintemp_c}<sup>o</sup></p>
                      <p class="conditionText">${weather[1].day.condition.text}</p>
                    
                </div>
              </div>

            <div class="col-md-4 day3 text-center py-3">
                <div class=" todayDetails h-100">
                <div class="today d-flex justify-content-center">
                  <p >${afterTomm}</p>
                </div>
                  
                <img class="icon" src=${weather[2].day.condition.icon} alt=${weather[2].day.condition.text}>
                <h5 class="maxDeg">${weather[2].day.maxtemp_c}<sup>o</sup>C</h5>
                <p class="minDeg">${weather[2].day.mintemp_c}<sup>o</sup></p>
                <p class="conditionText">${weather[2].day.condition.text}</p>
                  </div>
              
              </div>
            </div>
        `
        
        document.getElementById("weatherTable").innerHTML= weatherToday;
    }


searchInput.addEventListener('keyup',function(){
    let searchValue = searchInput.value;
    
    checkLocation(searchValue)

})


checkWeather()
