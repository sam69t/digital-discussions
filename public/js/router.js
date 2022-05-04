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
      "./assets/chats/m58r-utz1-8y5o-62722abde4a43b0446ec914c-625280f2a457cf8bc28d7648.csv",
    leftVideoSrc: "./assets/videos/62722ad69572afb6903bf83b.mp4",
    rightVideoSrc: "./assets/videos/62722ad69572afb6903bf83b.mp4",
  });

  player.on("loaded", (messages) => {
    init();
  });

  player.setupSlider({
    sliderContainer: document.querySelector(".slider-container"),
  });

  player.on("chat-message", (data) => {
    console.log(data.message.type);
  });

  player.on("revert-chat-message", (data) => {
    console.log("revert", data.message.type);
  });
} else if (mode === "tool") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");

  init();
}

function init() {}
