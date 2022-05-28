// let test = `${"." + imgSelect + imgNumber}`;
// console.log(imgNumber, test);

interact(`${"." + imgSelect + 1}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant", resizeWebcam })
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
interact(`${"." + imgSelect + 1}`).draggable({
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
    move: dragMoveListener,

    // call this function on every dragend event
  },
});
function dragMoveListener(event) {
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
        type: "moving-img-participant",
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

interact(`${"." + imgSelect + 2}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-2", resizeWebcam })
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
interact(`${"." + imgSelect + 2}`).draggable({
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
    move: dragMoveListener2,

    // call this function on every dragend event
  },
});
function dragMoveListener2(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-2",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 3}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-3", resizeWebcam })
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
interact(`${"." + imgSelect + 3}`).draggable({
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

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-3",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 4}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-4", resizeWebcam })
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
interact(`${"." + imgSelect + 4}`).draggable({
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

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-4",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 5}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-5", resizeWebcam })
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
interact(`${"." + imgSelect + 5}`).draggable({
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
    move: dragMoveListener5,

    // call this function on every dragend event
  },
});
function dragMoveListener5(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-5",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 6}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-6", resizeWebcam })
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
interact(`${"." + imgSelect + 6}`).draggable({
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
    move: dragMoveListener6,

    // call this function on every dragend event
  },
});
function dragMoveListener6(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-6",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 7}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-7", resizeWebcam })
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
interact(`${"." + imgSelect + 7}`).draggable({
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
    move: dragMoveListener7,

    // call this function on every dragend event
  },
});
function dragMoveListener7(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-7",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 8}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-8", resizeWebcam })
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
interact(`${"." + imgSelect + 8}`).draggable({
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
    move: dragMoveListener8,

    // call this function on every dragend event
  },
});
function dragMoveListener8(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-8",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 9}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-9", resizeWebcam })
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
interact(`${"." + imgSelect + 9}`).draggable({
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
    move: dragMoveListener9,

    // call this function on every dragend event
  },
});
function dragMoveListener9(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-9",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 10}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-10", resizeWebcam })
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
interact(`${"." + imgSelect + 10}`).draggable({
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
    move: dragMoveListener10,

    // call this function on every dragend event
  },
});
function dragMoveListener10(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-10",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 11}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-11", resizeWebcam })
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
interact(`${"." + imgSelect + 11}`).draggable({
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
    move: dragMoveListener11,

    // call this function on every dragend event
  },
});
function dragMoveListener11(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-11",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 12}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-12", resizeWebcam })
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
interact(`${"." + imgSelect + 12}`).draggable({
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
    move: dragMoveListener12,

    // call this function on every dragend event
  },
});
function dragMoveListener12(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-12",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
// this function is used later in the resizing and gesture demos

interact(`${"." + imgSelect + 13}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-13", resizeWebcam })
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
interact(`${"." + imgSelect + 13}`).draggable({
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
    move: dragMoveListener13,

    // call this function on every dragend event
  },
});
function dragMoveListener13(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-13",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 14}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-14", resizeWebcam })
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
interact(`${"." + imgSelect + 14}`).draggable({
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
    move: dragMoveListener14,

    // call this function on every dragend event
  },
});
function dragMoveListener14(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-14",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

interact(`${"." + imgSelect + 15}`).resizable({
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
          JSON.stringify({ type: "resize-img-participant-15", resizeWebcam })
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
interact(`${"." + imgSelect + 15}`).draggable({
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
    move: dragMoveListener15,

    // call this function on every dragend event
  },
});
function dragMoveListener15(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  const movingWebcam = {
    x: x,
    y: y,
  };

  console.log(movingWebcam);
  if (mode === "toolP") {
    meeting.sendChatMessage(
      JSON.stringify({
        type: "moving-img-participant-15",
        movingWebcam,
      })
    );
  }

  // translate the element

  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
// this function is used later in the resizing and gesture demos

// this function is used later in the resizing and gesture demos

console.log("beforeMore");
