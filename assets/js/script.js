var apiKey = "130e45b8035df0b2f3d2389f4fb66852"

$(document).ready(function(){
    $("#search-btn").on("click", function (){
        event.preventDefault();
        var cityInput = $("#city-input").val();
        $("#city-input").val("")
        searchWeatherInfo(cityInput);
    })

    $(".archive").on("click", "li", function() {
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
            success: function(data) {
                console.log(data);
                if (archive.indexOf(cityInput) === -1) {
                    listItems(cityInput);
                }
            }
        })
        
    }

    var archive = JSON.parse(window.localStorage.getItem("archive")) || [];

    if (archive.length < 0) {
        searchWeatherInfo(archive[archive.length - 1]);
    }
    for (var i = 0; i < archive.length; i++) {
        listItems(archive[i]);
    }
})