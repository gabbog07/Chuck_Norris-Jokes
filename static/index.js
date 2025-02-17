document.addEventListener("DOMContentLoaded", function() {
    // Seleziona gli elementi HTML necessari
    const categorySelect = document.getElementById("category");
    const jokeText = document.getElementById("joke");
    const loadJokeButton = document.getElementById("loadJoke");

    // Carica le categorie dinamicamente dalla API
    fetch("https://api.chucknorris.io/jokes/categories")
        .then(response => response.json()) // Converte la risposta in formato JSON
        .then(categories => {
            // Svuota le opzioni esistenti
            categorySelect.innerHTML = "";

            // Aggiunge ogni categoria come opzione al selettore
            categories.forEach(category => {
                const option = document.createElement("option");
                option.innerHTML = category[0].toUpperCase() + category.slice(1); // Capitalizza la prima lettera della categoria
                option.value = category; // Imposta il valore dell'opzione
                categorySelect.appendChild(option); // Aggiunge l'opzione al menu a tendina
            });
        })
        .catch(error => console.error("Errore nel caricamento delle categorie:", error)); // Gestisce eventuali errori

    // Funzione per caricare una battuta quando si clicca sul pulsante
    loadJokeButton.addEventListener("click", function() {
        let category = categorySelect.value; // Ottiene la categoria selezionata
        let url = "https://api.chucknorris.io/jokes/random"; // URL di base per la battuta

        // Aggiunge la categoria all'URL se è stata selezionata
        if (category !== "") {
            url += "?category=" + category;
        }

        // Recupera una battuta dalla API
        fetch(url)
            .then(response => response.json()) // Converte la risposta in formato JSON
            .then(data => jokeText.innerHTML = data.value) // Mostra la battuta nel paragrafo
            .catch(error => {
                jokeText.innerHTML = "Errore nel caricamento della battuta."; // Mostra un messaggio di errore
                console.error("Errore:", error); // Log dell'errore
            });
    });
});
