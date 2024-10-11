const targetUrl = 'https://developer.chrome.com/docs/extensions/'

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.startsWith(targetUrl)) {
    chrome.tabs.sendMessage(tabId, {
      message: 'pageLoaded'
    });
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.url.startsWith(targetUrl)) {
    chrome.tabs.sendMessage(details.tabId, {
      message: 'routeChanged',
      url: details.url
    });
  }
});
