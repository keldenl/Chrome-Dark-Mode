/* 
    stateFunc.js
    Contains all functions relating to ACTUAL css manipulation. (dark/light mode)
*/

function setModeState(tabId, state) { // True state = dark mode on
    var filePath = "css/global.css"
    if (!state) filePath = "css/disable-global.css"

    chrome.tabs.insertCSS(tabId, {
        file: filePath
    });
}

// Sets all the tabs in dark/light mode
function setDarkState(state) {
    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
            window.tabs.forEach(function(tab){
                setModeState(tab.id, state)
            });
        });
    });
}