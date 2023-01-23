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
    optionBody+= `<option value="${[i+1]}">${countries[i]}</option>`;
    }
    return optionBody;
}
document.getElementById('selected').innerHTML="<option selected>--- Choose  Country ---</option>" +createOptions();

const mapBody = document.getElementById('mapBody');
const map = () => {
    mapBody.innerHTML = `           
    <div class="col-lg-9 col-md-6 col-12">
    <div class="card shadow">
        <div class="mapouter">
            <iframe width="100%" height="250" id="gmap_canvas" 
                src="https://maps.google.com/maps?q=tehran=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
            </iframe>
        </div>
    </div>
</div>
`
}