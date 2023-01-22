let countries=[];
$.ajax({
    url:"https://restcountries.com/v3.1/all",
    type:"GET",
    dataType: "json",
    async:false,
    success: function(res){
        for(let i=0;i<res.length; i++){
            countries.push(res[i]["name"]["common"]);
        }  
    },
    error: function(err){
        console.log(err);
    }
})

function createOptions(){
    let optionBody='';
    for(let i=0;i<countries.length;i++){
    optionBody+= `<option value="1">${countries[i]}</option>`;

    }
    return optionBody;

}

document.getElementById('selected').innerHTML="<option selected>--- Choose  Country ---</option>" +createOptions();