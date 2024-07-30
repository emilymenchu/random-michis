console.log("Hola, Mundo de gatos")

const API_URL = "https://api.thecatapi.com/v1/images/search";



async function fetchImage(){
    const response = await fetch(API_URL);
    const data = await response.json();

    const img = document.getElementById("img");
    img.src = data[0].url;
};


document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('reloadImage');
    button.addEventListener('click', fetchImage);
});

fetchImage();