var apiKey = "130e45b8035df0b2f3d2389f4fb66852"
var archive = JSON.parse(window.localStorage.getItem("archive")) || [];
var currentDate = moment().format("L");

$(document).ready(function () {
    $("#search-btn").on("click", function () {
        // event.preventDefault();
        var cityInput = $("#city-input").val();
        $("#city-input").val("")
        searchWeatherInfo(cityInput);
    })

    $(".archive").on("click", "li", function () {
        searchWeatherInfo($(this).text());
    })

    function listItems(citiesHistory) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(citiesHistory);
        $(".archive").append(li);
    }
    
    function searchWeatherInfo(cityInput) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (archive.indexOf(cityInput) === -1) {
                    archive.push(cityInput);
                    window.localStorage.setItem("archive", JSON.stringify(archive))
                    listItems(cityInput);
                }
                $("#weather-today").empty();
                var card = $("<div>").addClass("card")
                var cardBody = $("<div>").addClass("card-body")
                var title = $("<h4>").text("City: " + data.name + " (" + currentDate + ")")
                var temp = $("<div>").addClass("card-text").text("Temperature: " + data.main.temp)
                var humidity = $("<div>").addClass("card-text").text("Humidity: " + data.main.humidity)
                var wind = $("<div>").addClass("card-text").text("Wind Speed " + data.wind.speed)
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

                cardBody.append(title, temp, humidity, wind, img);
                card.append(cardBody);

                $("#weather-today").append(card);
        
            }
        })
        
    }


    if (archive.length < 0) {
        searchWeatherInfo(archive[archive.length - 1]);
    }
    for (var i = 0; i < archive.length; i++) {
        listItems(archive[i]);
    }
})