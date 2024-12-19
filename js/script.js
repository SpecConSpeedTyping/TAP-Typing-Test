const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".wrapper .input-field"),
  tryAgainBtn = document.querySelector(".content button"),
  submitBtn = document.getElementById("submit-btn"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  accuracyTag = document.querySelector(".accuracy span");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = mistakes = isTyping = 0;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      if (charIndex > 0) {
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
          mistakes--;
        }
        characters[charIndex].classList.remove("correct", "incorrect");
      }
    } else {
      if (characters[charIndex].innerText == typedChar) {
        characters[charIndex].classList.add("correct");
      } else {
        mistakes++;
        characters[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");

    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakes;

    // Calculate and display accuracy percentage
    let accuracy = ((charIndex - mistakes) / charIndex) * 100;
    accuracy = isNaN(accuracy) ? 100 : accuracy.toFixed(2);
    accuracyTag.innerText = `${accuracy}%`;
  } else {
    clearInterval(timer);
    inpField.value = "";

    // Show the Submit button when the timer is done
    submitBtn.style.display = 'block';

    // Save WPM, Accuracy, and Mistakes in sessionStorage
    saveResults();
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
    wpmTag.innerText = wpm;
  } else {
    clearInterval(timer);

    // Save WPM, Accuracy, and Mistakes in sessionStorage
    saveResults();
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  accuracyTag.innerText = "0%";

  // Hide the Submit button on reset
  submitBtn.style.display = 'none';
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Save WPM, Accuracy, and Mistakes in sessionStorage after the user has finished typing
function saveResults() {
  var wpmValue = parseInt(wpmTag.innerText); // Get the actual WPM value as an integer
  var accuracyValue = parseFloat(accuracyTag.innerText); // Get the actual Accuracy value as a float

  // Calculate Mistakes value based on the mistakes variable in your code
  var mistakesValue = mistakes;

  // Save WPM, Accuracy, and Mistakes in sessionStorage
  sessionStorage.setItem("WPM", wpmValue);
  sessionStorage.setItem("Accuracy", accuracyValue);
  sessionStorage.setItem("Mistakes", mistakesValue);
}
