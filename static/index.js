document.addEventListener("DOMContentLoaded", function () {
    let btn = document.querySelector("#loadJoke");
    let categorySelect = document.querySelector("#category"); // Assicurati che esista nel tuo HTML
    let jokeText = document.querySelector("#joke"); // Elemento per mostrare la battuta
    let urlBase = "https://api.chucknorris.io/jokes/random";

    // Carica dinamicamente le categorie al caricamento della pagina
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(response => response.json())
        .then(categories => {
            categorySelect.innerHTML = '<option value="">Random</option>'; // Opzione predefinita
            categories.forEach(category => {
                let option = document.createElement("option");
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                option.value = category;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Errore nel caricamento delle categorie:", error));

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        let selectedCategory = categorySelect.value;
        let url = selectedCategory ? `${urlBase}?category=${selectedCategory}` : urlBase;

        console.log("Fetching joke from:", url); // Debug dell'URL generato

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella richiesta");
                }
                return response.json();
            })
            .then(data => {
                console.log("Battuta ricevuta:", data.value);
                jokeText.textContent = data.value; // Mostra la battuta nell'HTML
            })
            .catch(error => {
                console.error("Errore nel caricamento della battuta:", error);
                jokeText.textContent = "Errore nel caricamento della battuta.";
            });
    });
});
