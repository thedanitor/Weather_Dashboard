//URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//URL 5 day : api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
//URL UV: http://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}

    

var weathIcon = "";
var weathIconSrc = "";
var latNum = "";
var longNum = "";
var citySearch = "Seattle";
var queryURL1 = "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2f51e5636ace798720642f212b20ff1e"

$(".fa-search").on("click", function() {

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    
    console.log(response);
    console.log(response.name);
    console.log(response.main.temp);
    tempF = ((response.main.temp -273.15) * 1.8 + 32).toFixed(1);
    console.log(tempF);
    console.log(response.main.humidity);
    console.log(response.wind.speed);

    $("#currCity").text(response.name);
    $("#currTemp").text("Temperature: " + tempF + " F");
    $("#currHumidity").text("Humidity: " + response.main.humidity + " %");
    $("#currWind").text("Wind Speed: " + response.wind.speed + " MPH");
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
        console.log(responseUV.value);
        console.log(responseUV.date_iso);
        $("#currUV").text("UV Index: " + responseUV.value);
    })

})
})