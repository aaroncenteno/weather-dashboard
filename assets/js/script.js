var apiKey = "130e45b8035df0b2f3d2389f4fb66852"
var archive = JSON.parse(window.localStorage.getItem("archive")) || [];
var currentDate = moment().format("L");

// On Search Button Click or Enter Begin Fetch Call
$(document).ready(function () {
    $("#search-btn").on("click", function () {
        // event.preventDefault();
        var cityInput = $("#city-input").val();
        $("#city-input").val("")
        searchWeatherInfo(cityInput);
    })

    // On Click of Past Searches Load Data
    $(".archive").on("click", "li", function () {
        searchWeatherInfo($(this).text());
    })

    // Create a list of past searches
    function listItems(citiesHistory) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(citiesHistory);
        $(".archive").append(li);
    }
    
    // Fetch Data from API
    function searchWeatherInfo(cityInput) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function (data) {
                // On Successful Fetch use data coordinates of longitude and lattitude to fetch UV Index
                $.ajax({
                    method: "GET",
                    url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + data.coord.lat + "&lon=" + data.coord.lon,
                    dataType: "json",
                    success: function(data) {
                        var uviBtn = $("<button>").addClass("btn").attr("type", "submit").text(data.value)
                        var uvIndex = $("<div>").addClass("card-text").css('paddingTop', '20px').text("UV Index: ")

                        if (data.value < 4) {
                            uviBtn.addClass("btn-success");
                        } else if (data.value < 7) {
                            uviBtn.addClass("btn-warning");
                        } else {
                            uviBtn.addClass("btn-danger");
                        }
                        uvIndex.append(uviBtn);
                        cardBody.append(uvIndex);
                    }
                })

                // After Successful Fetch Create Elements using data 
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
                var temp = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Temperature: " + data.main.temp + " °F")
                var humidity = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Humidity: " + data.main.humidity + " %")
                var wind = $("<div>").addClass("card-text").css('paddingTop', '20px').text("Wind Speed " + data.wind.speed + " MPH")
        
                // Append Children To Parent Element
                title.append(img);
                cardBody.append(title, temp, humidity, wind);
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