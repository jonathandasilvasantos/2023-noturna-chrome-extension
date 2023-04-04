document.getElementById("save").addEventListener("click", function () {
  var shortcut = document.getElementById("shortcut").value;
  chrome.storage.sync.set({ shortcut: shortcut }, function () {
    console.log("Shortcut saved:", shortcut);
  });
});

chrome.storage.sync.get(["shortcut"], function (result) {
  document.getElementById("shortcut").value = result.shortcut || "KeyI";
});

