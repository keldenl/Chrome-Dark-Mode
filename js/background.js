/* 
    Background.js
    Connects content script and popup. 
    Handles stored user preferences and enables dark mode initally if applicable. 
*/

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var currState = false
    if(msg.action == "setDarkState") currState = true
    setDarkState(currState)
});