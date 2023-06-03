var submitButton = $("#inputButton");
var inputField = $("#inputField");
var cities = []

//search form user input
submitButton.on("click", function(event) {//upon click event function is called
    event.preventDefault();//prevents default refresh behavior

    var userInput = inputField.val();//establishes variable userInput with a value of the input field
    cities.push(userInput);//mutates empty cities array to add the value of the user input field
    localStorage.setItem("cities", JSON.stringify(cities));//creates the key of cities in local storage stringifies the value of the cities variable
    inputField.val("");//clears the input field
    populateButtons();//calls populate buttons function
    // console.log(userInput);
})



function populateButtons() {//executes pupulateButtons function
    var localList = localStorage.getItem("cities");//creates variable localList with the value of cities in local storage
    if (localList) {//if localList exists
        cities = JSON.parse(localList);//redefine the cities variable to the value of the json parsed string localList
    } else {
        cities = ["Atlanta", "Denver", "Boston"];//otherwise just keep these 3 values
    }
    
$("#buttons").empty();//empty the button so than only one populates per search
//dynamically creates buttons
for (i = 0; i < cities.length; i++) {//for loop
    var city = cities[i];
    var template = `<button type="button" class="btn btn-primary cityBtn">${city}</button>`;
    $("#buttons").append(template);

};

}

populateButtons();