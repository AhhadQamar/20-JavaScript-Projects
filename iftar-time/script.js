const timeText = document.querySelector('#time');
let timeArray = [];
const today = new Date().getDate(); 
function displayTime() {
    const time = timeArray.data[today - 1].timings.Maghrib.replace(/\s*\(.*?\)\s*/g, '').trim();
    timeText.textContent = time;
    console.log(time);
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