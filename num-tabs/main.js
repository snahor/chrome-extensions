const countTabs = () =>
  chrome.tabs.query({}, tabs => chrome.action.setBadgeText({ text: `${tabs.length}` }))

// Update count when tabs change
chrome.tabs.onCreated.addListener(countTabs)
chrome.tabs.onRemoved.addListener(countTabs)

// Initialize on install and startup
chrome.runtime.onInstalled.addListener(countTabs)

// Also update when the service worker wakes up
chrome.runtime.onStartup.addListener(countTabs)
