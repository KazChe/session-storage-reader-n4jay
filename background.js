chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installeded");
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: readSessionStorage,
  });
});

function readSessionStorage() {
  const allKeys = Object.keys(sessionStorage);
  allKeys.forEach((key) => {
    console.log(`${key}: ${sessionStorage.getItem(key)}`);
  });
}
