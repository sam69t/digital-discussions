let colorPicker = document.querySelector("#colorPicker");

let presentationButton = document.querySelector(".presentation");
let FinpresentationButton = document.querySelector(".fin-presentation");

let projetButton = document.querySelector(".projet");
let refButton = document.querySelector(".reference");
let endingButton = document.querySelector(".endBtn");

presentationButton.addEventListener("click", async () => {
  console.log("shotPresentation");
  let dataColor = "FFC888";
  meeting.sendChatMessage(
    JSON.stringify({ type: "launch-presentation", dataColor })
  );
});
FinpresentationButton.addEventListener("click", async () => {
  console.log("shotProjet");
  let dataColor = "";

  meeting.sendChatMessage(JSON.stringify({ type: "launch-projet", dataColor }));
});

endingButton.addEventListener("click", async () => {
  console.log("shotRef");
  let dataColor = "D6E3FF";

  meeting.sendChatMessage(JSON.stringify({ type: "end", dataColor }));
});

colorPicker.addEventListener("change", async () => {
  console.log(colorPicker.value);

  let dataColor = colorPicker.value;
  // previewContainer.style.backgroundColor = colorPicker.value;

  meeting.sendChatMessage(JSON.stringify({ type: "couleur-fond", dataColor }));
});
