//create select for country
$(() => {
  $(".main-content").fadeOut();
  $.get("https://restcountries.com/v2/all", function (data) {
    data.forEach((item) => {
      let countries = `<option>${item.name}</option>`;
      $("#selector").append(countries);
    });
  });

  $("#selector").change(function () {
    $.get("https://restcountries.com/v2/all", function (data) {
      data.forEach((element) => {
        //get data country 
        const { name, nativeName, capital, region, population, timezones, flags, languages, callingCodes } = element;
        if (name === $("#selector").val()) {
          $("#country").text(name);
          $("#NativeName").text(nativeName);
          $("#capital").text(capital);
          $("#region").text(region);
          $("#callingCode").html(`<h2>${callingCodes}</h2>`);
          $("#time-zone").text(timezones);
          $("#languages").text(languages[0]['nativeName']);
          $('#flag').css({ 'background-image': `url(${flags.svg})` });
          $("#population").text(population);
          //map
          $(".mapouter").html(`<iframe width="100%" height="250px"
            src="https://maps.google.com/maps?q=${capital}=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
          </iframe>`)
        //get data weather 
          $.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=3ef5728414414623794036f295042ac2`, function (weatherData) {
              const { wind: { speed }, main: {humidity, temp}, visibility,weather} = weatherData
              $("#windSpeed").text(speed)
              $("#humidity").text(humidity)
              $("#temperature").text(Math.ceil(temp - 273))
              $("#visibility").text(visibility)
              $("#icon").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path></svg>`)

            }
          );
        }
      });
    });
    $(".main-content").fadeIn();
  });
});