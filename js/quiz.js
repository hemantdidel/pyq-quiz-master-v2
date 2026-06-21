/* ===========================================
   PYQ Quiz Master v2
   Production Quiz Engine
=========================================== */

"use strict";

/* ==========================
   Global Variables
========================== */

let quizData = [];
let currentQuestion = 0;
let userAnswers = [];

let timerInterval = null;
let totalTime = 0;
let remainingTime = 0;

/* ==========================
   DOM
========================== */

const questionBox =
document.getElementById("questionBox");

const optionsBox =
document.getElementById("optionsBox");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const palette = document.getElementById("palette");

const timerText = document.getElementById("timer");

const progressBar = document.getElementById("progressBar");

/* ==========================
   URL Params
========================== */

const params = new URLSearchParams(window.location.search);

const DATA_PATH = params.get("file");

const STORAGE_KEY =
"quiz_" + btoa(DATA_PATH);


/* ==========================
   Start
========================== */

window.addEventListener("load", () => {

    loadQuiz();

});


/* ==========================
   Load Quiz
========================== */

async function loadQuiz(){

    console.log("DATA_PATH =", DATA_PATH);

    try{

        const response = await fetch(DATA_PATH);

        if(!response.ok){

            throw new Error("Quiz not found");

        }

        quizData = await response.json();

        loadSavedState();

        createPalette();

        loadQuestion(currentQuestion);

        updateProgress();

        startTimer();

    }

    catch(error){

        console.log(error);

        alert("Unable to load quiz.");

    }

}

/* ==========================
   Load Saved State
========================== */

function loadSavedState(){

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        const state = JSON.parse(saved);

        userAnswers = state.answers;

        currentQuestion = state.current;

        remainingTime = state.remaining;

    }

    else{

        userAnswers = new Array(quizData.length).fill(null);

        totalTime = quizData.length * 60;

        remainingTime = totalTime;

    }

}


/* ==========================
   Save State
========================== */

function saveState(){

    const state={

        answers:userAnswers,

        current:currentQuestion,

        remaining:remainingTime

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(state)

    );

}


/* ==========================
   Load Question
========================== */

function loadQuestion(index){

    currentQuestion=index;

    const q=quizData[index];

    questionBox.innerHTML=

    `
    <h2>Q${index+1}. ${q.question}</h2>
    `;

    optionsBox.innerHTML="";

    q.options.forEach((option,i)=>{

        const div=document.createElement("div");

        div.className="option";

        if(userAnswers[index]==i){

            div.classList.add("selected");

        }

        div.innerHTML=

        `
        <label>

        <input
        type="radio"
        name="option"
        value="${i}"
        ${userAnswers[index]==i?"checked":""}
        >

        ${option}

        </label>

        `;

        div.addEventListener("click",()=>{

            selectAnswer(i);

        });

        optionsBox.appendChild(div);

    });

    updatePalette();

    updateProgress();

}


/* ==========================
   Select Answer
========================== */

function selectAnswer(option){

    userAnswers[currentQuestion] = option;

    saveState();

    updatePalette();

    updateProgress();

    loadQuestion(currentQuestion);

}


/* ==========================
   Previous
========================== */

prevBtn.addEventListener("click",()=>{

    if(currentQuestion>0){

        loadQuestion(currentQuestion-1);

    }

});


/* ==========================
   Next
========================== */

nextBtn.addEventListener("click",()=>{

    if(currentQuestion<quizData.length-1){

        loadQuestion(currentQuestion+1);

    }

});


/* ==========================
   Palette
========================== */

function createPalette(){

    palette.innerHTML="";

    quizData.forEach((q,index)=>{

        const btn=document.createElement("button");

        btn.innerText=index+1;

        btn.className="palette-btn";

        btn.onclick=()=>{

            loadQuestion(index);

        };

        palette.appendChild(btn);

    });

    updatePalette();

}


function updatePalette(){

    const buttons = document.querySelectorAll(".palette-btn");

    buttons.forEach((btn,index)=>{

        btn.classList.remove("current");
        btn.classList.remove("answered");

        if(index===currentQuestion){

            btn.classList.add("current");

        }

        if(userAnswers[index]!==null){

            btn.classList.add("answered");

        }

    });

}


/* ==========================
   Progress
========================== */

function updateProgress(){

    let answered=0;

    userAnswers.forEach(a=>{

        if(a!=null){

            answered++;

        }

    });

    let percent=

    (answered/quizData.length)*100;

    progressBar.style.width=

    percent+"%";

}


/* ==========================
   Timer
========================== */

function startTimer(){

    timerInterval=setInterval(()=>{

        remainingTime--;

        saveState();

        updateTimer();

        if(remainingTime<=0){

            clearInterval(timerInterval);

            submitQuiz();

        }

    },1000);

}


function updateTimer(){

    const min=

    Math.floor(remainingTime/60);

    const sec=

    remainingTime%60;

    timerText.innerHTML=

    `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}


/* ==========================
   Submit
========================== */

submitBtn.addEventListener("click",()=>{

    let confirmSubmit=

    confirm("Submit Quiz?");

    if(confirmSubmit){

        submitQuiz();

    }

});


/* ==========================
   Submit Function
========================== */

function submitQuiz(){

    clearInterval(timerInterval);

    let score=0;

    quizData.forEach((q,index)=>{

        if(userAnswers[index]==q.answer){

            score++;

        }

    });

    const result={

        total:quizData.length,

        score:score,

        answers:userAnswers,

        questions:quizData

    };

    localStorage.setItem(

        "quiz_result",

        JSON.stringify(result)

    );

    localStorage.removeItem(STORAGE_KEY);

    window.location.href="result.html";

}


/* ==========================
   Prevent Refresh Loss
========================== */

window.addEventListener(

"beforeunload",

()=>{

    saveState();

});
