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
                        var uvIndex = $("<h6>").addClass("card-text").css('paddingTop', '20px').text("UV Index: ")

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
                var title = $("<h2>").text("City: " + data.name + " (" + currentDate + ")")
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
                var temp = $("<h6>").addClass("card-text ").css('paddingTop', '20px').text("Temperature: " + data.main.temp + " °F")
                var humidity = $("<h6>").addClass("card-text").css('paddingTop', '20px').text("Humidity: " + data.main.humidity + " %")
                var wind = $("<h6>").addClass("card-text").css('paddingTop', '20px').text("Wind Speed " + data.wind.speed + " MPH")
        
                // Append Children To Parent Element
                title.append(img);
                cardBody.append(title, temp, humidity, wind);
                card.append(cardBody);

                $("#weather-today").append(card);
                forecast(cityInput);
            },

            // Error Function For Failed Fetch
            error: function(xhr, ajaxOptions, thrownError){
                if(xhr.status == 404) {
                    alert("Search Failed! Please Try Again.");
                    return;
                }
            }
        })
    }

    function forecast(cityInput) {
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function (data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                        var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");
                        var dateFormat = moment(data.list[i].dt_txt).format("L");
                        var forecastDates = $("<p>").addClass("card-text").text(dateFormat);

                        col.append(card)
                        card.append(body)
                        body.append(forecastDates,img, p1, p2);
    
                        $("#forecast .row").append(col);
                    }
                }
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