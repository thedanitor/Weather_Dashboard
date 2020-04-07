//URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//URL 5 day : api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
//URL UV: http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    
var city = "";
var dateCurr = "";
var yearCurr = "";
var monthCurr = "";
var dayCurr = "";
var year5 = "";
var month5 = "";
var day5 = "";
var date5 = "";
var tempF = "";
var tempF5 = "";
var humid = "";
var humid5 = "";
var windSpeed = "";
var UV = "";
var weathIcon = "";
var weathIcon5 = "";
var weathIconSrc5 = "";
var weathIconSrc = "";
var latNum = "";
var longNum = "";
var cityList = [];
var cityListItemEl = $("<li>").addClass("list-group-item");


var citySearch = "Seattle";

makeAjaxCall();
// var citySearch = searchEl.val();



// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2f51e5636ace798720642f212b20ff1e"


function makeAjaxCall (){
    localStorage.getItem(citySearch);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";
    var query5day = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    // console.log(response);
    // console.log(response.dt);
    // console.log(response.dt * 1000);
    var realDate = new Date(response.dt * 1000);
    // console.log(realDate.getFullYear());
    yearCurr = realDate.getFullYear();
    monthCurr = (realDate.getMonth() + 1);
    dayCurr = realDate.getDate();
    dateCurr = (monthCurr + "/" + dayCurr + "/" + yearCurr);
    city = response.name;
    tempF = ((response.main.temp -273.15) * 1.8 + 32).toFixed(1);
    humid = response.main.humidity;
    windSpeed = response.wind.speed;

    $("#currCity").text(city + " " + dateCurr);
    $("#currTemp").text("Temperature: " + tempF + " \xB0F");
    $("#currHumidity").text("Humidity: " + humid + " %");
    $("#currWind").text("Wind Speed: " + windSpeed + " MPH");
    weathIcon = (response.weather[0].icon);
    weathIconSrc = "http://openweathermap.org/img/w/" + weathIcon + ".png";
    $("#currIcon").attr("src", weathIconSrc);

    latNum = (response.coord.lat);
    longNum = (response.coord.lon);
    var queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?appid=2f51e5636ace798720642f212b20ff1e&lat=" + latNum + "&lon=" + longNum;

    $.ajax({
        url: queryURLUV,
        method: "GET"
    }).then(function(responseUV) {
        // console.log(responseUV);
        UV = responseUV.value;
        // console.log(responseUV.date_iso);
        // var UVdivEl = $("<div>", {"id": "UVdiv"});
        // UVdivEl.text(": " + UV);
        $("#UVbtn").text(UV);
    })

})
$.ajax({
    url: query5day,
    method: "GET"
}).then(function(response5) {
// console.log(response5);
// console.log(response5.list[0].dt);
for (var i = 6; i <= 39; i = i + 8) {

var a = new Date(response5.list[i].dt * 1000);
year5 = a.getFullYear();
month5 = a.getMonth() + 1;
day5 = a.getDate();
// console.log(month5 + "/" + day5 + "/" + year5);
    temp5 = ((response5.list[i].main.temp -273.15) * 1.8 + 32).toFixed(1);
    humid5 = response5.list[i].main.humidity;
    weathIcon5 = (response5.list[i].weather[0].icon);
    weathIconSrc5 = "http://openweathermap.org/img/w/" + weathIcon + ".png";
    date5 = month5 + "/" + day5 + "/" + year5;
    var cardDiv = $("<div>").addClass("card bg-primary date lg-col-2 med-col-4 sm-col-6");
    var date5El = $("<h5>").addClass("card-title");
    var iconImg = $("<img>").attr({"src": weathIconSrc5, "alt": "Weather icon"});
    var tempEl = $("<p>").addClass("text5day");
    var humidEl = $("<p>").addClass("text5day");
    
    cardDiv.append(date5El, iconImg, tempEl, humidEl);

    $(".date-row").append(cardDiv);
    date5El.text(date5);
    tempEl.text("Temp: " + temp5 + " \xB0F");
    humidEl.text("Humidity: " + humid5 + " %");
}

})
};


function renderCityList (){
    cityListItemEl.text(citySearch);
    $(".list-group").prepend(cityListItemEl);
};

console.log(citySearch);
$(".fa-search").on("click", function(event) {
    event.preventDefault();
    
for (var i = 0; i <= cityListItemEl.length; i++){
    $(".date-row").empty();
    citySearch = $(".form-control").val();
    localStorage.setItem(cityListItemEl, citySearch);
    renderCityList();
    console.log(citySearch);
    makeAjaxCall();
}
})