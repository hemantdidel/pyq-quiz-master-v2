"use strict";

const result = JSON.parse(

localStorage.getItem("quiz_result")

);

if(!result){

window.location.href="index.html";

}

const container = document.getElementById(

"reviewContainer"

);

result.questions.forEach((question,index)=>{

const card=document.createElement("div");

card.className="reviewCard";

const user=result.answers[index];

const correct=question.answer;

let status="Skipped";
let statusClass="skipStatus";

if(user!==null){

if(user===correct){

status="Correct";
statusClass="correctStatus";

}else{

status="Wrong";
statusClass="wrongStatus";

}

}

let html=`

<span class="status ${statusClass}">

${status}

</span>

<h3>

Q${index+1}. ${question.question}

</h3>

`;

question.options.forEach((option,i)=>{

let cls="option";

if(i===correct){

cls+=" correct";

}

if(

user===i &&

user!==correct

){

cls+=" wrong";

}

html+=`

<div class="${cls}">

${option}

</div>

`;

});

if(question.explanation){

html+=`

<p>

<b>Explanation:</b>

${question.explanation}

</p>

`;

}

card.innerHTML=html;

container.appendChild(card);

});
