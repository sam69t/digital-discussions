// http://127.0.0.1:5500/public/room.html?mode=player

const previewContainer = document.querySelector(".previewContainer");

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const animator = new Animator();

let imgCounter = 0;
let vidCounter = 0;

// const meeting = params.get("meetingID");
// console.log(meeting);

if (mode === "player") {
  const container = document.querySelector(".playerMode");
  container.classList.remove("hidden");

  const player = new Player({
    parent: previewContainer,
    csvSrc:
      "./assets/chats/6j1x-8g2h-9ioc-6287c265d1c03acfe7ef18d6-625280f2a457cf8bc28d7648.csv",
    leftVideoSrc: "./assets/videos/6287c296f5cc40fcdf9c8fa0.mp4",
    rightVideoSrc: "",
  });

  animator.on("frame", () => {
    player.update();
  });

  player.on("loaded", (messages) => {
    // init();
  });

  player.setupSlider({
    sliderContainer: document.querySelector(".slider-container"),
  });

  player.on("chat-message", (data) => {
    // console.log(data.message);
    // console.log(data.message.type.message);
    if (data.message.type == "moving-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");
      // console.log(data.message.movingWebcam);

      $webcam.css("left", data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
    if (data.message.type == "img-url") {
      imgCounter++;
      // console.log(data.message.message);
      let imageWrap = document.createElement("div");
      let cross = document.createElement("div");
      let crossBar = document.createElement("div");

      imageWrap.classList.add(`${"imageBlock" + imgCounter}`);
      imageWrap.classList.add(`${"imageStyle"}`);
      cross.classList.add("cross");
      crossBar.classList.add("crossBar");

      let image = document.createElement("img");
      image.src = data.message.srcImgUrl;

      cross.appendChild(crossBar);
      imageWrap.appendChild(image);
      imageWrap.appendChild(cross);

      previewContainer.appendChild(imageWrap);

      imageBehavior();
    }
    if (data.message.type == "vid-url") {
      vidCounter++;
      const video = document.createElement("video");
      video.src = data.message.srcVidUrl;
      video.classList.add(`${"video-test" + vidCounter}`);
      video.classList.add("vid-s");
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      previewContainer.appendChild(video);
    }

    if (data.message.type == "moving-img-participant") {
      var $webcam = $(".imageBlock1");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-img-participant-2") {
      var $webcam = $(".imageBlock2");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "resize-img-participant") {
      var $webcam = $(".imageBlock1");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-img-participant-2") {
      var $webcam = $(".imageBlock2");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "moving-vid-participant") {
      var $webcam = $(".video-test1");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "moving-vid-participant-2") {
      var $webcam = $(".video-test2");
      $webcam.css(
        "-webkit-transform",
        "translate(" +
          data.message.movingWebcam.x +
          "px," +
          data.message.movingWebcam.y +
          "px )"
      );
    }
    if (data.message.type == "resize-vid-participant") {
      var $webcam = $(".video-test1");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "resize-vid-participant-2") {
      var $webcam = $(".video-test2");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
  });

  player.on("revert-chat-message", (data) => {
    // console.log(data.message.type + "revert");
    if (data.message.type == "moving-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("left", data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam-participant") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
    if (data.message.type == "img-url") {
      previewContainer.removeChild(previewContainer.lastChild);
      imgCounter = 0;

      if (data.message.type == "moving-img-participant") {
        var $webcam = $(".imageBlock1");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
      if (data.message.type == "moving-img-participant-2") {
        var $webcam = $(".imageBlock2");
        $webcam.css(
          "-webkit-transform",
          "translate(" +
            data.message.movingWebcam.x +
            "px," +
            data.message.movingWebcam.y +
            "px )"
        );
      }
    }
  });
} else if (mode === "toolH") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  const JoinMeeting = document.querySelector("#meetingJoinButton");
  JoinMeeting.style.display = "none";
  const idMeet = document.querySelector(".id-meet");
  idMeet.style.display = "none";
} else if (mode === "toolP") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  const createMeeting = document.querySelector("#meetingCreateButton");
  createMeeting.style.display = "none";
} else if (mode === "public") {
  console.log("public");
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
  // const JoinMeeting = document.querySelector("#joinPage");
  // JoinMeeting.style.display = "none";
  const createMeeting = document.querySelector("#meetingCreateButton");
  createMeeting.style.display = "none";
  const joinVid = document.querySelector(".joinvid-wrap");
  joinVid.style.display = "none";
  const firstInput = document.querySelector(".first-input");
  const joinTitle = document.querySelector(".join-title");
  joinTitle.textContent = "Rejoindre un live";
  joinTitle.style.marginTop = "5em";
}

const surfooter = document.querySelector(".sur-footer");
const surfooterPublic = document.querySelector("#public-sur-footer");

function showButton() {
  surfooter.style.opacity = "1";
  surfooterPublic.style.opacity = "1";
}
function hideButton() {
  surfooter.style.opacity = "0";
  surfooterPublic.style.opacity = "0";
}

animator.start();

function zoomIn() {
  previewContainer.style.transform = "scale(2)";
}
function zoomOut() {
  previewContainer.style.transform = "scale(.4)";
}
function zoomBack() {
  previewContainer.style.transform = "scale(1)";
}

// console.log(elem === document.activeElement);
// if (elem === document.activeElement) {
//   console.log("Element has focus!");
//   elem.style.backgroundColor = "pink";
// } else {
//   console.log(`Element is not focused.`);
// }
