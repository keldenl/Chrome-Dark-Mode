/* 
    Background.js
    Handles enabling dark mode initally if applicable. 
    Records user preferences as well
*/  

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var currState = false
    if(msg.action == "setDarkState") currState = true
    setDarkState(currState)
});

/* Commented out Alarm function. Stretch goal of implementation of session length */

// function startTimer() {
//     var sessions = {}

//     var newdate = new Date()
//     sessions["currSession"] = newdate
//     console.log("initial add: " + sessions)
//     chrome.storage.sync.set(sessions)

//     chrome.alarms.create(String(newdate), {
//         periodInMinutes: .016666
//     })

//     chrome.alarms.onAlarm.addListener(alarmListener)
// }

// function alarmListener(alarm) {
//     // var items = {}
//     // var currInt = 0
//     // getLastSession((session) => {
//     //     currInt = Number(session)
//     // })
//     // items["currSession"] = currInt++
//     // console.log(alarm.name + ": " + items["currSession"])
//     // chrome.storage.sync.set(items)
//     // chrome.alarms.getAll(function(alarm) {
//     //     console.log(alarm)
//     // })
// }

// function clearTimer() {
//     getLastSession((sessions) => {
//         console.log(sessions)
//     })

//     console.log(new Date())

//     chrome.alarms.onAlarm.removeListener(alarmListener)
//     chrome.alarms.clearAll()
// }
