const videosContainer = document.querySelector(".videos-container");
let firstVid = videosContainer.firstElementChild;
let SecondVid = videosContainer.lastElementChild;
const position = { x: 0, y: 0 };

if (mode === "toolH") {
  position.x = 0;
}

if (mode === "toolP") {
  position.x = 0;
}
const VIDEO = {
  moveVideo(src, x, y) {
    interact(".resize-drag").draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent",
          endOnly: true,
        }),
      ],
      listeners: {
        move(event) {
          const movingWebcam = {
            x: (position.x += event.dx),
            y: (position.y += event.dy),
          };

          // meeting.sendChatMessage(
          //   JSON.stringify({ type: "moving-webcam", movingWebcam })
          // );
          if (mode === "toolH") {
            meeting.sendChatMessage(
              JSON.stringify({
                type: "moving-webcam-host",
                movingWebcam,
              })
            );
          }

          if (mode === "toolP") {
            meeting.sendChatMessage(
              JSON.stringify({
                type: "moving-webcam-participant",
                movingWebcam,
              })
            );
          }
          // position.x += event.dx;
          // position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      },
    });
    // const lastElement = this.getOrAddMsgElem();
    // lastElement.textContent = text;
  },

  resizeVideo() {
    interact(".resize-drag").resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;

          // update the element's style
          target.style.width = event.rect.width + "px";
          target.style.height = event.rect.height + "px";

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);

          const resizeWebcam = {
            w: event.rect.width,
            h: event.rect.height,
          };
          if (mode === "toolH") {
            meeting.sendChatMessage(
              JSON.stringify({ type: "resize-webcam-host", resizeWebcam })
            );
          }
          if (mode === "toolP") {
            meeting.sendChatMessage(
              JSON.stringify({
                type: "resize-webcam-participant",
                resizeWebcam,
              })
            );
          }
        },
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "wrapper",
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
        }),
      ],

      inertia: true,
    });
    // const lastElement = this.getOrAddMsgElem();
    // lastElement.classList.add("locked");
  },
};
