//URL: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
//URL 5 day : api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}


    


var citySearch = "Seattle";
var queryURL1 = "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=2f51e5636ace798720642f212b20ff1e";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2f51e5636ace798720642f212b20ff1e"

$(".fa-search").on("click", function() {

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);


})
})