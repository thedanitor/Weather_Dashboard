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
var citySearch = "Seattle";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";
var query5day = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2f51e5636ace798720642f212b20ff1e"

$(".fa-search").on("click", function() {

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response.dt);
    // var a = (response.dt * 1000);
    // yearCurr = a.getFullYear();
    // monthCurr = (b.getMonth() + 1);
    // dayCurr = (b.getDate() + 1);
    dateCurr = (monthCurr + "/" + dayCurr + "/" + yearCurr);
    city = response.name;
    tempF = ((response.main.temp -273.15) * 1.8 + 32).toFixed(1);
    humid = response.main.humidity;
    windSpeed = response.wind.speed;

    $("#currCity").text(city + " " + dateCurr);
    $("#currTemp").text("Temperature: " + tempF + " F");
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
        console.log(responseUV);
        UV = responseUV.value;
        // console.log(responseUV.date_iso);
        $("#currUV").text("UV Index: " + UV);
    })

})
$.ajax({
    url: query5day,
    method: "GET"
}).then(function(response5) {
console.log(response5);
console.log(response5.list[0].dt);
var a = new Date(response5.list[0].dt * 1000);
// var months = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12];
year5 = a.getFullYear();
month5 = a.getMonth() + 1;
day5 = a.getDate() + 1;
console.log(month5 + "/" + day5 + "/" + year5);
    temp5 = ((response5.list[0].main.temp -273.15) * 1.8 + 32).toFixed(1);
    humid5 = response5.list[0].main.humidity;
    weathIcon5 = (response5.list[0].weather[0].icon);
    weathIconSrc5 = "http://openweathermap.org/img/w/" + weathIcon + ".png";
    date5 = month5 + "/" + day5 + "/" + year5;
    $("#date1").text(date5);
    $("#temp1").text("Temp: " + temp5 + " F");
    $("#humid1").text("Humidity: " + humid5 + " %");
    $("#icon1").attr("src", weathIconSrc5);





})


})