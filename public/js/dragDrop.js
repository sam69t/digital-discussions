let choice_drop = true;

let image_drop_area = document.querySelector(".playGround");
image_drop_area.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  // Style the drag-and-drop as a "copy file" operation.
  event.dataTransfer.dropEffect = "copy";
});

// Event listener for dropping the image inside the div
image_drop_area.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  fileList = event.dataTransfer.files;

  // document.querySelector("#file_name").textContent = fileList[0].name;

  readImage(fileList[0]);
});

// Converts the image into a data URI
readImage = (file) => {
  const reader = new FileReader();
  //   let number = document.getElementById("text-val").value;
  if (choice_drop === true) {
    reader.addEventListener("load", (event) => {
      uploaded_image = event.target.result;

      $(".drop-title").css("display", "none");
      let imageBlock = document.createElement("div");
      imageBlock.classList.add("imageBlock");
      imageBlock.classList.add("resize-drag");

      document.querySelector(".playGround").appendChild(imageBlock);
      imageBlock.style.backgroundImage = `url(${uploaded_image})`;

      const urlImage = uploaded_image;
      meeting.sendChatMessage(JSON.stringify({ type: "image-url", urlImage }));
    });
  }
  reader.readAsDataURL(file);
};
