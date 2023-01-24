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
          $("#callingCode").html(`<h1 style = "font-size:64px">+${callingCodes}</h1>`);
          $("#time-zone").text(timezones[0]);
          $("#languages").text(languages[0]['nativeName']);
          $('#flag').css({ 'background-image': `url(${flags.svg})` });
          $("#population").text(population);
          
          $(".mapouter").html(`<iframe class="myMap"
          src="https://maps.google.com/maps?q=${capital}=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
      </iframe>`)
        //get data weather 
          $.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=3ef5728414414623794036f295042ac2`, function (weatherData) {
              const { wind: { speed }, main: {humidity, temp}, visibility,weather} = weatherData
              $("#windSpeed").text(speed);
              $("#humidity").text(humidity);
              $("#temperature").text(Math.ceil(temp - 273));
              $("#visibility").text(visibility);
              console.log(weather[0]['description']);
              $("#icon").html(`<i class="fa-light fa-clouds"></i>`);

            }
          );
        }
      });
    });
    $(".main-content").fadeIn();
  });
});