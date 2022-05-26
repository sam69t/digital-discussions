let inputImg = document.querySelector("#imgfiles");
let inputVid = document.querySelector("#vidfiles");

let folderPath = "HUGO_JAUFFET";

let imgSelect = "resize-ref";
let vidSelect = "resize-vid";

var imagekit = new ImageKit({
  publicKey: "public_F+y/bdBG9098fxlawOAt4+sv63Q=",
  urlEndpoint: "https://ik.imagekit.io/diploma/",
  authenticationEndpoint: "http://localhost:3000/auth",
});

inputImg.addEventListener("change", (event) => {
  imagekit.upload(
    {
      file: inputImg.files[0],
      fileName: "test_image.jpg",
      folder: `${"/" + folderPath + "/"}`,
      tags: ["reference"],
    },
    function (err, result) {
      if (err) {
        // statusEl.innerHTML = "Error uploading image. " + err.message;
        console.log(err);
      } else {
        // statusEl.innerHTML = "File Uploaded";
        var sampleTransformations = [{ HEIGHT: 300, WIDTH: 400 }];
        srcUrl = result.url;
        transformedURL = imagekit.url({
          src: srcUrl,
          transformation: sampleTransformations,
        });
        let srcImgUrl = srcUrl;

        imgNumber++;
        meeting.sendChatMessage(JSON.stringify({ type: "img-url", srcImgUrl }));

        // var img = document.querySelector("#orig_image > p > img");
        // img.setAttribute("src", srcUrl);
        // img.classList.add("resize-ref");
        let imageWrapper = document.createElement("div");
        let image = document.createElement("img");
        image.src = srcUrl;
        imageWrapper.classList.add("imageBlock");

        imageWrapper.classList.add("imageBlockwrapper");
        imageWrapper.classList.add(`${imgSelect + imgNumber}`);
        imageWrapper.classList.add("assets");

        // image.classList.add("resize-drag");
        imageWrapper.appendChild(image);
        previewContainer.appendChild(imageWrapper);
      }
    }
  );
});
inputVid.addEventListener("change", (event) => {
  imagekit.upload(
    {
      file: inputVid.files[0],
      fileName: inputVid.files[0].name || "test_image.jpg",
      folder: `${"/" + folderPath + "/"}`,
      tags: ["reference"],
    },
    function (err, result) {
      if (err) {
        // statusEl.innerHTML = "Error uploading image. " + err.message;
        console.log(err);
      } else {
        // statusEl.innerHTML = "File Uploaded";
        var sampleTransformations = [{ HEIGHT: 300, WIDTH: 400 }];
        srcUrl = result.url;
        transformedURL = imagekit.url({
          src: srcUrl,
          transformation: sampleTransformations,
        });

        let srcVidUrl = srcUrl;
        vidNumber++;

        meeting.sendChatMessage(JSON.stringify({ type: "vid-url", srcVidUrl }));

        const video = document.createElement("video");
        let videoWrapper = document.createElement("vid");
        videoWrapper.classList.add("video-testWrapper");
        videoWrapper.classList.add(`${vidSelect + vidNumber}`);
        video.classList.add("assets");

        // videoWrapper.classList.add("resize-ref");

        video.src = srcUrl;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.classList.add("vid-s");
        video.classList.add(`${vidSelect + vidNumber}`);

        previewContainer.appendChild(video);
        // previewContainer.appendChild(videoWrapper);
      }
    }
  );
});

// let choice_drop = true;

// let image_drop_area = document.querySelector(".drop-out");
// image_drop_area.addEventListener("dragover", (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   // Style the drag-and-drop as a "copy file" operation.
//   event.dataTransfer.dropEffect = "copy";
// });

// // Event listener for dropping the image inside the div
// image_drop_area.addEventListener("drop", (event) => {
//   event.stopPropagation();
//   event.preventDefault();
//   fileList = event.dataTransfer.files;

//   // document.querySelector("#file_name").textContent = fileList[0].name;

//   readImage(fileList[0]);
// });

// // Converts the image into a data URI
// readImage = (file) => {
//   const reader = new FileReader();
//   //   let number = document.getElementById("text-val").value;
//   if (choice_drop === true) {
//     reader.addEventListener("load", (event) => {
//       uploaded_image = event.target.result;

//       // $(".drop-title").css("display", "none");
//       // let imageBlock = document.createElement("div");
//       // imageBlock.classList.add("imageBlock");
//       // imageBlock.classList.add("resize-drag");

//       // document.querySelector(".playGround").appendChild(imageBlock);
//       // imageBlock.style.backgroundImage = `url(${uploaded_image})`;
//       console.log(fileList);

//
//       // const urlImage = uploaded_image;
//       // meeting.sendChatMessage(JSON.stringify({ type: "image-url", urlImage }));
//     });
//   }
//   reader.readAsDataURL(file);

// var $dropzone = document.querySelector(".drop-out");
// var input = document.querySelector(".drop-zone__input");

// $dropzone.ondragover = function (e) {
//   e.preventDefault();
//   this.classList.add("dragover");
// };
// $dropzone.ondragleave = function (e) {
//   e.preventDefault();
//   this.classList.remove("dragover");
// };
// $dropzone.ondrop = function (e) {
//   e.preventDefault();
//   this.classList.remove("dragover");
//   let file = e.dataTransfer.files[0];

//   console.log(e.dataTransfer.files[0]);
// imagekit.upload(
//   {
//     file: file.files[0],
//     fileName: file.files[0].name || "test_image.jpg",
//     tags: ["reference"],
//     // folder: "/TEST_NO_1",
//     //- extensions: [
//     //-         {
//     //-             name: "aws-auto-tagging",
//     //-             minConfidence: 80,
//     //-             maxTags: 10
//     //-         }
//     //-     ],
//   },
//   function (err, result) {
//     if (err) {
//       // statusEl.innerHTML = "Error uploading image. " + err.message;
//       console.log(err);
//     } else {
//       // statusEl.innerHTML = "File Uploaded";
//       var sampleTransformations = [{ HEIGHT: 300, WIDTH: 400 }];
//       srcUrl = result.url;
//       transformedURL = imagekit.url({
//         src: srcUrl,
//         transformation: sampleTransformations,
//       });

//       var orig_img = document.querySelector("#orig_image > p > img");
//       // var trans_img = document.querySelector("#trans_image > p > img");

//       orig_img.setAttribute("src", srcUrl);
//       // trans_img.setAttribute("src", transformedURL);

//       // var el = document.getElementById("images");
//       // el.setAttribute("style", "block");
//     }
//   }
// );

// };

// document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
//   const dropZoneElement = inputElement.closest(".drop-zone");

//   // dropZoneElement.addEventListener("click", (e) => {
//   //   inputElement.click();
//   // });

//   inputElement.addEventListener("change", (event) => {
//     if (inputElement.files.length) {
//       updateThumbnail(dropZoneElement, inputElement.files[0]);
//     }
//     console.log(event);
//   });

//   dropZoneElement.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     dropZoneElement.classList.add("drop-zone--over");
//   });

//   ["dragleave", "dragend"].forEach((type) => {
//     dropZoneElement.addEventListener(type, (e) => {
//       dropZoneElement.classList.remove("drop-zone--over");
//     });
//   });

//   dropZoneElement.addEventListener("drop", (e) => {
//     e.preventDefault();

//     // console.log(e);

//     if (e.dataTransfer.files.length) {
//       inputElement.files = e.dataTransfer.files;
//       updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
//     }

//     dropZoneElement.classList.remove("drop-zone--over");
//   });
// });

// /**
//  * Updates the thumbnail on a drop zone element.
// //  *
// //  * @param {HTMLElement} dropZoneElement
// //  * @param {File} file
// //  */
// function updateThumbnail(dropZoneElement, file) {
//   let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

//   // First time - remove the prompt
//   if (dropZoneElement.querySelector(".drop-zone__prompt")) {
//     dropZoneElement.querySelector(".drop-zone__prompt").remove();
//   }

//   // First time - there is no thumbnail element, so lets create it
//   if (!thumbnailElement) {
//   }

//   // thumbnailElement.dataset.label = file.name;

//   // Show thumbnail for image files
//   if (file.type.startsWith("image/")) {
//     const reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       thumbnailElement = document.createElement("div");
//       thumbnailElement.classList.add("drop-zone__thumb");
//       dropZoneElement.appendChild(thumbnailElement);
//       thumbnailElement.style.backgroundImage = `url('${reader.result}')`;

//       let file = reader.result;
//       console.log(file);
//     };
//   } else if (file.type.startsWith("video/")) {
//     const reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
//       console.log(reader.result);
//       const video = document.createElement("video");
//       video.src = reader.result;
//       video.classList.add("video-test");
//       document.body.appendChild(video);
//       video.autoplay = true;
//     };

//     console.log(file);
//   } else if (null) {
//     thumbnailElement.style.backgroundImage = null;
//   }
// }
