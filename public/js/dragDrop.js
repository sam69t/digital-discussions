let inputImg = document.querySelector("#imgfiles");
let inputVid = document.querySelector("#vidfiles");

let folderPath = "HUGO_JAUFFET_2";

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
