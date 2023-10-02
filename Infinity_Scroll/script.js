const imageContainer = document.getElementById('img-container');
const loader = document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function displayPhotos() {
    imagesLoaded = 0;
    totalImages += photosArray.length;
    photosArray.forEach((photo) => {
        let element = `
            <a href='${photo.links.html}' target='_blank'>
                <img onload='imageLoaded()' src='${photo.urls.regular}' title='${photo.alt_description}' alt='${photo.alt_description}'>
            </a>
        `;
        imageContainer.innerHTML += element;
    });
}

function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
    }
}

// API configs
const count = 10;
const apiKey = 'sMaWIssf7NN4nApC-Dj6VH9p_oJZMzMQFe4PUg_qZ1k';
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}`;
const headers = {
    'Authorization': `Client-ID ${apiKey}`
};

function getPhotos() {
    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(data => {
            photosArray = data;
            displayPhotos();
        })
        .catch(err => {
            console.log(err)
        });
}

window.addEventListener('scroll', (event) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();