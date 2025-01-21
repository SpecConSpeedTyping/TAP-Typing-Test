// Prevent navigation back to the previous page
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event) {
  history.pushState(null, document.title, location.href);
});

// Function to hide a button with the ID 'hide'
function hide() {
  var button = document.getElementById('hide');
  if (button) {
    button.style.display = "none"; // Hide the button
  } else {
    console.warn("Element with ID 'hide' not found.");
  }
}
