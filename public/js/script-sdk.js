const API_SERVER_URL = `${window.location.origin}`;
// var socket = io();
// socket = io.connect(`${window.location.origin}`);
// Declaring variables
let playGround = document.querySelector(".playGround");
let micButton = document.getElementById("mic-btn");
let camButton = document.getElementById("cam-btn");
let ssButton = document.getElementById("ss-btn");
let screenShare = document.getElementById("screenShare");
let raiseHand = document.getElementById("raiseHand-btn");
let sendMessageBtn = document.getElementById("sendMessage-btn");
let participants = document.getElementById("participants");
let leaveMeetingBtn = document.getElementById("leaveMeeting-btn");
let endMeetingBtn = document.getElementById("endMeeting-btn");

//Video Elements
let startVideoBtn = document.getElementById("startVideo-btn");
let stopVideoBtn = document.getElementById("stopVideo-btn");
let resumeVideoBtn = document.getElementById("resumeVideo-btn");
let pauseVideoBtn = document.getElementById("pauseVideo-btn");
let seekVideoBtn = document.getElementById("seekVideo-btn");

//recording
let startRecordingBtn = document.getElementById("startRecording-btn");
let stopRecordingBtn = document.getElementById("stopRecording-btn");

//videoPlayback DIV
let videoPlayback = document.getElementById("videoPlayback");

let meeting;
// Local participants
let localParticipant;
let localParticipantAudio;

// let chatData = [];

///////// join page

let joinPageWebcam = document.getElementById("joinCam");

navigator.mediaDevices
  .getUserMedia({
    video: true,
    // audio: true,
  })
  .then((stream) => {
    joinPageWebcam.srcObject = stream;
    joinPageWebcam.play();
  });

////////// rest of the code

function addParticipantToList({ id, displayName }) {
  let participantTemplate = `
      <div id="p-${id}">
          <span>${displayName}<span>
      </div>
    `;
  // participants.insertAdjacentHTML("beforeend", participantTemplate);
}

function createLocalParticipant() {
  localParticipant = createVideoElement(meeting.localParticipant.id);
  localParticipantAudio = createAudioElement(meeting.localParticipant.id);
  playGround.appendChild(localParticipant);
}

function startMeeting(token, meetingId, name) {
  // Meeting config
  window.ZujoSDK.config(token);

  // Meeting Init
  meeting = window.ZujoSDK.initMeeting({
    meetingId: meetingId, // required
    name: name, // required
    micEnabled: true, // optional, default: true
    webcamEnabled: true, // optional, default: true
    maxResolution: "hd", // optional, default: "hd"
    whiteboardEnabled: true,
    permissions: {
      // ...
      drawOnWhiteboard: true,
      toggleWhiteboard: true,
    },
  });

  // Meeting Join
  meeting.join();
  // meeting.setWebcamQuality("high");

  //create Local Participant
  createLocalParticipant();

  //add yourself in participant list
  addParticipantToList({
    id: meeting.localParticipant.id,
    displayName: "You",
  });

  // Setting local participant stream
  meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(
      stream,
      localParticipant,
      localParticipantAudio,
      meeting.localParticipant.id
    );
  });

  // Other participants
  meeting.on("participant-joined", (participant) => {
    let videoElement = createVideoElement(participant.id);
    let audioElement = createAudioElement(participant.id);

    participant.on("stream-enabled", (stream) => {
      setTrack(stream, videoElement, audioElement, participant.id);
    });

    const bool = true;
    meeting.sendChatMessage(JSON.stringify({ type: "flex", bool }));

    participant.setQuality("high");
    console.log(
      participant.length,
      meeting.localParticipant.id,
      participant.id
    );
    // console.log("row");

    playGround.appendChild(videoElement);
    playGround.appendChild(audioElement);
    addParticipantToList(participant);
  });

  // participants left
  meeting.on("participant-left", (participant) => {
    let vElement = document.getElementById(`v-${participant.id}`);
    vElement.parentNode.removeChild(vElement);

    let aElement = document.getElementById(`a-${participant.id}`);
    aElement.parentNode.removeChild(aElement);
    //remove it from participant list participantId;
    document.getElementById(`p-${participant.id}`).remove();
  });
  //chat message event

  //video state changed
  meeting.on("video-state-changed", (videoEvent) => {
    const { status, link, currentTime } = videoEvent;

    switch (status) {
      case "started":
        videoPlayback.setAttribute("src", link);
        videoPlayback.play();
        break;
      case "stopped":
        console.log("stopped");
        videoPlayback.removeAttribute("src");
        videoPlayback.pause();
        videoPlayback.load();
        break;
      case "resumed":
        videoPlayback.play();
        break;
      case "paused":
        videoPlayback.currentTime = currentTime;
        videoPlayback.pause();
        break;

      case "seeked":
        break;

      default:
        break;
    }
  });
  //recording events
  meeting.on("recording-started", () => {
    console.log("RECORDING STARTED EVENT");
  });
  meeting.on("recording-stopped", () => {
    console.log("RECORDING STOPPED EVENT");
  });

  meeting.on("presenter-changed", (presenterId) => {
    if (presenterId) {
      ssButton.innerText = "Stop Sharing";
    } else {
      console.log(presenterId);
      screenShare.removeAttribute("src");
      screenShare.pause();
      screenShare.load();

      ssButton.innerText = "Share Entire Screen";
    }
  });

  meeting.on("meeting-left", () => {
    window.location.reload();
  });

  // //Entry Response
  // meeting.on("entry-requested", (requestEvent) => {
  //   console.log(requestEvent, "EVENT::entryRequested");
  // });

  // meeting.on("entry-responded", (respondEvent) => {
  //   console.log(respondEvent, "EVENT::entryResponded");
  // });
  //add DOM Events
  addDomEvents();
}

//get access token

// joinMeeting();

async function joinMeeting(newMeeting) {
  // let defaultMeeting = "qwrc-b9ho-7x3j";

  let name = document.getElementById("joinMeetingName").value || "JSSDK";
  let meetingId = document.getElementById("joinMeetingId").value;
  if (!meetingId && !newMeeting) {
    return alert("Please Provide a meetingId");
  }

  document.getElementById("joinPage").style.display = "none";

  //create New Token
  let token = await window
    .fetch(API_SERVER_URL + "/get-token")
    .then(async (response) => {
      const { token } = await response.json();
      return token;
    });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  };

  //validate meetingId;
  if (!newMeeting) {
    //validate meetingId if provided;
    meetingId = await fetch(
      API_SERVER_URL + "/validate-meeting/" + meetingId,
      options
    )
      .then(async (result) => {
        const { meetingId } = await result.json();
        console.log("meetingId", meetingId);
        return meetingId;
      })
      .catch(() => {
        alert("invalid Meeting Id");
        window.location.href = "/";
        return;
      });
  }

  //create New Meeting
  //get new meeting if new meeting requested;
  if (newMeeting) {
    meetingId = await fetch(API_SERVER_URL + "/create-meeting", options).then(
      async (result) => {
        const { meetingId } = await result.json();
        console.log(options);

        console.log("NEW MEETING meetingId", meetingId);
        return meetingId;
      }
    );
  }
  // meetingId = "test"
  console.log("MEETING_ID::", meetingId);
  //set meetingId
  document.querySelector("#meetingid").innerHTML = meetingId;
  startMeeting(token, meetingId, name);
  console.log(token, meetingId, name);
}

// creating video element
function createVideoElement(pId) {
  let videoElement = document.createElement("video");
  let allVideos = document.querySelectorAll("video");

  videoElement.classList.add("video-frame");
  if (allVideos.length === 2) {
    videoElement.classList.add("resize-drag");
  }

  console.log(allVideos);

  videoElement.setAttribute("id", pId);
  console.log("Webcacreated");

  // socket.emit("webcam_id", {
  //   id: ("id", `v-${pId}`),
  // });
  return videoElement;
}

// creating audio element
function createAudioElement(pId) {
  let audioElement = document.createElement("audio");
  audioElement.setAttribute("autoPlay", "false");
  audioElement.setAttribute("playsInline", "true");
  audioElement.setAttribute("controls", "false");
  audioElement.setAttribute("id", `a-${pId}`);
  return audioElement;
}

//setting up tracks
function setTrack(stream, videoElem, audioElement, id) {
  if (stream.kind == "video") {
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    videoElem.srcObject = mediaStream;
    videoElem
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
  }
  if (stream.kind == "audio") {
    if (id == meeting.localParticipant.id) return;
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    audioElement.srcObject = mediaStream;
    audioElement
      .play()
      .catch((error) => console.error("audioElem.play() failed", error));
  }
  if (stream.kind == "share") {
    console.log("SHARE EVENT ");
    const mediaStream = new MediaStream();
    mediaStream.addTrack(stream.track);
    screenShare.srcObject = mediaStream;
    screenShare
      .play()
      .catch((error) =>
        console.error("videoElem.current.play() failed", error)
      );
  }
}

//add button events once meeting is created
function addDomEvents() {
  // mic button event listener
  micButton.addEventListener("click", () => {
    if (micButton.innerText == "Unmute Mic") {
      meeting.unmuteMic();
      micButton.innerText = "Mute Mic";
    } else {
      meeting.muteMic();
      micButton.innerText = "Unmute Mic";
    }
  });

  // cam button event listener
  camButton.addEventListener("click", () => {
    if (camButton.innerText == "Hide Cam") {
      // meeting.disableWebcam();
      $(".video-frame").addClass("blur");
      camButton.innerText = "Enable Cam";
      console.log("hide");
    } else {
      // meeting.enableWebcam();
      $(".video-frame").removeClass("blur");

      camButton.innerText = "Hide Cam";
      console.log("show");
    }
  });

  // screen share button event listener
  // ssButton.addEventListener("click", async () => {
  //   if (ssButton.innerText == "Share Entire Screen") {
  //     // let source = await showSources();
  //     meeting.enableScreenShare();
  //     // ssButton.innerText = "Stop Sharing";
  //   } else {
  //     meeting.disableScreenShare();
  //     // ssButton.innerText = "Share Entire Screen";
  //   }
  // });

  //raiseHand button
  // raiseHand.addEventListener("click", async () => {
  //   meeting.sendChatMessage(JSON.stringify({ type: "raiseHand" }));
  // });

  meeting.on("chat-message", (chatEvent) => {
    const { senderId, text, timestamp, senderName } = chatEvent;
    const parsedText = JSON.parse(text);
    let chatData = [];
    // console.log(parsedText, senderId, senderName);
    if (
      parsedText?.type == "raiseHand" &&
      senderId != meeting.localParticipant.id //remove this for both parties
    ) {
      console.log(chatEvent.senderName + " RAISED HAND");
    }
    if (parsedText?.type == "chatMessageCreated") {
      //! CHAT MESSAGE
      chatData.push(parsedText.message);
      console.log(chatData);
      // const chatBox = document.getElementById("chats");
      // const chatTemplate = `
      // <div style="margin-bottom: 10px; ${
      //   meeting.localParticipant.id == senderId && "text-align : center"
      // }">
      //   <span style="font-size:12px; text-align:center;">${senderName}</span>
      //   <div style="margin-top:5px">
      //     <span style="background:${
      //       meeting.localParticipant.id == senderId ? "white" : "black"
      //     }; color:${
      //   meeting.localParticipant.id == senderId ? "black" : "white"
      // };padding:5px;border-radius:8px; font-size:120px">${
      //   parsedText.message
      // }<span>
      //   </div>
      // </div>
      // `;
      // chatBox.insertAdjacentHTML("beforeend", chatTemplate);
    }
    if (
      //! MOUSE ACTIVITY
      parsedText?.type == "mouse-move" &&
      senderId != meeting.localParticipant.id
    ) {
      console.log("mouse-move", parsedText.mouseActivity.x, senderId);
      // console.log(pId);

      if ($('.pointer[id="' + meeting.localParticipant.id + '"]').length <= 0) {
        $("body").append(
          '<div class="pointer" id="' + meeting.localParticipant.id + '"></div>'
        );
      }

      var $pointer = $('.pointer[id= "' + meeting.localParticipant.id + '"]');
      $pointer.css("left", parsedText.mouseActivity.x);
      $pointer.css("top", parsedText.mouseActivity.y);
    }
    if (
      //! WEBCAM SIZE
      parsedText?.type == "resize-webcam" &&
      senderId != meeting.localParticipant.id
    ) {
      console.log(parsedText.resizeWebcam.w, parsedText.resizeWebcam.h);

      if (senderId != meeting.localParticipant.id) {
        var $webcam = $(".video-frame:last");

        $webcam.css("width", parsedText.resizeWebcam.w);
        $webcam.css("height", parsedText.resizeWebcam.h);
      }
    }
    if (
      //! ON TAP CHAT
      parsedText?.type == "ontap-chat"
    ) {
      console.log(parsedText.message);
      chatData = parsedText.message;
      console.log(chatData);
      const chatBox = document.getElementById("chats");
      const chatTemplate = `
      <div style="margin-bottom: 10px; ${
        meeting.localParticipant.id == senderId && "text-align : center"
      }">
        <span style="font-size:12px; text-align:center;">${senderName}</span>
        <div style="margin-top:5px">
          <span style="background:${
            meeting.localParticipant.id == senderId ? "white" : "black"
          }; color:${
        meeting.localParticipant.id == senderId ? "black" : "white"
      };padding:5px;border-radius:8px; font-size:120px">${
        parsedText.message
      }<span>
        </div>
      </div>
      `;
      chatBox.insertAdjacentHTML("beforeend", chatTemplate);
    }
    if (
      //! WEBCAM MOVEMENT
      parsedText?.type == "moving-webcam" &&
      senderId != meeting.localParticipant.id
    ) {
      console.log(parsedText.movingWebcam.x, parsedText.movingWebcam.x);
      // var $webcam = $('.video-frame[id= "' + pId + '"]');
      if (senderId != meeting.localParticipant.id) {
        $("#videoContainer").css("flex-direction", "row-reverse");
        console.log("rows");
        var $webcam = $(".video-frame:last");
        $webcam.css("left", parsedText.movingWebcam.x);
        $webcam.css("top", parsedText.movingWebcam.y);
      }

      // console.log($webcam);
      // $webcam.css("background-color", "blue");
    }
    if (
      //! WEBCAM MOVEMENT
      parsedText?.type == "flex"
    ) {
      // console.log("lol");

      console.log(parsedText.bool);

      // var $webcam = $('.video-frame[id= "' + pId + '"]');
      if (meeting.localParticipant.id) {
        console.log("lol");
        console.log(parsedText.bool);

        // var $webcam = $(".video-frame:last");
        // $webcam.css("left", -parsedText.movingWebcam.x);
        // $webcam.css("top", -parsedText.movingWebcam.y);
      }

      // console.log($webcam);
      // $webcam.css("background-color", "blue");
    }
    if (
      //! IMG DISPLAY
      parsedText?.type == "image-url"
    ) {
      if (meeting.localParticipant.id != senderId) {
        console.log(parsedText.urlImage);
        let divImage = document.createElement("div");
        divImage.style.backgroundImage = `url(${parsedText.urlImage})`;
        divImage.classList.add("imageBlock");
        // divImage.classList.add("resize-drag");
        playGround.appendChild(divImage);
      }
    }
  });

  // //send chat message button

  //! ON TAP MESSAGE SENDER

  let inputUser = document.querySelector("#inputMessage");

  inputUser.addEventListener("input", function () {
    const message = inputUser.value;
    meeting.sendChatMessage(JSON.stringify({ type: "ontap-chat", message }));
    // console.log(message);
  });

  //! CHAT MESSAGE SAVER

  sendMessageBtn.addEventListener("click", async () => {
    const message = document.getElementById("inputMessage").value;
    meeting.sendChatMessage(
      JSON.stringify({ type: "chatMessageCreated", message })
    );
    console.log(message);
    document.getElementById("inputMessage").value = "";
  });

  //! MOUSE ACTIVITY SENDER

  $(document).on("mousemove", function (event) {
    const mouseActivity = {
      x: event.pageX,
      y: event.pageY,
    };
    meeting.sendChatMessage(
      JSON.stringify({ type: "mouse-move", mouseActivity })
    );
  });

  //! VIDEO DRAG & SIZE SENDER

  const position = { x: 0, y: 0 };
  console.log(`${window.location.origin}`);

  interact(".resize-drag")
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;

          // update the element's style
          target.style.width = event.rect.width + "px";
          target.style.height = event.rect.height + "px";

          // translate when resizing from top or left edges
          // x += event.deltaRect.left;
          // y += event.deltaRect.top;

          // target.style.transform = "translate(" + x + "px," + y + "px)";

          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
          // target.textContent =
          //   Math.round(event.rect.width) +
          //   "\u00D7" +
          //   Math.round(event.rect.height);

          // console.log(event.rect.width, event.rect.height);

          // socket.emit("webcam_size", {
          //   width: event.rect.width,
          //   height: event.rect.height,
          // });
          const resizeWebcam = {
            w: event.rect.width,
            h: event.rect.height,
          };

          meeting.sendChatMessage(
            JSON.stringify({ type: "resize-webcam", resizeWebcam })
          );
        },
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
          outer: "wrapper",
        }),

        // minimum size
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 },
        }),
      ],

      inertia: true,
    })
    .draggable({
      listeners: {
        start(event) {
          // console.log(event.type, event.target);
        },
        move(event) {
          const movingWebcam = {
            x: (position.x += event.dx),
            y: (position.y += event.dy),
          };

          meeting.sendChatMessage(
            JSON.stringify({ type: "moving-webcam", movingWebcam })
          );

          // socket.emit("webcam_move", {
          //   x: (position.x += event.dx),
          //   y: (position.y += event.dy),
          // });

          // console.log((position.x += event.dx), event.dy);
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      },
    });

  //! START RECORDING

  startRecordingBtn.addEventListener("click", async () => {
    meeting.startRecording();
  });

  //! STOP RECORDING

  stopRecordingBtn.addEventListener("click", async () => {
    meeting.stopRecording();
  });

  //leave Meeting Button
  // leaveMeetingBtn.addEventListener("click", async () => {
  //   // leavemeeting
  //   meeting.leave();
  //   //reload page
  //   window.location.reload();
  //   document.querySelector("#joinPage").style.display = "flex";
  // });

  //end meeting button
  // endMeetingBtn.addEventListener("click", async () => {
  //   //end meeting
  //   meeting.end();
  //   //reload page
  //   window.location.reload();
  // });
  //startVideo button events [playing VIDEO.MP4]
  // startVideoBtn.addEventListener("click", async () => {
  //   meeting.startVideo({ link: "/video.mp4" });
  // });

  // //end video playback
  // stopVideoBtn.addEventListener("click", async () => {
  //   meeting.stopVideo();
  // });
  //resume paused video
  // resumeVideoBtn.addEventListener("click", async () => {
  //   meeting.resumeVideo();
  // });
  // //pause playing video
  // pauseVideoBtn.addEventListener("click", async () => {
  //   meeting.pauseVideo({ currentTime: videoPlayback.currentTime });
  // });
  //seek playing video
  // seekVideoBtn.addEventListener("click", async () => {
  //   meeting.seekVideo({ currentTime: 40 });
  // });
  //startRecording
}
