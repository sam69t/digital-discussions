let colorPicker = document.querySelector("#colorPicker");

colorPicker.addEventListener("change", async () => {
  console.log(colorPicker.value);

  let dataColor = colorPicker.value;
  previewContainer.style.backgroundColor = colorPicker.value;

  meeting.sendChatMessage(JSON.stringify({ type: "couleur-fond", dataColor }));
});
