// Load Categories

fetch("data/categories.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("categoryContainer");

    let html = "";

    data.forEach(category => {

        html += `
        <div class="card">

            <h2>${category.title}</h2>

            <p>${category.description}</p>

            <a
                class="btn"
                href="category.html?category=${category.folder}">
                Explore
            </a>

        </div>
        `;

    });

    container.innerHTML = html;

})
.catch(() => {

    document.getElementById("categoryContainer").innerHTML =
    "<h2>Unable to load categories.</h2>";

});
