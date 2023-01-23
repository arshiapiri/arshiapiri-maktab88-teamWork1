// let countries=[];
// let fullData=[];

// $.ajax({
//     url:"https://restcountries.com/v3.1/all",
//     type:"GET",
//     dataType: "json",
//     async:false,
//     success: function(res){
//         //get countries name
//         for(let i=0;i<res.length; i++){
//             fullData.push(res[i]);
            
//             countries.push(res[i]["name"]["common"]);
//         }  
        
//     },
//     error: function(err){
//         console.log(err);
//     }
// })

// function createOptions(){
//     let optionBody='';
//     for(let i=0;i<countries.length;i++){
//     optionBody+= `<option value="${[i+1]}">${countries[i]}</option>`;
//     }
//     return optionBody;
// }
// document.getElementById('selector').innerHTML="<option selected>--- Choose  Country ---</option>" +createOptions();

// const mapBody = document.getElementById('mapBody');
// const map = () => {
//     mapBody.innerHTML = `           
//     <div class="col-lg-9 col-md-6 col-12">
//     <div class="card shadow">
//         <div class="mapouter">
//             <iframe width="100%" height="250" id="gmap_canvas" 
//                 src="https://maps.google.com/maps?q=tehran=&z=13&ie=UTF8&iwloc=&output=embed"
//                 frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
//             </iframe>
//         </div>
//     </div>
// </div>
// `
// }

// function putCountryInfo(){
// let selector= document.getElementById("selector");
// let selectedCountry= selector.options[selector.selectedIndex].text;
// document.getElementById("country").innerText= selectedCountry;
// }

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
          const {name,nativeName,capital,region,population,timezones, flags,language} = element;
  
          if (name === $("#selector").val()) {
            $("#country").text(name)
            $("#capital").text(capital)
            $("#region").text(region)
            $("#population").text(population)
            $("#time-zone").text(timezones)
            $('#flag').css({'background-image':`url(${flags.svg})`,'background-size':'cover'})
            $.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${capital.toString()}&APPID=3ef5728414414623794036f295042ac2`,function(weatherData,status){
                $("#")
                const {wind:{speed},main:{humidity},visibility} = weatherData
                
              }
            );
          }
        });
      });
    });
  });