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
        if($("#selector").val()=== "--- Choose Country ---"){
          $(".main-content").hide();
        }
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
          
          $(".mapouter").html(`<iframe id="myMap"
          src="https://maps.google.com/maps?q=${capital}=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
      </iframe>`)
        //get data weather 
        
        // START: *icon* Rendering from *weatherapi*
        $.ajax({
          type: 'get',
          url: `http://api.weatherapi.com/v1/current.json?key=
          7f2465febfaf4cf5884193545232301&q=${capital}&aqi=no`,
          dataType: 'json',
          async:false,
          success: function (response) {
            
            $("#weatherConditionIcon").html(`<img style="width:100%" src="https:${response.current.condition.icon}" class="">`);
          },
          error: function(err) {
            console.log(err);
          }
        
        });

        //END: icno Renderind

          $.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=3ef5728414414623794036f295042ac2`, function (weatherData) {
              const { wind: { speed }, main: {humidity, temp}, visibility,weather} = weatherData
              $("#windSpeed").text(speed);
              $("#humidity").text(humidity);
              $("#temperature").text(Math.trunc(temp - 273));
              $("#visibility").text(visibility);
            }
          );
        }
      });
    });
    $(".main-content").fadeIn();
  });
});

// dark mode and light mode webSite 

document.body.style="background-color: var(--bs-dark);transition: 0.5s;"
const sun = "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon = "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"

let theme = "dark";
  const root = document.querySelector(":root");
  const container = document.getElementsByClassName("theme-container")[0];
  const themeIcon = document.getElementById("theme-icon");
  const myMap = document.getElementById("myMap");
  container.addEventListener("click", setTheme);
  function setTheme() {
    switch (theme) {
      case "dark":
        setLight();
        theme = "light";
        break;
      case "light":
        setDark();
        theme = "dark";
        break;
    }
  }
  function setLight() {
    root.style.setProperty(
      "--bs-dark",
      "linear-gradient(318.32deg, #c3d1e4 0%, #dde7f3 55%, #d4e0ed 100%)"
    );
    container.classList.remove("shadow-dark");
    setTimeout(() => {
      container.classList.add("shadow-light");
      themeIcon.classList.remove("change");
    }, 300);
    themeIcon.classList.add("change");
    themeIcon.src = sun;
  }
  function setDark() {
    root.style.setProperty("--bs-dark", "#212529");
    container.classList.remove("shadow-light");
    setTimeout(() => {
      container.classList.add("shadow-dark");
      themeIcon.classList.remove("change");
    }, 300);
    themeIcon.classList.add("change");
    themeIcon.src = moon;
  }