
var cityList = JSON.parse(localStorage.getItem("cityName")) || [];
var cityListNames = [];
var cityListEl = $("list-group");

if (cityList.length > 0) {
  renderCityList();
  makeAjaxCall(cityList[cityList.length - 1]);
}

function makeAjaxCall(citySearch) {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid=2f51e5636ace798720642f212b20ff1e";
  var query5day =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearch +
    "&appid=2f51e5636ace798720642f212b20ff1e";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var realDate = new Date(response.dt * 1000);
    var yearCurr = realDate.getFullYear();
    var monthCurr = realDate.getMonth() + 1;
    var dayCurr = realDate.getDate();
    var dateCurr = monthCurr + "/" + dayCurr + "/" + yearCurr;
    var city = response.name;
    var tempF = ((response.main.temp - 273.15) * 1.8 + 32).toFixed(1);
    var humid = response.main.humidity;
    var windSpeed = response.wind.speed;

    $("#currCity").text(city + " " + dateCurr);
    $("#currTemp").text("Temperature: " + tempF + " \xB0F");
    $("#currHumidity").text("Humidity: " + humid + " %");
    $("#currWind").text("Wind Speed: " + windSpeed + " MPH");
    var weathIcon = response.weather[0].icon;
    var weathIconSrc = "http://openweathermap.org/img/w/" + weathIcon + ".png";
    $("#currIcon").attr("src", weathIconSrc);

    var latNum = response.coord.lat;
    var longNum = response.coord.lon;
    var queryURLUV =
      "http://api.openweathermap.org/data/2.5/uvi?appid=2f51e5636ace798720642f212b20ff1e&lat=" +
      latNum +
      "&lon=" +
      longNum;

    $.ajax({
      url: queryURLUV,
      method: "GET",
    }).then(function (responseUV) {
      var UV = responseUV.value;
      if (UV <= 3) {
        $("#UVdiv").removeClass();
        $("#UVdiv").addClass("bg-success");
      }
      if (UV <= 6 && UV > 3) {
        $("#UVdiv").removeClass();
        $("#UVdiv").addClass("bg-warning");
      }
      if (UV > 6) {
        $("#UVdiv").removeClass();
        $("#UVdiv").addClass("bg-danger");
      }
      $("#UVbtn").text(UV);
      $("#UVdiv").text(UV);
    });
  });
  $.ajax({
    url: query5day,
    method: "GET",
  }).then(function (response5) {
    for (var i = 6; i <= 39; i = i + 8) {
      var a = new Date(response5.list[i].dt * 1000);
      var year5 = a.getFullYear();
      var month5 = a.getMonth() + 1;
      var day5 = a.getDate();
      var temp5 = ((response5.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(1);
      var humid5 = response5.list[i].main.humidity;
      var weathIcon5 = response5.list[i].weather[0].icon;
      var weathIconSrc5 = "http://openweathermap.org/img/w/" + weathIcon5 + ".png";
      var date5 = month5 + "/" + day5 + "/" + year5;
      var cardDiv = $("<div>").addClass(
        "card bg-primary date lg-col-2 med-col-4 sm-col-6"
      );
      var date5El = $("<h5>").addClass("card-title");
      var iconImg = $("<img>").attr({
        src: weathIconSrc5,
        alt: "Weather icon",
      });
      var tempEl = $("<p>").addClass("text5day");
      var humidEl = $("<p>").addClass("text5day");

      cardDiv.append(date5El, iconImg, tempEl, humidEl);

      $(".date-row").append(cardDiv);
      date5El.text(date5);
      tempEl.text("Temp: " + temp5 + " \xB0F");
      humidEl.text("Humidity: " + humid5 + " %");
    }
  });
}

function renderCityList() {
  $(".list-group").empty();
  for (var i = 0; i < cityList.length; i++) {
    cityListEl = cityList.join();
    var cityListItemEl = $("<li>").addClass("list-group-item");
    cityListItemEl.text(cityList[i]);
    $(".list-group").prepend(cityListItemEl);
  }
}
$(".list-group").on("click", "li", function (event) {
  event.preventDefault();
  $(".date-row").empty();
  makeAjaxCall($(this).text());
});

$(".fa-search").on("click", function (event) {
  event.preventDefault();
  $(".date-row").empty();
  citySearch = $(".form-control").val();
  if (cityList.indexOf(citySearch) === -1) {  //for when there is no citylist
    cityList.push(citySearch);                //append to list
    localStorage.setItem("cityName", JSON.stringify(cityList));
  }

  renderCityList();
  makeAjaxCall(citySearch);
});
