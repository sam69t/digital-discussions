const chatContainer = document.querySelector("#chats");

const CHAT = {
  addTextToLastMsg(text) {
    const lastElement = this.getOrAddMsgElem();
    lastElement.textContent = text;
  },

  lockLastMsg() {
    const lastElement = this.getOrAddMsgElem();
    lastElement.classList.add("locked");
  },

  getOrAddMsgElem() {
    const elements = chatContainer.querySelectorAll(
      ".chats__message:not(.locked)"
    );
    let lastElement = elements[elements.length - 1];
    if (!lastElement) {
      lastElement = document.createElement("div");
      lastElement.classList.add("chats__message");
      lastElement.classList.add("resize-drag");

      // lastElement.classList.add(
      //   `${meeting.localParticipant.id ? "chats__message" : ""}`
      // );
      chatContainer.appendChild(lastElement);
    }

    return lastElement;
  },

  executeAction(action, message) {
    switch (action) {
      case "ontap":
        // this.addTextToLastMsg()
        break;
      case "end":
        break;
    }
  },
};
