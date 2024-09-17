// content.js

// Initialize dark mode state
let darkMode = false;

// Function to apply or remove dark mode
function toggleDarkMode() {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add('noturna-dark-mode');
  } else {
    document.body.classList.remove('noturna-dark-mode');
  }

  // Update button text if it exists
  const button = document.getElementById('noturna-toggle-button');
  if (button) {
    button.textContent = darkMode ? "Turn off dark mode" : "Turn on dark mode";
  }

  // Save the current dark mode state
  chrome.storage.sync.set({ darkMode });
}

// Function to create and append the toggle button
function createButton() {
  chrome.storage.sync.get(["showButton"], function (result) {
    if (result.showButton) {
      // Check if button already exists
      if (document.getElementById('noturna-toggle-button')) return;

      const button = document.createElement("button");
      button.id = 'noturna-toggle-button';
      button.innerHTML = darkMode ? "Turn off dark mode" : "Turn on dark mode";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.zIndex = "9999";
      button.style.padding = "10px 20px";
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      button.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      document.body.appendChild(button);

      // Add click event listener to the button
      button.addEventListener("click", toggleDarkMode);
    }
  });
}

// Apply dark mode styles
const style = document.createElement('style');
style.id = 'noturna-dark-mode-style';
style.textContent = `
  .noturna-dark-mode {
    background-color: #000 !important;
    color: #fff !important;
  }
  .noturna-dark-mode * {
    background-color: #000 !important;
    color: #fff !important;
    border-color: #fff !important;
  }
`;
document.head.appendChild(style);

// Initialize the script
chrome.storage.sync.get(["darkMode"], function (result) {
  darkMode = result.darkMode || false;

  if (darkMode) {
    document.body.classList.add('noturna-dark-mode');
  }

  createButton();
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
    sendResponse({ status: "Dark mode toggled" });
  }
});
