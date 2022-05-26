let colorPicker = document.querySelector("#colorPicker");

let presentationButton = document.querySelector(".presentation");
let projetButton = document.querySelector(".projet");
let refButton = document.querySelector(".reference");

presentationButton.addEventListener("click", async () => {
  console.log("shotPresentation");
  let dataColor = "FFC888";
  meeting.sendChatMessage(
    JSON.stringify({ type: "launch-presentation", dataColor })
  );
});
projetButton.addEventListener("click", async () => {
  console.log("shotProjet");
  let dataColor = "FBFFC9";

  meeting.sendChatMessage(JSON.stringify({ type: "launch-projet", dataColor }));
});

refButton.addEventListener("click", async () => {
  console.log("shotRef");
  let dataColor = "D6E3FF";

  meeting.sendChatMessage(JSON.stringify({ type: "launch-ref", dataColor }));
});

// colorPicker.addEventListener("change", async () => {
//   console.log(colorPicker.value);

//   let dataColor = "D6E3FF";
//   previewContainer.style.backgroundColor = colorPicker.value;

//   meeting.sendChatMessage(JSON.stringify({ type: "couleur-fond", dataColor }));
// });
