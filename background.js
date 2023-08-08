chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == "complete") {
      chrome.tabs.sendMessage(
        tabId, {function: "onUpdated"}, null)
        }
    }
  )
  
  chrome.tabs.onActivated.addListener((tabData, changeInfo, tab) => {
    chrome.tabs.sendMessage(
      tabData.tabId, {function: "onActivated"}, null)
    }
  )
