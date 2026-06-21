"use strict";

const result = JSON.parse(

localStorage.getItem("quiz_result")

);

if(!result){

window.location.href="index.html";

}

const total=result.total;

const score=result.score;

const attempted=result.answers.filter(

x=>x!==null

).length;

const correct=score;

const wrong=attempted-correct;

const unattempted=total-attempted;

const percentage=((score/total)*100).toFixed(2);

document.getElementById("score").innerText=

`${score}/${total}`;

document.getElementById("correct").innerText=

correct;

document.getElementById("wrong").innerText=

wrong;

document.getElementById("unattempted").innerText=

unattempted;

document.getElementById("percentage").innerText=

percentage+"%";

document.getElementById("progressFill").style.width=

percentage+"%";

document.getElementById("reviewBtn")

.addEventListener("click",()=>{

window.location.href="review.html";

});

document.getElementById("retryBtn")

.addEventListener("click",()=>{

history.back();

});

document.getElementById("homeBtn")

.addEventListener("click",()=>{

window.location.href="index.html";

});
