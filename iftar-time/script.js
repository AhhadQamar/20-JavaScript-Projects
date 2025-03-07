const timeText = document.querySelector('#time');
let timeArray = [];
const today = new Date().getDate(); 
function displayTime() {
    timeText.textContent = timeArray.data[today - 1].timings.Maghrib;
}
async function getTime() {
    try {
        const response = await fetch('./time.json'); 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        timeArray = await response.json();
        displayTime();
    } catch (error) {
        console.error("Error fetching time.json:", error);
    }
}
getTime();