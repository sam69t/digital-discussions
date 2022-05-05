// http://127.0.0.1:5500/public/room.html?mode=player

const previewContainer = document.querySelector(".previewContainer");

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
// const meeting = params.get("meetingID");
// console.log(meeting);

if (mode === "player") {
  const container = document.querySelector(".playerMode");
  container.classList.remove("hidden");

  const player = new Player({
    parent: previewContainer,
    csvSrc:
      "./assets/chats/892k-qt49-fjeh-627431aee4a43b0446ecc2a1-625280f2a457cf8bc28d7648.csv",
    leftVideoSrc: "./assets/videos/627431b89572afb6903c101b.mp4",
    rightVideoSrc: "",
  });

  player.on("loaded", (messages) => {
    init();
  });

  player.setupSlider({
    sliderContainer: document.querySelector(".slider-container"),
  });

  player.on("chat-message", (data) => {
    // console.log(data.message.type.message);
    if (data.message.type == "moving-webcam") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");
      // console.log(data.message.movingWebcam);

      $webcam.css("left", data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
  });

  player.on("revert-chat-message", (data) => {
    console.log(data.message.type + "revert");
    if (data.message.type == "moving-webcam") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("left", data.message.movingWebcam.x);
      $webcam.css("top", data.message.movingWebcam.y);
    }
    if (data.message.type == "resize-webcam") {
      // console.log(data.message.movingWebcam);
      var $webcam = $(".videoWrapper-one");

      $webcam.css("width", data.message.resizeWebcam.w);
      $webcam.css("height", data.message.resizeWebcam.h);
    }
    if (data.message.type == "ontap-chat") {
      // console.log(data.message.message);
      CHAT.addTextToLastMsg(data.message.message);
    }
  });
} else if (mode === "tool") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");

  init();
}

function init() {
  console.log("lol");
}
