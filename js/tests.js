const params = new URLSearchParams(window.location.search);

const category = params.get("category");
const exam = params.get("exam");
const post = params.get("post");

const testContainer =
document.getElementById("testContainer");

const pageTitle =
document.getElementById("pageTitle");

pageTitle.innerHTML =
(post || "Practice Sets").toUpperCase();

fetch(`data/${category}/${exam}/${post}/tests.json`)

.then(response => response.json())

.then(data => {

showTests(data);

})

.catch(() => {

testContainer.innerHTML = `

<div class="card">

<h2>No Tests Found</h2>

<p>Please add tests.json</p>

</div>

`;

});

function showTests(list){

let html = "";

list.forEach((item,index)=>{

html += `

<div class="card">

<h2>

${item.title}

</h2>

<p>

📚 ${item.questions} Questions

</p>

<p>

⏱ ${item.time} Minutes

</p>

<a

class="btn"

href="quiz.html?file=data/${category}/${exam}/${post}/${item.file}">

Start Test

</a>

</div>

`;

});

testContainer.innerHTML = html;

}
