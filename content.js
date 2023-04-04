// Create and append a button to the body
const button = document.createElement("button");
button.innerHTML = "Turn on dark mode";
document.body.appendChild(button);

// Set a flag for the dark mode state
let darkMode = false;

// Toggle the dark mode on and off
function toggleDarkMode() {
  darkMode = !darkMode;
  const backgroundColor = darkMode ? "black" : "";
  const color = darkMode ? "white" : "";

  document.body.style.backgroundColor = backgroundColor;
  document.body.style.color = color;

  const elements = document.getElementsByTagName("*");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.backgroundColor = backgroundColor;
    elements[i].style.color = color;
  }

  button.innerHTML = darkMode ? "Turn off dark mode" : "Turn on dark mode";
}

// Add a click event listener to the button
button.addEventListener("click", toggleDarkMode);

// Get the selected keyboard shortcut from the options page and add a keydown event listener
chrome.storage.sync.get(["shortcut"], function (result) {
  const shortcut = result.shortcut || "KeyI";

  document.addEventListener("keydown", function (event) {
    // Check if the key combination is CMD + SHIFT + selected key (Mac) or CTRL + SHIFT + selected key (Windows)
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.code === shortcut) {
      toggleDarkMode();
    }
  });
});
