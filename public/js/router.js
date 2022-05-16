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
    // console.log(data.message.type + "revert");
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

// console.log(elem === document.activeElement);
// if (elem === document.activeElement) {
//   console.log("Element has focus!");
//   elem.style.backgroundColor = "pink";
// } else {
//   console.log(`Element is not focused.`);
// }
