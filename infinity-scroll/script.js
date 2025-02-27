const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Check if all mages were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
// Create a helper function
function setAttributes(element, attribute) {
    // using for-in loop
    for (const key in attribute) {
        element.setAttribute(key,attribute[key]);
    } 
}
// Create Elements for links and photos,add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
    // create <a> to link to unsplash
     const item = document.createElement('a');
    //  using helper function to add to DOM
    setAttributes(item,{
        href: photo.links.html,
        target: '_blank',
    });
    //  Create <img> for photo
    const img = document.createElement('img');
    // using helper function to add to DOM
    setAttributes(img,{
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener('load',imgLoaded);
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
        getPhotos();
    }
}
// Check to see if scrolling near bottom of page, load mote photos
window.addEventListener('scroll',() => {
 if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
 }
});
// Run on Load
getPhotos();