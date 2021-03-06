/* 
    Popup.js Logic
    Turns on/off dark mode based on checkbox interactions. Updates visuals from saved state.
*/

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, (tabs) => {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    })
}

function getSavedDarkState(callback) {
    chrome.storage.sync.get("state", (items) => {
        callback(chrome.runtime.lastError ? null : items["state"]);
      });
}

function getRecentSession(callback) {
    chrome.storage.sync.get("recentSession", (items) => {
        callback(chrome.runtime.lastError ? null : items["recentSession"]);
      });
}

function saveDarkState(state) {
    var items = {};
    items["state"] = state
    if(!state) items["recentSession"] = String(new Date()) // Update last session only when disabling
    else getRecentSession(function(session) { items["recentSession"] = session })
    chrome.storage.sync.set(items)
}

// Updates the indicators
function updateIconText(checkboxText, state) {
    if(state) {
        checkboxText.innerHTML = "Toggle: ON"
        chrome.browserAction.setIcon({path: "imgs/default-dark.png"})
    } else {
        checkboxText.innerHTML = "Toggle: OFF"
        chrome.browserAction.setIcon({path: "imgs/default-light.png"})
    }
}

function updateRecentSession() {
    var sessionContainer = document.getElementById('session')
    getRecentSession(function(session) {
        sessionContainer.innerHTML = session
    })
}

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        var checkbox = document.getElementById('checkBox')
        var checkboxText = document.getElementById('checkbox-text')

        // Turn on dark mode if already on
        getSavedDarkState((state) => {
            checkbox.checked = state
            updateIconText(checkboxText, state)
            updateRecentSession()
        })

        // Check for checkbox toggles
        checkbox.addEventListener('change', () => {
            var state = checkbox.checked
            setDarkState(state)
            saveDarkState(state)
            updateIconText(checkboxText, state)
            updateRecentSession()
        })
    });
});
