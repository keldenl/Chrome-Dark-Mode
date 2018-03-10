/* 
    Initial.js
    Handles saved user pref and tells background.js to activate dark mode if applicable. 
*/

getSavedDarkState((darkState) => {
    if (darkState) chrome.runtime.sendMessage({ action:'setDarkState' })
    else chrome.runtime.sendMessage({ action:'unsetDarkState' })
})


function getSavedDarkState(callback) {
    chrome.storage.sync.get("state", (items) => {
        callback(chrome.runtime.lastError ? null : items["state"]);
      });
}