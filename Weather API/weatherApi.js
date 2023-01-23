const selected = document.getElementById('selected');
const capitals = document.getElementById('capital');
let countries=[];
let capital=[];
$.ajax({
    url:"https://restcountries.com/v3.1/all",
    type:"GET",
    dataType: "json",
    async:false,
    success: function(res){
        for(let i=0; i<res.length; i++){
            countries.push(res[i]["name"]["common"]);
            capital.push(res[i]["capital"])
            $("#capital").html(`
            <p id="capital">capital:${("#selected").val()}</p>`
            )
            $("#mapBody").html(
                `<iframe width="100%" height="250"
                src="https://maps.google.com/maps?q=${res[0]["capital"]}"}=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>`
            )
        } 
    },
    error: function(err){
        console.log(err);
    }
})

function createOptions(){
    let optionBody='';
    for(let i=0;i<countries.length;i++){
    optionBody+= `<option value="${[i+1]}">${countries[i]}</option>`;
    }
    return optionBody;
}
selected.innerHTML="<option selected>--- Choose  Country ---</option>" +createOptions();

// function capitalCountry (){
//     let capitalBody = '';
//     for (let i =0;i<capitals.length;i++) {
//         capitalBody += `<p>capital:${capitals[1]}</p>` 
//     }
//     return capitalBody;
// }
// capital.innerHTML = "<p>capital:--</p>" +capitalCountry();
