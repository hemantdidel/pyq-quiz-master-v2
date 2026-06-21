const params = new URLSearchParams(window.location.search);

const category = params.get("category");

const pageTitle = document.getElementById("pageTitle");
const examContainer = document.getElementById("examContainer");
const searchInput = document.getElementById("searchInput");

pageTitle.innerHTML =
category === "central"
    ? "🇮🇳 Central Government Exams"
    : "🏜 Rajasthan Government Exams";

let examList = [];

fetch(`data/${category}/exams.json`)
.then(response => response.json())
.then(data => {

    examList = data;

    showCards(examList);

})
.catch(() => {

    examContainer.innerHTML =
    "<h2>No Exams Found</h2>";

});

function showCards(list) {

    let html = "";

    list.forEach(exam => {

        html += `
        <div class="card">

            <h2>${exam.name}</h2>

            <p>${exam.description}</p>

            <a
                class="btn"
                href="exam.html?category=${category}&exam=${exam.folder}">
                Open
            </a>

        </div>
        `;

    });

    examContainer.innerHTML = html;

}

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const filtered = examList.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    showCards(filtered);

});
