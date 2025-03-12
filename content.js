// content.js

// Configuration for dark mode
const DARK_MODE_CONFIG = {
  background: '#121212',
  text: '#f5f5f5',
  links: '#90caf9',
  buttonBackground: '#333333',
  buttonText: '#ffffff',
  buttonHover: '#444444',
  secondaryBackground: '#1e1e1e',
  borders: '#333333'
};

// Function to apply or remove dark mode
function applyDarkMode(enable) {
  if (enable) {
    document.documentElement.classList.add('noturna-dark-mode');
    // Set data attribute for potential CSS selectors
    document.documentElement.setAttribute('data-noturna-dark', 'true');
  } else {
    document.documentElement.classList.remove('noturna-dark-mode');
    document.documentElement.removeAttribute('data-noturna-dark');
  }

  // Update button text if it exists
  const button = document.getElementById('noturna-toggle-button');
  if (button) {
    button.textContent = enable ? "Turn off dark mode" : "Turn on dark mode";
    button.style.backgroundColor = enable ? DARK_MODE_CONFIG.buttonBackground : "#fff";
    button.style.color = enable ? DARK_MODE_CONFIG.buttonText : "#000";
  }
}

// Function to create and append the toggle button
function createButton() {
  chrome.storage.sync.get(["showButton"], function (result) {
    if (result.showButton !== false) { // Default to showing button if setting doesn't exist
      // Check if button already exists
      if (document.getElementById('noturna-toggle-button')) return;

      const button = document.createElement("button");
      button.id = 'noturna-toggle-button';
      
      // Get current dark mode state
      const hostname = getCurrentHostname();
      chrome.storage.sync.get(["darkModeSettings"], function (result) {
        const darkModeSettings = result.darkModeSettings || {};
        const isDarkMode = darkModeSettings[hostname] || false;
        
        // Set button text based on current state
        button.textContent = isDarkMode ? "Turn off dark mode" : "Turn on dark mode";
        
        // Apply styles
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.right = "20px";
        button.style.zIndex = "999999"; // Higher z-index to ensure visibility
        button.style.padding = "10px 20px";
        button.style.backgroundColor = isDarkMode ? DARK_MODE_CONFIG.buttonBackground : "#fff";
        button.style.color = isDarkMode ? DARK_MODE_CONFIG.buttonText : "#000";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
        button.style.fontSize = "14px";
        button.style.fontFamily = "Arial, sans-serif";
        button.style.transition = "background-color 0.3s, color 0.3s";
        
        // Add hover effect
        button.addEventListener('mouseover', function() {
          this.style.backgroundColor = isDarkMode ? DARK_MODE_CONFIG.buttonHover : "#f0f0f0";
        });
        
        button.addEventListener('mouseout', function() {
          this.style.backgroundColor = isDarkMode ? DARK_MODE_CONFIG.buttonBackground : "#fff";
        });
        
        document.body.appendChild(button);
        
        // Add click event listener to the button
        button.addEventListener("click", function () {
          toggleDarkMode();
        });
      });
    }
  });
}

// Function to toggle dark mode
function toggleDarkMode() {
  const hostname = getCurrentHostname();
  chrome.storage.sync.get(["darkModeSettings"], function (result) {
    const darkModeSettings = result.darkModeSettings || {};
    const currentSetting = darkModeSettings[hostname] || false;
    darkModeSettings[hostname] = !currentSetting;
    chrome.storage.sync.set({ darkModeSettings }, function () {
      applyDarkMode(!currentSetting);
    });
  });
}

// Create comprehensive dark mode styles
function createDarkModeStyles() {
  const style = document.createElement('style');
  style.id = 'noturna-dark-mode-style';
  style.textContent = `
    /* Global dark mode styles */
    .noturna-dark-mode,
    .noturna-dark-mode body,
    html[data-noturna-dark="true"],
    html[data-noturna-dark="true"] body {
      background-color: ${DARK_MODE_CONFIG.background} !important;
      color: ${DARK_MODE_CONFIG.text} !important;
    }
    
    /* Text elements */
    .noturna-dark-mode h1,
    .noturna-dark-mode h2,
    .noturna-dark-mode h3,
    .noturna-dark-mode h4,
    .noturna-dark-mode h5,
    .noturna-dark-mode h6,
    .noturna-dark-mode p,
    .noturna-dark-mode span,
    .noturna-dark-mode div,
    .noturna-dark-mode li,
    .noturna-dark-mode label,
    .noturna-dark-mode strong,
    .noturna-dark-mode em,
    .noturna-dark-mode cite,
    .noturna-dark-mode td,
    .noturna-dark-mode th {
      color: ${DARK_MODE_CONFIG.text} !important;
    }
    
    /* Links */
    .noturna-dark-mode a {
      color: ${DARK_MODE_CONFIG.links} !important;
    }
    
    /* Forms and inputs */
    .noturna-dark-mode input,
    .noturna-dark-mode textarea,
    .noturna-dark-mode select,
    .noturna-dark-mode button {
      background-color: ${DARK_MODE_CONFIG.secondaryBackground} !important;
      color: ${DARK_MODE_CONFIG.text} !important;
      border-color: ${DARK_MODE_CONFIG.borders} !important;
    }
    
    /* Tables */
    .noturna-dark-mode table,
    .noturna-dark-mode tr,
    .noturna-dark-mode td,
    .noturna-dark-mode th {
      background-color: ${DARK_MODE_CONFIG.secondaryBackground} !important;
      border-color: ${DARK_MODE_CONFIG.borders} !important;
    }
    
    /* Common containers */
    .noturna-dark-mode header,
    .noturna-dark-mode footer,
    .noturna-dark-mode nav,
    .noturna-dark-mode aside,
    .noturna-dark-mode section,
    .noturna-dark-mode article,
    .noturna-dark-mode div[class*="container"],
    .noturna-dark-mode div[class*="wrapper"],
    .noturna-dark-mode div[class*="header"],
    .noturna-dark-mode div[class*="footer"],
    .noturna-dark-mode div[class*="content"],
    .noturna-dark-mode div[class*="main"] {
      background-color: ${DARK_MODE_CONFIG.background} !important;
    }
    
    /* Shadow and border overrides */
    .noturna-dark-mode * {
      box-shadow: none !important;
      text-shadow: none !important;
      border-color: ${DARK_MODE_CONFIG.borders} !important;
    }
    
    /* Force background images to be dimmed */
    .noturna-dark-mode *:not(img) {
      background-image: none !important;
    }
    
    /* Override fixed backgrounds */
    .noturna-dark-mode [style*="background"], 
    .noturna-dark-mode [style*="background-color"] {
      background-color: ${DARK_MODE_CONFIG.background} !important;
    }
    
    /* Handle common site component naming patterns */
    .noturna-dark-mode [class*="bg-white"],
    .noturna-dark-mode [class*="bg-light"],
    .noturna-dark-mode [class*="background-white"],
    .noturna-dark-mode [class*="background-light"] {
      background-color: ${DARK_MODE_CONFIG.background} !important;
    }
    
    .noturna-dark-mode [class*="text-dark"],
    .noturna-dark-mode [class*="text-black"] {
      color: ${DARK_MODE_CONFIG.text} !important;
    }
  `;
  document.head.appendChild(style);
}

// Function to get the current site's hostname
function getCurrentHostname() {
  return window.location.hostname;
}

// Function to apply dark mode based on global settings
function applyGlobalSettings() {
  chrome.storage.sync.get(["globalDarkMode"], function (result) {
    if (result.globalDarkMode) {
      // Global dark mode is enabled, apply to all sites
      applyDarkMode(true);
    } else {
      // Check site-specific settings
      const hostname = getCurrentHostname();
      chrome.storage.sync.get(["darkModeSettings"], function (result) {
        const darkModeSettings = result.darkModeSettings || {};
        const isDarkMode = darkModeSettings[hostname] || false;
        applyDarkMode(isDarkMode);
      });
    }
  });
}

// Function to handle DOM mutations for dynamic sites
function observeChanges() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // Check if we need to reapply dark mode for new elements
        const hostname = getCurrentHostname();
        chrome.storage.sync.get(["darkModeSettings", "globalDarkMode"], function (result) {
          const globalDarkMode = result.globalDarkMode || false;
          const darkModeSettings = result.darkModeSettings || {};
          const siteDarkMode = darkModeSettings[hostname] || false;
          
          if (globalDarkMode || siteDarkMode) {
            // No need to reapply entire style - the CSS will handle new elements
            // But we can re-check the toggle button
            if (!document.getElementById('noturna-toggle-button')) {
              createButton();
            }
          }
        });
      }
    });
  });
  
  // Start observing the document body for DOM changes
  observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize the script
function initialize() {
  // Create dark mode styles first
  createDarkModeStyles();
  
  // Apply appropriate dark mode settings
  applyGlobalSettings();
  
  // Create the toggle button
  createButton();
  
  // Observe DOM changes
  observeChanges();
}

// Run when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}

// Listen for messages from popup.js or options.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
    sendResponse({ status: "Dark mode toggled" });
    return true; // Indicates async response
  } else if (request.action === "applyGlobalDarkMode") {
    applyDarkMode(true);
    sendResponse({ status: "Global dark mode applied" });
    return true;
  } else if (request.action === "refreshDarkMode") {
    applyGlobalSettings();
    sendResponse({ status: "Dark mode settings refreshed" });
    return true;
  }
});