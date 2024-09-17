// Initialize popup based on current dark mode state
document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(["darkMode"], function (result) {
      const toggleButton = document.getElementById("toggleDarkMode");
      const darkMode = result.darkMode || false;
      toggleButton.textContent = darkMode ? "Turn off dark mode" : "Turn on dark mode";
    });
    
    // Add event listener to toggle button
    document.getElementById("toggleDarkMode").addEventListener("click", function () {
      chrome.storage.sync.get(["darkMode"], function (result) {
        const darkMode = result.darkMode || false;
        chrome.storage.sync.set({ darkMode: !darkMode }, function () {
          // Update button text
          document.getElementById("toggleDarkMode").textContent = !darkMode ? "Turn off dark mode" : "Turn on dark mode";
          // Optionally, send a message to content scripts to update immediately
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode" });
          });
        });
      });
    });
  });
  