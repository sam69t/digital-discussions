// http://127.0.0.1:5500/public/room.html?mode=player

const previewContainer = document.querySelector(".previewContainer");

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
// const meeting = params.get("meetingID");
// console.log(meeting);

if (mode === "player") {
  Papa.parse(
    "./assets/chats/m58r-utz1-8y5o-62722abde4a43b0446ec914c-625280f2a457cf8bc28d7648.csv",
    {
      download: true,
      delimiter: "	",
      header: true,
      complete: function (results) {
        results.data.forEach((element) => {
          if (!element.message) return;

          element.message = JSON.parse(element.message);
        });

        const firstTimestamp = new Date("2022-04-28T09:48:48.469Z");

        console.log(firstTimestamp.getTime());

        initPlayer({
          messages: results.data,
          startStamp: 0, // in millis
        });

        //   const message = results.data[0].message;
        //   console.log(JSON.parse(message));
      },
    }
  );
} else if (mode === "tool") {
  const container = document.querySelector(".toolMode");
  container.classList.remove("hidden");
}

function initPlayer({ messages, startStamp }) {
  VIDEOCONTROL.videoInit();
  VIDEOCONTROL.videoPlayerControls();

  function draw() {
    const videoPlayer = document.querySelector(".redif-vid");
    var lastTime = 0;
    var messageIndex = 0;
    var time = videoPlayer.currentTime;
    // console.log(videoPlayer.currentTime);
    if (time !== lastTime) {
      // console.log("time: " + time);
      //todo: do your rendering here

      lastTime = time;
    }

    const nextMessage = messages[messageIndex];

    if (nextMessage) {
      const messageTime = new Date(nextMessage.timestamp).getTime();

      if (messageTime <= time + startStamp) {
        console.log(messageTime);

        if (message.type === "mouse-move") {
          // PlayerTool.moveCursor({x: 0, y:0})
        }
        // PlayerTool.addChat
        // PlayerTool.

        // Player.createVideo({id})
        // Player.moveVideo(id, {x: 0, y: 0})
      }
      messageIndex++;
    }

    //wait approximately 16ms and run again
    requestAnimationFrame(draw);
  }

  draw();
}
