// ==========================
// Category Container
// ==========================

const categoryContainer =
document.getElementById("categoryContainer");

const searchInput =
document.getElementById("searchInput");

let categories = [];

// ==========================
// Load Categories
// ==========================

fetch("data/categories.json")

.then(response => response.json())

.then(data => {

    categories = data;

    displayCategories(categories);

})

.catch(() => {

    categoryContainer.innerHTML = `

    <div class="card">

        <h2>⚠ Unable to Load</h2>

        <p>Please refresh the page.</p>

    </div>

    `;

});

// ==========================
// Display Categories
// ==========================

function displayCategories(list){

    let html = "";

    list.forEach(item => {

        html += `

        <div class="card">

            <h2>${item.title}</h2>

            <p>${item.description}</p>

            <a
            class="btn"
            href="category.html?category=${item.folder}">

            Explore

            </a>

        </div>

        `;

    });

    categoryContainer.innerHTML = html;

}

// ==========================
// Search
// ==========================

searchInput.addEventListener("input", () => {

    const keyword =
    searchInput.value.toLowerCase();

    const filtered = categories.filter(item =>

        item.title.toLowerCase().includes(keyword)

    );

    displayCategories(filtered);

});
