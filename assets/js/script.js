var apiKey = "130e45b8035df0b2f3d2389f4fb66852"

$(document).ready(function(){
    $("#search-btn").on("click", function (){
        event.preventDefault();
        var cityInput = $("#city-input").val();
        $("#city-input").val("")
        searchWeatherInfo(cityInput);
    })
    
    function searchWeatherInfo(cityInput) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&APPID=" + apiKey + "&units=imperial",
            dataType: "json",
            success: function(data) {
                console.log(data); 
            }
        })
        
    }
})