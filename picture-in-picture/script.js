const videoElement = document.getElementById('video');
const button =  document.getElementById('button')






//Prompt to select a media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadeddata = () =>{
            videoElement.play();
        };
    } catch (error) {
        console.log(error);
    }
}
button.addEventListener('click', async () => {
   button.disable = true;
   await videoElement.requestPictureInPicture;
   button.disable = false; 
});
// On Load
selectMediaStream();