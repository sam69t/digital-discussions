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
    let elements;
    if (mode === "player") {
      elements = chatContainer.querySelectorAll(".chats__message:not(.locked)");
    } else {
      elements = chatContainer.querySelectorAll(
        ".chats__message-tool:not(.locked)"
      );
    }
    let lastElement = elements[elements.length - 1];
    if (!lastElement) {
      lastElement = document.createElement("div");
      if (mode === "player") {
        lastElement.classList.add("chats__message");
      } else {
        lastElement.classList.add("chats__message-tool");
      }

      lastElement.classList.add("resize-ref");

      // lastElement.classList.add(
      //   `${meeting.localParticipant.id ? "chats__message" : ""}`
      // );
      chatContainer.style.fontSize = "150px";
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
