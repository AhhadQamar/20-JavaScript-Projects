// Get DOM elements
const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const audioElement = document.getElementById("backgroundAudio");
const toggleAudioBtn = document.getElementById("toggleAudio");

// Show location alert when page loads
window.addEventListener("load", () => {
  alert("This website shows Iftar time for Toba Tek Singh, Pakistan");
});

let targetTime = null;

// Function to get iftar time from time.json
async function getIftarTime() {
  try {
    const response = await fetch("./time.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Get today's date and find the corresponding index
    const today = new Date();
    const todayIndex = today.getDate() - 1; // Subtract 1 because array starts from 1st March

    // Get today's iftar time
    const iftarTime = data.data[todayIndex].timings.Maghrib.replace(
      /\s*\(.*?\)\s*/g,
      ""
    ).trim();

    // Parse the iftar time
    const [hours, minutes] = iftarTime.split(":").map(Number);
    targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    // Start the countdown
    updateTime();
    setInterval(updateTime, 1000);
  } catch (error) {
    console.error("Error fetching time.json:", error);
    timeElement.textContent = "Error loading time";
  }
}

// Function to update the time display
function updateTime() {
  if (!targetTime) return;

  const now = new Date();
  const timeLeft = targetTime - now;

  if (timeLeft <= 0) {
    timeElement.textContent = "It's Iftar Time!";
    timeElement.classList.add("iftar-reached");
    return;
  }

  timeElement.classList.remove("iftar-reached");
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  timeElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to update the date display
function updateDate() {
  const now = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const dateString = now.toLocaleDateString("en-US", options);
  dateElement.textContent = `Ramadan 1445 • ${dateString}`;
}

// Audio control functionality
let isAudioPlaying = false;

toggleAudioBtn.addEventListener("click", () => {
  if (isAudioPlaying) {
    audioElement.pause();
    toggleAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    audioElement.play();
    toggleAudioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
  isAudioPlaying = !isAudioPlaying;
});

// Initialize the application
getIftarTime();
setInterval(updateDate, 1000);
updateDate();
