// interact(".resize-drag")
//   .resizable({
//     // resize from all edges and corners
//     edges: { left: true, right: true, bottom: true, top: true },

//     listeners: {
//       move(event) {
//         var target = event.target;
//         var x = parseFloat(target.getAttribute("data-x")) || 0;
//         var y = parseFloat(target.getAttribute("data-y")) || 0;

//         // update the element's style
//         target.style.width = event.rect.width + "px";
//         target.style.height = event.rect.height + "px";

//         target.setAttribute("data-x", x);
//         target.setAttribute("data-y", y);

//         const resizeWebcam = {
//           w: event.rect.width,
//           h: event.rect.height,
//         };

//         meeting.sendChatMessage(
//           JSON.stringify({ type: "resize-webcam", resizeWebcam })
//         );
//       },
//     },
//     modifiers: [
//       // keep the edges inside the parent
//       interact.modifiers.restrictEdges({
//         outer: "wrapper",
//       }),

//       // minimum size
//       interact.modifiers.restrictSize({
//         min: { width: 100, height: 50 },
//       }),
//     ],

//     inertia: true,
//   })
//   .draggable({
//     listeners: {
//       start(event) {
//         // console.log(event.type, event.target);
//       },
//       move(event) {
//         const movingWebcam = {
//           x: (position.x += event.dx),
//           y: (position.y += event.dy),
//         };

//         meeting.sendChatMessage(
//           JSON.stringify({ type: "moving-webcam", movingWebcam })
//         );
//         position.x += event.dx;
//         position.y += event.dy;

//         event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
//       },
//     },
//   });
