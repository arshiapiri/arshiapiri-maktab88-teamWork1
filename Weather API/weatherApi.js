//create select for country
$(() => {
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
          $('#flag').css({ 'background-image': `url(${flags.svg})`, 'background-size': 'cover' });
          $("#population").text(population);
          //map
          $(".mapouter").html(`<iframe width="100%" height="250"
            src="https://maps.google.com/maps?q=${capital}=&z=13&ie=UTF8&iwloc=&output=embed"
            frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
          </iframe>`)
        //get data weather 
          $.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=3ef5728414414623794036f295042ac2`, function (weatherData) {
              const { wind: { speed }, main: {humidity, temp}, visibility} = weatherData
              $("#windSpeed").text(speed)
              $("#humidity").text(humidity)
              $("#temperature").text(Math.ceil(temp - 273))
              $("#visibility").text(visibility)
            }
          );
        }
      });
    });
  });
});