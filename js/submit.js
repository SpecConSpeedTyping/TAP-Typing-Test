document.addEventListener("DOMContentLoaded", function() {
  const wpmSpan = document.getElementById("wpm");
  const accuracySpan = document.getElementById("accuracy");
  const mistakesSpan = document.getElementById("mistakes"); // Define mistakesSpan

  // Retrieve saved WPM, Accuracy, and Mistakes from sessionStorage
  var savedWPM = sessionStorage.getItem("WPM");
  var savedAccuracy = sessionStorage.getItem("Accuracy");
  var savedMistakes = sessionStorage.getItem("Mistakes"); // Retrieve saved Mistakes

  // Update the elements on the page with the retrieved score data
  if (savedWPM !== null && savedAccuracy !== null && savedMistakes !== null) {
    wpmSpan.innerText = savedWPM;
    accuracySpan.innerText = savedAccuracy;
    mistakesSpan.innerText = savedMistakes; // Update Mistakes display
  }

  // Update the hidden input fields with WPM, Accuracy, and Mistakes scores before submitting the form
  document.getElementById("wpm").value = savedWPM;
  document.getElementById("accuracy").value = savedAccuracy;
  document.getElementById("mistakes").value = savedMistakes; // Update Mistakes hidden input
});
