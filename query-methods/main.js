const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=12";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_DELETE_FAVORITES = "https://api.thecatapi.com/v1/favourites/";
const API_KEY = 'live_EmLM3MNG3CDNwYPrgXekPclnnI12Hap2i8i8ufe8ZNhe4Sd3ozZDREAP6x8UojUj';

const spanError = document.getElementById('michiError')
const spanErrorFavorite = document.getElementById('michiErrorFavorite')

async function fetchRandomCats(){
  
        const response = await fetch(API_URL_RANDOM, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY
            }
        });
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


                const favoriteButtons = document.querySelectorAll('.favorite-button');
                favoriteButtons.forEach((button, index) => {
                    button.addEventListener('click', () => saveFavouriteMichis(data[index].id));
                });     
        }

};

async function fetchFavoriteCats(){
        const response = await fetch(API_URL_FAVORITES, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY
            }
        });
        const data = await response.json();
        
        const imgContainer = null || document.getElementById("favorite-image-container");
        let i = 0;
        
        if (response.status !== 200) {
            spanErrorFavorite.innerHTML = "Hubo un MichiError: " + response.status + data.message;

        } else {
            let images = `
            ${data.map(cat => `
                <article>
                <img src="${cat.image.url}" alt="Foto gatito favorito" class="image" id="favorite${++i}">
                <button class="delete-button" id="delete-button${i}">-</button>
                </article>
                `).join('')}
                `;
                
                imgContainer.innerHTML = images;    

                const deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach((button, index) => {
                    button.addEventListener('click', () => deleteFavouriteMichis(data[index].id));
                });     
        }
};

async function saveFavouriteMichis(id){
    const res = await fetch (API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY
        },
        body: JSON.stringify({
            image_id: id
        })
    })

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un MichiError: " + res.status;
    } else {
        fetchFavoriteCats();
    }
}

async function deleteFavouriteMichis(id){
    const urlDelete = API_URL_DELETE_FAVORITES + id;
    const res = await fetch (urlDelete, {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY,
        }
    });

    if (res.status !== 200){
        spanErrorFavorite.innerHTML = "Hubo un MichiError: " + res.status;
    } else {
        fetchFavoriteCats();
    }
}

async function uploadMichiPicture(){
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('reloadImage');
    button.addEventListener('click', fetchRandomCats);
});


fetchRandomCats();
fetchFavoriteCats();