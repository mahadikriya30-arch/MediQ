// Populate time dropdown with 30-minute intervals
document.addEventListener("DOMContentLoaded", function() {
  const timeSelect = document.getElementById("alarmTime");
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, "0");
      const minute = m.toString().padStart(2, "0");
      const value = `${hour}:${minute}`;

      // Convert to AM/PM format for display
      let displayHour = h % 12 || 12;
      let ampm = h < 12 ? "AM" : "PM";
      const display = `${displayHour}:${minute} ${ampm}`;

      const option = document.createElement("option");
      option.value = value;
      option.textContent = display;
      timeSelect.appendChild(option);
    }
  }
});

let alarmTimeout;
let ringtone;

// Set Alarm
function setAlarm() {
  const time = document.getElementById("alarmTime").value;
  const ringtoneFile = document.getElementById("ringtoneSelect").value;

  if (time && ringtoneFile) {
    alert("Alarm saved for " + time + " with ringtone: " + ringtoneFile);
    document.getElementById("alarmControls").style.display = "block";

    // Save alarm time and ringtone to localStorage
    localStorage.setItem("alarmTime", time);
    localStorage.setItem("alarmRingtone", ringtoneFile);

    // Load ringtone
    ringtone = new Audio(ringtoneFile);

    // Play immediately (user interaction unlocks audio)
    ringtone.play().catch(error => {
      console.log("Playback blocked:", error);
      alert("Please click Save Alarm again to allow sound.");
    });

    // Schedule alarm check
    scheduleAlarm(time, ringtoneFile);
  } else {
    alert("Please select both time and ringtone.");
  }
}

// Function to check and play alarm at given time
function scheduleAlarm(time, ringtoneFile) {
  clearInterval(alarmTimeout);
  alarmTimeout = setInterval(() => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" +
                        now.getMinutes().toString().padStart(2, "0");

    if (currentTime === time) {
      const audio = new Audio(ringtoneFile);
      audio.play().catch(error => {
        console.log("Playback blocked:", error);
      });
      alert("Reminder: Please take your medicine!");
    }
  }, 60000); // check every minute
}

// Snooze Function with Calendar Update
function snooze() {
  if (ringtone) ringtone.pause();
  let answer = confirm("Did you take your medicine?");
  const today = new Date().toLocaleDateString();

  let records = JSON.parse(localStorage.getItem("medicineRecords")) || [];
  records.push({ date: today, taken: answer });
  localStorage.setItem("medicineRecords", JSON.stringify(records));

  updateCalendarDisplay(records);
}

// Remind Later (10 minutes)
function remindLater() {
  alert("You will be reminded again in 10 minutes.");
  setTimeout(() => {
    const ringtoneFile = localStorage.getItem("alarmRingtone") || "alarm1.mp3";
    const audio = new Audio(ringtoneFile);
    audio.play().catch(error => {
      console.log("Playback blocked:", error);
    });
    alert("Reminder: Please take your medicine now!");
  }, 10 * 60 * 1000);
}

// Update Calendar Display
function updateCalendarDisplay(records) {
  const calendar = document.getElementById("calendarGrid");
  calendar.innerHTML = "";
  records.forEach(record => {
    const entry = document.createElement("div");
    entry.textContent = `${record.date}: ${record.taken ? "✅ Medicine Taken" : "❌ Medicine Not Taken"}`;
    calendar.appendChild(entry);
  });
}

// Load saved alarm time, ringtone, and records on page load
window.addEventListener("load", function() {
  const savedTime = localStorage.getItem("alarmTime");
  const savedRingtone = localStorage.getItem("alarmRingtone");

  if(savedTime) {
    document.getElementById("alarmTime").value = savedTime;
    document.getElementById("alarmControls").style.display = "block";
    if(savedRingtone) {
      document.getElementById("ringtoneSelect").value = savedRingtone;
      scheduleAlarm(savedTime, savedRingtone);
    }
  }

  const records = JSON.parse(localStorage.getItem("medicineRecords")) || [];
  updateCalendarDisplay(records);
});
