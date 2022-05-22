interact(`${"." + vidSelect + 1}`).resizable({
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
      if (mode === "toolP") {
        meeting.sendChatMessage(
          JSON.stringify({ type: "resize-vid-participant", resizeWebcam })
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
interact(`${"." + vidSelect + 1}`).draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  // enable autoScroll

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener3,

    // call this function on every dragend event
  },
});
function dragMoveListener3(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-vid-participant",
        movingWebcam,
      })
    );
    console.log("sendingImgmsg");
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
/////////////

interact(`${"." + vidSelect + 2}`).resizable({
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
      if (mode === "toolP") {
        meeting.sendChatMessage(
          JSON.stringify({ type: "resize-vid-participant-2", resizeWebcam })
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
interact(`${"." + vidSelect + 2}`).draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  // enable autoScroll

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener4,

    // call this function on every dragend event
  },
});
function dragMoveListener4(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-vid-participant-2",
        movingWebcam,
      })
    );
    console.log("sendingImgmsg");
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
