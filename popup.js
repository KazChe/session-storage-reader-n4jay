document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("readSessionStorage")
    .addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: readSessionStorageAndSend,
        });
      });
    });

  function readSessionStorageAndSend() {
    try {
      const currentConnection = JSON.parse(
        sessionStorage.getItem("nx.v1.nx.currentConnection")
      );
      if (!currentConnection) {
        chrome.runtime.sendMessage([
          {
            key: "No NX Connection",
            value: "No current connection found in sessionStorage",
          },
        ]);
        return;
      }

      console.log("Access Token:", currentConnection.authToken.credentials);
      console.log("Database URI:", currentConnection.url);

      const storageData = [
        { key: "Access Token", value: currentConnection.authToken.credentials },
        { key: "Database URI", value: currentConnection.url },
      ];
      chrome.runtime.sendMessage(storageData);
    } catch (error) {
      chrome.runtime.sendMessage([
        {
          key: "Error",
          value: `Failed to parse NX connection: ${error.message}`,
        },
      ]);
    }
  }

  function copyValue(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy"); // this method is defecated, but it works...fornow https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
    document.body.removeChild(textArea);
  }

  chrome.runtime.onMessage.addListener((message) => {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    message.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = `${item.key}: ${item.value}`;
      let copyIcon = document.createElement("img");
      copyIcon.src = "copy-icon.png";
      copyIcon.className = "copy-icon";
      copyIcon.addEventListener("click", () => copyValue(item.value));
      div.appendChild(copyIcon);
      outputDiv.appendChild(div);
    });
  });
});
