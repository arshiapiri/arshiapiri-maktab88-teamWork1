

$(() => {
    $.get("https://restcountries.com/v2/all", function (data) {
      data.forEach((item) => {
        let countries = `<option>${item.name}</option>`;
        $("#selector").append(countries);
      });
    });
  
    $("#selector").change(function () {
      $.get("https://restcountries.com/v2/all", function (data, status) {
        data.forEach((element) => {
          const {name,nativeName,capital,region,population,timezones, flags,languages,callingCodes} = element;
  
          if (name === $("#selector").val()) {
            $("#country").text(name)
            $("#NativeName").text(nativeName)
            $("#capital").text(capital)
            $("#region").text(region)
            $("#population").text(population)

            $("#time-zone").text(timezones)
            $('#flag').css({'background-image':`url(${flags.svg})`,'background-size':'cover'})
            $("#callingCode").html(`<h2>${callingCodes}</h2>`)
            $.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${capital.toString()}&APPID=3ef5728414414623794036f295042ac2`,function(weatherData,status){
                const {wind:{speed},main:{humidity,temp},visibility} = weatherData
                $("#windSpeed").text(speed)
                $("#humidity").text(humidity)
                $("#temperature").text(Math.ceil(temp-273))
                $("#visibility").text(visibility)
              }
            );
          }
        });
      });
    });
  });