// ---------------------------
// Handle Sign Up / Login
// ---------------------------
document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function(e) {
      e.preventDefault(); // prevent page reload

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username && password) {
        // Save user to localStorage so they don’t need to sign up again
        localStorage.setItem("loggedInUser", username);
        alert("Sign Up successful! Welcome, " + username);

        // Redirect to the symptom checker page
        window.location.href = "disease.html";
      } else {
        alert("Please fill all fields.");
      }
    });
  }

  // If already logged in, skip sign up and go to disease checker
  const user = localStorage.getItem("loggedInUser");
  if (user && window.location.pathname.includes("index.html")) {
    window.location.href = "disease.html";
  }
});

// ---------------------------
// Disease Checker Logic
// ---------------------------
function checkDisease() {
  const symptomsInput = document.getElementById("symptoms");
  if (!symptomsInput) return; // safety check

  const symptoms = symptomsInput.value.toLowerCase();
  let result = "";

  if (symptoms.includes("fever")) {
    result = `
      <h3>Disease: Fever</h3>
      <p><strong>Symptoms:</strong> High temperature, chills, weakness.</p>
      <p><strong>Precautions:</strong> Rest, stay hydrated.</p>
      <p><strong>Medicines:</strong> Paracetamol (low severity).</p>
      <p><strong>Severity:</strong> If persistent/high → Consult a doctor.</p>
    `;
  } else if (symptoms.includes("cold")) {
    result = `
      <h3>Disease: Common Cold</h3>
      <p><strong>Symptoms:</strong> Sneezing, runny nose, cough.</p>
      <p><strong>Precautions:</strong> Warm fluids, rest.</p>
      <p><strong>Medicines:</strong> Cough syrup, antihistamines.</p>
      <p><strong>Severity:</strong> Low.</p>
    `;
  } else if (symptoms.includes("epilepsy")) {
    result = `
      <h3>Disease: Epilepsy</h3>
      <p><strong>Symptoms:</strong> Seizures, confusion, loss of awareness.</p>
      <p><strong>Precautions:</strong> Avoid triggers, regular medication.</p>
      <p><strong>Medicines:</strong> Not suggested here.</p>
      <p><strong>Severity:</strong> High — Consult a doctor immediately.</p>
    `;
  } else if (symptoms.includes("piles")) {
    result = `
      <h3>Disease: Piles (Hemorrhoids)</h3>
      <p><strong>Symptoms:</strong> Painful swelling near anus, bleeding.</p>
      <p><strong>Precautions:</strong> High-fiber diet, avoid straining.</p>
      <p><strong>Medicines:</strong> Ointments, stool softeners (low severity).</p>
      <p><strong>Severity:</strong> Severe bleeding → Consult a doctor.</p>
    `;
  } else if (symptoms.includes("migraine")) {
    result = `
      <h3>Disease: Migraine</h3>
      <p><strong>Symptoms:</strong> Severe headache, nausea, sensitivity to light.</p>
      <p><strong>Precautions:</strong> Rest in dark room, avoid triggers.</p>
      <p><strong>Medicines:</strong> Pain relievers (low severity).</p>
      <p><strong>Severity:</strong> Frequent/severe → Consult a doctor.</p>
    `;
  } else if (symptoms.includes("pcod") || symptoms.includes("pcos") || symptoms.includes("menstrual")) {
    result = `
      <h3>Condition: PCOD/PCOS / Menstrual Health</h3>
      <p><strong>Symptoms:</strong> Irregular periods, weight gain, acne.</p>
      <p><strong>Precautions:</strong> Healthy diet, exercise, stress management.</p>
      <p><strong>Medicines:</strong> Not suggested here.</p>
      <p><strong>Severity:</strong> Severe pain/irregular cycles → Consult a gynecologist.</p>
    `;
  } else {
    result = `<p>No matching disease found. Please consult a doctor.</p>`;
  }

  document.getElementById("results").innerHTML = result;
}
