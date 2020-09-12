# weather-dashboard

## Description

This weeks project was to create an ineractive weather dashboard. In the application you are able to type in a city, then the application fetches the data from OpenWeather API. Upon completion of that fetch the longitude and latitude from the data is then used to make another fetch for the locations UV Index. While the second fetch is being completed the application begins to load the received information for temperature, humidity and wind speed and upon completion of the second fetch, the UV index will then be displayed. Once the current days information is displayed the fuction to get the five day forecast is called which involves another fetch call. Inside the five day forecast card the date, weather icon, temperature max and humidity are displayed. 

To the left of the application, underneath the search input, there is a container used to display the searched cities history, along with the option to clear the history and reload the page. Upon clicking of a searched city the application will then display that city in the main card of the application.

### Technologies Used
* Javascript
* JQuery
* Bootstrap
* HTML
* Github
* VS Code
* Google Developer Tools

### What I Learned

A lot was learned this week, such as making a second fetch call with data from another fetch and even something small like how to make a .on('keypress') function. One of the most challenging parts of the week was getting my the data from the initial fetch and using it to fetch the uv index data. In order to do this I had to nest a fetch within another fetch, which took a lot of syntax research for jquery. This project proved to be excellent practice for better understanding of JQuery and Bootstrap. 

### Credits

Shortcut Icon Made by Pixel Buddha from www.flaticon.com

## Screen Shot of live URL

(/assets/imgs/weather-dashboard.png"Live URL")

## Link

https://aaroncenteno.github.io/weather-dashboard/