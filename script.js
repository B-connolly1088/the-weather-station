var submitButton = $("#inputButton");
var inputField = $("#inputField");
var cities = []
var apiKey = "1ed06e8681c5428384c238ca80f199dc"

//new url https://api.openweathermap.org/data/2.5/weather?q=houston&units=imperial&appid=

//search form user input
submitButton.on("click", function(event) {//upon click event function is called
    event.preventDefault();//prevents default refresh behavior

    var userInput = inputField.val();//establishes variable userInput with a value of the input field
    cities.push(userInput);//mutates empty cities array to add the value of the user input field
    localStorage.setItem("cities", JSON.stringify(cities));//creates the key of cities in local storage stringifies the value of the cities variable
    inputField.val("");//clears the input field
    populateButtons();//calls populate buttons function
    getApi(userInput);
    // console.log(userInput);
})



function populateButtons() {//executes pupulateButtons function
    var localList = localStorage.getItem("cities");//creates variable localList with the value of cities in local storage
    if (localList) {//if localList exists
        cities = JSON.parse(localList);//redefine the cities variable to the value of the json parsed string localList
    } else {
        cities = [];//otherwise just keep these 3 values
    }
    
$("#buttons").empty();//empty the button so that only one populates per search
//dynamically creates buttons
for (i = 0; i < cities.length; i++) {//establishing iteration through cities array
    var city = cities[i];//creating variable of city = to the index position of cities array
    var template = `<button type="button" class="btn btn-primary cityBtn">${city}</button>`;//creating a button
    $("#buttons").append(template);//appending button to the #buttons section

};

}

// var city = "Boston"

function getApi(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
    console.log(requestUrl);
  
    fetch(requestUrl)
      .then(function (response) {
        // console.log(response);
        return response.json();
        
      }).then(function(response) {
        var data = response[0];
        var longitude = data.lon;
        var latitude = data.lat;
        dailyForcast(latitude, longitude);
        fiveDay(latitude, longitude);
      })
  }

  function dailyForcast(lat, lon) {
    console.log(lat, lon);


  }



  function fiveDay(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(url)
    .then(function (response) {
      return response.json();
      
    }).then(function(data) {
      console.log(data);
      var days = [];
      for (let i = 0; i < data.list.length; i+=8) {
        const day = data.list[i];
        days.push(day);
        
        
      }
      console.log(days);
      var fiveDay = $("#fiveDay");
      fiveDay.empty();
      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        var template = `
        <div class="card bg-success p-3 col">
          <div class="card-body">
            <h3>${day.dt_txt}</h3>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <div>Temp: <span>${day.main.temp}</span> *F</div>
            <div>Wind: <span>${day.wind.speed}</span> MPH</div>
            <div>Humidity: <span>${day.main.humidity}</span> %</div>
          </div>
        </div>
        `
        fiveDay.append(template);
      }
      
    })

    
  }


// getApi();

  

populateButtons();