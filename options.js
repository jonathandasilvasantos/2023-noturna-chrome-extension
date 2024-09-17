// options.js

// Save settings
document.getElementById("save").addEventListener("click", function () {
  const showButton = document.getElementById("showButton").checked;

  chrome.storage.sync.set({ showButton }, function () {
    alert("Settings have been saved successfully.");
  });
});

// Load settings
chrome.storage.sync.get(["showButton"], function (result) {
  const showButton = result.showButton || false;
  document.getElementById("showButton").checked = showButton;
});
