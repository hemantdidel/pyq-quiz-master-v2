/* ==========================================
   PYQ Quiz Master v3
   Production Quiz Engine
   Part 1.1
========================================== */

"use strict";

/* ==========================================
   CONFIG
========================================== */

const QuizApp = {

    data: [],
    current: 0,
    answers: [],

    totalTime: 0,
    remainingTime: 0,

    timer: null,

    dataPath: "",
    storageKey: ""

};

/* ==========================================
   DOM
========================================== */

const $ = (id) => document.getElementById(id);

const DOM = {

    title: $("quizTitle"),

    timer: $("timer"),

    progress: $("progressBar"),

    questionNumber: $("questionNumber"),

    questionBox: $("questionBox"),

    optionsBox: $("optionsBox"),

    palette: $("palette"),

    prevBtn: $("prevBtn"),

    nextBtn: $("nextBtn"),

    submitBtn: $("submitBtn")

};

/* ==========================================
   URL
========================================== */

function loadURL() {

    const params = new URLSearchParams(window.location.search);

    const file = params.get("file");

    if (!file) {

        alert("Quiz file missing.");

        window.location.href = "tests.html";

        return false;

    }

    QuizApp.dataPath = file;

    QuizApp.storageKey =
        "quiz_" + btoa(file);

    return true;

}

/* ==========================================
   STORAGE
========================================== */

function saveState() {

    const state = {

        current: QuizApp.current,

        answers: QuizApp.answers,

        remainingTime: QuizApp.remainingTime

    };

    localStorage.setItem(

        QuizApp.storageKey,

        JSON.stringify(state)

    );

}

function loadState() {

    const saved = localStorage.getItem(

        QuizApp.storageKey

    );

    if (!saved) return;

    try {

        const state = JSON.parse(saved);

        QuizApp.current =
            state.current ?? 0;

        QuizApp.answers =
            state.answers ?? [];

        QuizApp.remainingTime =
            state.remainingTime ?? 0;

    }

    catch (e) {

        console.log(e);

    }

}

/* ==========================================
   LOAD QUIZ
========================================== */

async function loadQuiz() {

    try {

        console.log(

            "Loading:",

            QuizApp.dataPath

        );

        const response =
            await fetch(QuizApp.dataPath);

        if (!response.ok) {

            throw new Error(

                "Unable to load JSON"

            );

        }

        QuizApp.data =
            await response.json();

        if (!Array.isArray(QuizApp.data)) {

            throw new Error(

                "Invalid Quiz Data"

            );

        }

        if (QuizApp.answers.length === 0) {

            QuizApp.answers =
                new Array(

                    QuizApp.data.length

                ).fill(null);

        }

        if (QuizApp.remainingTime <= 0) {

            QuizApp.totalTime =
                QuizApp.data.length * 60;

            QuizApp.remainingTime =
                QuizApp.totalTime;

        }

        DOM.title.textContent =

            QuizApp.dataPath

            .split("/")

            .pop()

            .replace(".json", "")

            .replaceAll("-", " ")

            .toUpperCase();

        initQuiz();

    }

    catch (error) {

        console.error(error);

        DOM.questionBox.innerHTML =

            `
            <h2>Unable to load quiz.</h2>
            <p>${error.message}</p>
            `;

    }

}

/* ==========================================
   INIT
========================================== */

function initQuiz(){

    console.log("Questions:", QuizApp.data.length);

    createPalette();

    bindEvents();

    renderQuestion();

}

*/
      Part 1.2

      renderQuestion();
      createPalette();
      bindEvents();

    */

}

/* ==========================================
   START
========================================== */

window.addEventListener(

    "load",

    () => {

        if (!loadURL()) return;

        loadState();

        loadQuiz();

    }

);

window.addEventListener(

    "beforeunload",

    () => {

        saveState();

    }

);
/* ==========================================
   PART 1.2
   Render + Navigation + Palette
========================================== */

function renderQuestion() {

    const q = QuizApp.data[QuizApp.current];

    if (!q) return;

    DOM.questionNumber.textContent =
        `Question ${QuizApp.current + 1} / ${QuizApp.data.length}`;

    DOM.questionBox.innerHTML =
        `<h2>Q${QuizApp.current + 1}. ${q.question}</h2>`;

    DOM.optionsBox.innerHTML = "";

    q.options.forEach((option, index) => {

        const item = document.createElement("div");

        item.className = "option";

        if (QuizApp.answers[QuizApp.current] === index) {
            item.classList.add("selected");
        }

        item.innerHTML = `
            <label>
                <input
                    type="radio"
                    name="quizOption"
                    value="${index}"
                    ${QuizApp.answers[QuizApp.current] === index ? "checked" : ""}
                >
                ${option}
            </label>
        `;

        item.addEventListener("click", () => {

            QuizApp.answers[QuizApp.current] = index;

            saveState();

            updatePalette();

            updateProgress();

            renderQuestion();

        });

        DOM.optionsBox.appendChild(item);

    });

    updatePalette();

    updateProgress();

    DOM.prevBtn.disabled =
        QuizApp.current === 0;

    DOM.nextBtn.disabled =
        QuizApp.current === QuizApp.data.length - 1;

}

/* ==========================================
   Palette
========================================== */

function createPalette() {

    DOM.palette.innerHTML = "";

    QuizApp.data.forEach((item, index) => {

        const btn = document.createElement("button");

        btn.className = "palette-btn";

        btn.textContent = index + 1;

        btn.addEventListener("click", () => {

            QuizApp.current = index;

            renderQuestion();

        });

        DOM.palette.appendChild(btn);

    });

    updatePalette();

}

function updatePalette() {

    const buttons =
        DOM.palette.querySelectorAll(".palette-btn");

    buttons.forEach((btn, index) => {

        btn.classList.remove("current");
        btn.classList.remove("answered");

        if (index === QuizApp.current) {
            btn.classList.add("current");
        }

        if (QuizApp.answers[index] !== null) {
            btn.classList.add("answered");
        }

    });

}

/* ==========================================
   Progress
========================================== */

function updateProgress() {

    const answered =
        QuizApp.answers.filter(x => x !== null).length;

    const percent =
        (answered / QuizApp.data.length) * 100;

    DOM.progress.style.width =
        percent + "%";

}

/* ==========================================
   Navigation
========================================== */

function bindEvents() {

    DOM.prevBtn.addEventListener("click", () => {

        if (QuizApp.current > 0) {

            QuizApp.current--;

            renderQuestion();

        }

    });

    DOM.nextBtn.addEventListener("click", () => {

        if (QuizApp.current < QuizApp.data.length - 1) {

            QuizApp.current++;

            renderQuestion();

        }

    });

}

/* ==========================================
   Update initQuiz()
========================================== */

/*

Part 1.1 में initQuiz() को बदलकर यह कर देना:

function initQuiz(){

    console.log("Questions:", QuizApp.data.length);

    createPalette();

    bindEvents();

    renderQuestion();

}

*/
/* ==========================================
   PART 1.3
   Timer + Autosave + Keyboard + Submit
========================================== */

function formatTime(seconds) {

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return (
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0")
    );

}

/* ==========================================
   Timer
========================================== */

function updateTimer() {

    DOM.timer.textContent =
        "⏱ " + formatTime(QuizApp.remainingTime);

}

function startTimer() {

    updateTimer();

    if (QuizApp.timer) {

        clearInterval(QuizApp.timer);

    }

    QuizApp.timer = setInterval(() => {

        QuizApp.remainingTime--;

        saveState();

        updateTimer();

        if (QuizApp.remainingTime <= 0) {

            clearInterval(QuizApp.timer);

            submitQuiz();

        }

    }, 1000);

}

/* ==========================================
   Autosave
========================================== */

function autoSave() {

    saveState();

}

setInterval(() => {

    autoSave();

}, 5000);

/* ==========================================
   Keyboard Navigation
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") {

        if (QuizApp.current > 0) {

            QuizApp.current--;

            renderQuestion();

        }

    }

    if (e.key === "ArrowRight") {

        if (
            QuizApp.current <
            QuizApp.data.length - 1
        ) {

            QuizApp.current++;

            renderQuestion();

        }

    }

    if (
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4"
    ) {

        const option =
            Number(e.key) - 1;

        const q =
            QuizApp.data[QuizApp.current];

        if (q.options[option] !== undefined) {

            QuizApp.answers[
                QuizApp.current
            ] = option;

            saveState();

            updatePalette();

            updateProgress();

            renderQuestion();

        }

    }

});

/* ==========================================
   Submit
========================================== */

function submitQuiz() {

    clearInterval(QuizApp.timer);

    let score = 0;

    QuizApp.data.forEach((q, index) => {

        if (
            Number(QuizApp.answers[index]) ===
            Number(q.answer)
        ) {

            score++;

        }

    });

    const attempted =
        QuizApp.answers.filter(
            x => x !== null
        ).length;

    const result = {

        total: QuizApp.data.length,

        score: score,

        attempted: attempted,

        answers: QuizApp.answers,

        questions: QuizApp.data,

        timeLeft: QuizApp.remainingTime,

        submittedAt: Date.now()

    };

    localStorage.setItem(
        "quiz_result",
        JSON.stringify(result)
    );

    localStorage.removeItem(
        QuizApp.storageKey
    );

    window.location.href =
        "result.html";

}

/* ==========================================
   Submit Button
========================================== */

DOM.submitBtn.addEventListener(
    "click",
    () => {

        const ok = confirm(
            "क्या आप टेस्ट सबमिट करना चाहते हैं?"
        );

        if (ok) {

            submitQuiz();

        }

    }
);

/* ==========================================
   Update initQuiz()
========================================== */

/*

function initQuiz(){

    createPalette();

    bindEvents();

    renderQuestion();

    startTimer();

    updateProgress();

}

*/
/* ==========================================
   PART 1.4
   Final Init + Resume + Recovery
========================================== */

function showResumeDialog() {

    const saved = localStorage.getItem(
        QuizApp.storageKey
    );

    if (!saved) return;

    try {

        const state = JSON.parse(saved);

        if (
            Array.isArray(state.answers) &&
            state.answers.some(a => a !== null)
        ) {

            const resume = confirm(
                "Previous quiz found.\nResume from last position?"
            );

            if (!resume) {

                localStorage.removeItem(
                    QuizApp.storageKey
                );

                QuizApp.current = 0;

                QuizApp.answers =
                    new Array(
                        QuizApp.data.length
                    ).fill(null);

                QuizApp.remainingTime =
                    QuizApp.totalTime;

            }

        }

    } catch (e) {

        console.log(e);

    }

}

/* ==========================================
   Visibility Auto Save
========================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            saveState();

        }

    }
);

/* ==========================================
   Online / Offline
========================================== */

window.addEventListener(
    "offline",
    () => {

        console.log("Offline");

    }
);

window.addEventListener(
    "online",
    () => {

        console.log("Online");

    }
);

/* ==========================================
   Error Handler
========================================== */

window.addEventListener(
    "error",
    (event) => {

        console.error(event.error);

    }
);

/* ==========================================
   Final Init
========================================== */

function initQuiz() {

    QuizApp.totalTime =
        QuizApp.data.length * 60;

    showResumeDialog();

    createPalette();

    bindEvents();

    renderQuestion();

    updateProgress();

    updateTimer();

    startTimer();

}

/* ==========================================
   Helper
========================================== */

function resetQuizState() {

    localStorage.removeItem(
        QuizApp.storageKey
    );

    QuizApp.current = 0;

    QuizApp.answers =
        new Array(
            QuizApp.data.length
        ).fill(null);

    QuizApp.remainingTime =
        QuizApp.totalTime;

}

/* ==========================================
   Safe Submit
========================================== */

window.addEventListener(
    "beforeunload",
    () => {

        saveState();

    }
);
