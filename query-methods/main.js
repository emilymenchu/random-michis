const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=11&";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?";
const API_KEY = 'api_key=live_EmLM3MNG3CDNwYPrgXekPclnnI12Hap2i8i8ufe8ZNhe4Sd3ozZDREAP6x8UojUj';

const spanError = document.getElementById('michiError')
const spanErrorFavorite = document.getElementById('michiErrorFavorite')

async function fetchRandomCats(){
  
        const response = await fetch(API_URL_RANDOM.concat(API_KEY));
        const data = await response.json();
        
        const imgContainer = null || document.getElementById("image-container");
        let i = 0;
        
        if (response.status !== 200){
            spanError.innerHTML = "Hubo un MichiError: " + response.status + data.message;
        }else {
            let images = `
            ${data.map(image => `
                <article>
                <img src="${image.url}" alt="Foto gatito aleatoria" class="image" id="img${++i}">
                <button class="favorite-button" id="favorite-button${i}">🤍</button>
                </article>
                `).join('')}
                `;
                
                imgContainer.innerHTML = images;       
        }

        const favoriteButtons = document.querySelectorAll('.favorite-button');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', saveFavouriteMichis);
        });     
};

async function fetchFavoriteCats(){
        const response = await fetch(API_URL_FAVORITES.concat(API_KEY));
        const data = await response.json();
        
        const imgContainer = null || document.getElementById("favorite-image-container");
        let i = 0;
        
        if (response.status !== 200) {
            spanErrorFavorite.innerHTML = "Hubo un MichiError: " + response.status + data.message;

        } else {
            let images = `
            ${data.map(cat => `
                <article>
                <img src="${cat.image.url}" alt="Foto gatito favorito" class="favorite-cat" id="favorite${++i}">
                <button class="delete-button" id="delete-button${i}">➖</button>
                </article>
                `).join('')}
                `;
                
                imgContainer.innerHTML = images;    
        }
};

async function saveFavouriteMichis(){
    const res = await fetch (API_URL_FAVORITES.concat(API_KEY), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: '25'
        })
    })

    if (response.status !== 200){
        spanError.innerHTML = "Hubo un MichiError: " + response.status + data.message;
    } 
}


document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('reloadImage');
    button.addEventListener('click', fetchRandomCats);
});



fetchRandomCats();
fetchFavoriteCats();