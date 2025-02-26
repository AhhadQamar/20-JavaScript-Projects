const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let photosArray = [];
// Create Elements for links and photos,add to DOM
function displayPhotos() {
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
    // create <a> to link to unsplash
     const item = document.createElement('a');
     item.setAttribute('href',photo.links.html);
     item.setAttribute('target','_blank');
    //  Create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    // put <img> in <a> and both of them in imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
     });
}
// Get photos from unsplash api
async function getPhotos() {
    const apiKey = 'kLjYnvoMT4cwfZJf4otu6jz3lAYcoxydFUFXmzYoINo';
    const count = 10;
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        
    }
}
getPhotos();

