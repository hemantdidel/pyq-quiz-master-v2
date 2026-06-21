// Load Categories

fetch("data/categories.json")

.then(response=>response.json())

.then(data=>{

let container=document.getElementById("categoryContainer");

let html="";

data.forEach(category=>{

html+=`

<div class="card">

<h2>

${category.name}

</h2>

<p>

Click to explore practice tests

</p>

<a

class="btn"

href="${category.page}">

Open

</a>

</div>

`;

});

container.innerHTML=html;

})

.catch(()=>{

document.getElementById("categoryContainer").innerHTML=

"<h2>Unable to load categories.</h2>";

});
