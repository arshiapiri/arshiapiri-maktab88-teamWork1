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
          $("#callingCode").html(`<h1>${callingCodes}</h1>`);
          $("#time-zone").text(timezones);
          $("#languages").text(languages[0]['nativeName']);
          $('#flag').css({ 'background-image': `url(${flags.svg})` });
          $("#population").text(population);
          
          $(".mapouter").html(`<iframe class="myMap"
          src="https://maps.google.com/maps?q=${capital}=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
      </iframe>`)
        //get data weather 
          $.get(
            `http://api.weatherapi.com/v1/current.json?key=
            7f2465febfaf4cf5884193545232301&q=${capital}&aqi=no`, function (weatherData) {
              console.log(weatherData);
              const { wind: { speed }, current, visibility,weather} = weatherData
              $("#windSpeed").text(speed)
              $("#humidity").text(humidity)
              $("#temperature").text(current['temp_c'])
              $("#visibility").text(visibility)
              $("#icon").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12"><path d="M4.855.708c.5-.896 1.79-.896 2.29 0l4.675 8.351a1.312 1.312 0 0 1-1.146 1.954H1.33A1.313 1.313 0 0 1 .183 9.058ZM7 7V3H5v4Zm-1 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>`)

            }
          );
        }
      });
    });
    $(".main-content").fadeIn();
  });
});