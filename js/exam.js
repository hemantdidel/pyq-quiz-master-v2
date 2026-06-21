const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const exam = params.get("exam");

const pageTitle = document.getElementById("pageTitle");

const examContainer = document.getElementById("examContainer");

const searchInput = document.getElementById("searchInput");

pageTitle.innerHTML =
exam.toUpperCase();

let list = [];

fetch(`data/${category}/${exam}/exams.json`)

.then(response=>response.json())

.then(data=>{

list=data;

showCards(list);

})

.catch(()=>{

examContainer.innerHTML="<h2>No Data Found</h2>";

});

function showCards(data){

let html="";

data.forEach(item=>{

html+=`

<div class="card">

<h2>

${item.name}

</h2>

<p>

${item.description}

</p>

<a

class="btn"

href="tests.html?category=${category}&exam=${exam}&post=${item.folder}">

Open

</a>

</div>

`;

});

examContainer.innerHTML=html;

}

searchInput.addEventListener("input",()=>{

const keyword=searchInput.value.toLowerCase();

const filtered=list.filter(item=>

item.name.toLowerCase().includes(keyword)

);

showCards(filtered);

});
