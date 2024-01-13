var searchInput = document.querySelector("#search");
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month=["January","February","March","April","May","June","July","August","September","October","November","December"]
search("cairo")

async function search(ab){
    let api= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=7477df7932214f028d2201947241301&q=${ab}&days=3`)
    if(api.ok && api.status==200){
     var ab = await api.json();
    // console.log(api.name); 
    displayToday(ab.location,ab.current)
    displayTomorrow(ab.forecast.forecastday)
} 
}
   searchInput.addEventListener("keyup",ab=>{
    search(ab.target.value)
    // console.log(ab.target.value);
})
  

function displayToday(ab,api){
let date = new Date(api.last_updated)
// console.log(days[date.getDay()]);
let cartoona = `     
<div class="col-md-4">
<div class="today-forecast " >
<div class="forecast-head" ">
<div class="day">${days[date.getDay()]}</div>
<div class=" date ">${date.getDate()+" "+ month[date.getMonth()]}</div>
</div>
<div class="forecast-content">
<div class="location">${ab.name}</div>
<div class="degree d-flex justify-content-between ">
    <div class="num">
    ${api.temp_c}
        <sup>O</sup>
        C
    </div>
    <div class="forecast-icon">
        <img src="https:${api.condition.icon}" alt="" width="90">
    </div>
</div>
<div class="custom">${api.condition.text}</div>
<!-- last part -->
<span><img src="icon-umberella.png" alt="">20%</span>
<span><img src="icon-wind.png" alt="">18km/h</span>
<span><img src="icon-compass.png" alt="">East</span>
</div>
</div>       
</div>`
document.getElementById("forecast").innerHTML= cartoona
}


////////////////////////// tommorrow/////////////

function displayTomorrow(ab){
let tom =""
for(let i=1;i<ab.length;i++){
 tom= `     
<div class="col-md-4">
<div class="forecast " >
 <div class="forecast-head head2">
    <div class="day">${days[new Date(ab[i].date).getDay()]}</div>
</div>
    <div class="forecast-content2">
<div class="forecast-icon ">
    <img src="https:${ab[i].day.condition.icon}" alt="" width="82">
</div>
<div class="degree2">
    <div class="num">
       ${ab[i].day.maxtemp_c}
        <sup>O</sup>
        C
    </div>
</div>
<small>${ab[i].day.mintemp_c}<sup>o</sup></small>
<div class="custom">${ab[i].day.condition.text}</div>
</div>
</div>
</div>


`
document.getElementById("forecast").innerHTML+= tom
}
}