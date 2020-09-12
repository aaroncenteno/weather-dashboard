var apiKey = "130e45b8035df0b2f3d2389f4fb66852"
var archive = JSON.parse(window.localStorage.getItem("archive")) || [];
var currentDate = moment().format("L");
var uvIndex = function (lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon) 
    .then (function (response){
        return response.json();
    })
    .then (function (data){
        console.log(data);
        var uviContainer = document.getElementById("uv-index");
        // uviContainer.setAttribute("class", "Uvi-Container");
        var uviP = document.createElement("p");
        var uviBtn = document.createElement("button");
        var currentUvi = data.value;
        uviP.innerText = "UV Index: "
        uviBtn.innerText = currentUvi;
        uviContainer.appendChild(uviP);
        uviP.appendChild(uviBtn);
    })
    
}

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
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
                var temp = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Temperature: " + data.main.temp)
                var humidity = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Humidity: " + data.main.humidity)
                var wind = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Wind Speed " + data.wind.speed)
                uvIndex(data.coord.lat, data.coord.lon);
                var uviContainer = $("#uv-index").addClass("card-text").css('paddingTop', '20px')

                title.append(img);
                cardBody.append(title, temp, humidity, wind, uviContainer);
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