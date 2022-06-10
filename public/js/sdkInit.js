const API_SERVER_URL = `${window.location.origin}`;
const MEETING_ID = "6j1x-8g2h-9ioc";

let localUser = false;
let participantUser = false;

let participantNumber = 1;
let userNotReadyYet = false;

const offSetParticipant = 1050;

let chatContainer = document.querySelector("#chats");

let nav = document.querySelector(".nav");

let startButton = document.querySelector(".startButton");
let startOtherButton = document.querySelector(".startOtherButton");
let startButtonWrapper = document.querySelector(".startButtonWrapper");
let toolControllerP = document.querySelector(".tool-control-P");
let toolControllerH = document.querySelector(".tool-control-H");
let publicTool = document.querySelector(".tool-public");

let chapterCrontrols = document.querySelector(".chapters-controls");
let endButton = document.querySelector(".end-button");

let chapterCrontrolsParticipant = document.querySelector(
  ".chapters-controls-participant"
);

let mainCarousel = document.querySelector("#my-keen-slider");
let navCarousel = document.querySelector("#thumbnails");

let camMicControls = document.querySelector(".cam-mic-controls");
let colorControls = document.querySelector(".color-controls");
let gridLiveContainer = document.querySelector(".player-actions");
let overViewButtonBottom = document.querySelector(".player-actions-bottom");

let publicButton = document.querySelector(".public-add");
let firstR = document.querySelector(".first-range");

let firstRange = document.querySelector(".first-range-public");
let publicAssetsWrapperTopFirst = document.querySelector(
  ".public-assets-topFirst"
);
let publicAssetsWrapperTopLast = document.querySelector(
  ".public-assets-topLast"
);
let publicAssetsWrapperBottom = document.querySelector(".public-assets-bottom");
let publicAssetsWrapperLeft = document.querySelector(".public-assets-left");
let publicAssetsWrapperRight = document.querySelector(".public-assets-right");

let sumAssets = document.querySelector(".sum-assets");

// let previewContainer = document.querySelector(".previewContainer");
let fond = document.querySelector(".chat-wrapper");

let videoContainerOne = document.querySelector(".videoWrapper-one");
let videoContainerTwo = document.querySelector(".videoWrapper-two");
let inputUser = document.querySelector("#inputMessage");
let inputPublic = document.querySelector("#inputPublic");

let playGround = document.querySelector(".playGround");
let micButton = document.getElementById("mic-btn");
let camButton = document.querySelector(".cam-btn");
let ssButton = document.getElementById("ss-btn");
let screenShare = document.getElementById("screenShare");
let raiseHand = document.getElementById("raiseHand-btn");
let sendMessageBtn = document.getElementById("sendMessage-btn");
let publicSendMessageBtn = document.getElementById("publicSendMessage-btn");

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
let meeting; // Local participants
let localParticipant;
let localParticipantAudio;
let participant;

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
  if (mode === "toolH") {
    localParticipant = createVideoElement(meeting.localParticipant.id);
    localParticipantAudio = createAudioElement(meeting.localParticipant.id);
    videoContainerOne.appendChild(localParticipant);
    meeting.localParticipant.quality = "high";
  }
  if (mode === "toolP") {
    localParticipant = createVideoElement(meeting.localParticipant.id);
    localParticipantAudio = createAudioElement(meeting.localParticipant.id);
    videoContainerTwo.appendChild(localParticipant);

    // localParticipant = createVideoElement(meeting.localParticipant.id);
    // localParticipantAudio = createAudioElement(meeting.localParticipant.id);
    // previewContainer.appendChild(localParticipant);
    // meeting.localParticipant.quality = "high";
  }
}

function startMeeting(token, meetingId, name) {
  // Meeting config
  window.ZujoSDK.config(token);

  gridLiveContainer.style.display = "none";
  overViewButtonBottom.style.display = "none";
  sumAssets.style.display = "none";
  nav.style.display = "none";

  // Meeting Init
  meeting = window.ZujoSDK.initMeeting({
    meetingId: meetingId, // required
    name: name, // required
    micEnabled: true, // optional, default: true
    webcamEnabled: true, // optional, default: true
    maxResolution: "hd", // optional, default: "hd"
  });
  //? Meeting Join
  meeting.join();
  // meeting.setWebcamQuality("high");

  //? create Local Participant
  createLocalParticipant();
  if (mode === "toolP") {
    startButton.style.setProperty("visibility", "hidden", "important");
  }
  if (mode === "public") {
    startButton.style.setProperty("visibility", "hidden", "important");
    nav.style.display = "none";
    publicTool.style.setProperty("display", "block", "important");
    playGround.style.setProperty("display", "none", "important");
    colorControls.style.setProperty("display", "flex", "important");
  }
  //add yourself in participant list
  addParticipantToList({
    id: meeting.localParticipant.id,
    displayName: "You",
  });

  //?  Setting local participant stream
  meeting.localParticipant.on("stream-enabled", (stream) => {
    setTrack(
      stream,
      localParticipant,
      localParticipantAudio,
      meeting.localParticipant.id
    );
  });

  //?  Other participants
  meeting.on("participant-joined", (participant) => {
    participantNumber++;
    console.log(participantNumber);
    if (participantNumber >= 0 && participantNumber <= 2) {
      let videoElement = createVideoElement(participant.id);
      let audioElement = createAudioElement(participant.id);

      participant.on("stream-enabled", (stream) => {
        setTrack(stream, videoElement, audioElement, participant.id);
      });

      participant.setQuality("high");

      // if (participant.id) {
      //   participant.pin("CAM");
      // }

      if (mode === "toolH") {
        console.log(participant.id);
        participant.pin("CAM");
        // $(".videoWrapper-two").css("right", "0");
        // $(".videoWrapper-two").css("transform", "translateX(390%)");
        $(".videoWrapper-two").css("left", `${offSetParticipant}`);
        $(".videoWrapper-two").css("left", "calc(50% - 20vh");

        videoContainerTwo.appendChild(videoElement);
        videoContainerTwo.appendChild(audioElement);
      }

      if (mode === "toolP") {
        console.log(participant.id);
        participant.unpin("CAM");
        videoContainerTwo.style.left = "calc(50% - 20vh)";

        // $(".videos-container").css("flex-direction", "row-reverse");
        // $(".videoWrapper-two").css("transform", "translateX(-390%)");
        // $(".videoWrapper-two").css("right", "0");
        $(".videoWrapper-two").css("transform", "translateX(0%)");
        // $(".videoWrapper-one").css(
        //   "transform",
        //   `translateX(${offSetParticipant}px)`
        // );
        $(".videoWrapper-one").css("left", "calc(50% - 20vh");
        videoContainerOne.appendChild(videoElement);
        videoContainerOne.appendChild(audioElement);

        // $(".videoWrapper-one").css("transform",`translateX(1250px)`
        // );

        // $(".videoWrapper-one").css("transform", "translateX(390%)");
        // $(".videoWrapper-one").css("right", "0");
      }
      if (mode === "public") {
        console.log(participant.id);
        participant.unpin("CAM");

        // $(".videoWrapper-two").css("transform", "translateX(0%)");
        $(".videoWrapper-one").css("right", "0");
        // $(".videoWrapper-one").css(
        //   "transform",
        //   `translateX(${offSetParticipant}px)`
        // ); // videoContainerOne.classList.add("resize-drag");
        $(".videoWrapper-one").removeClass("resize-drag");
      }

      console.log("PARTICIPANT-JOINED");

      addParticipantToList(participant);
    } else if (participantNumber <= 3) {
      if (mode === "public") {
        console.log("je suis le dernier arrivant");
        let PublicVideoElement = createVideoElement(participant.id);
        let PublicAudioElement = createAudioElement(participant.id);
        participant.on("stream-enabled", (stream) => {
          setTrack(
            stream,
            PublicVideoElement,
            PublicAudioElement,
            participant.id
          );
        });
        participant.setQuality("high");
        videoContainerOne.appendChild(PublicVideoElement);
        videoContainerOne.appendChild(PublicAudioElement);
        addParticipantToList(participant);
      }
    }
  });

  meeting.on("pin-state-changed", ({ participantId, state, pinnedBy }) => {
    console.log({
      participantId, // id of participant who were pinned
      state, // { cam: true, share: true }
      pinnedBy, // id of participant who pinned that participant
    });
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

  //recording events
  meeting.on("recording-started", () => {
    console.log("RECORDING STARTED EVENT");
    setTimeout(() => {
      console.log("startInterview");
      let recInterview = true;
      meeting.sendChatMessage(
        JSON.stringify({ type: "start-interview", recInterview })
      );
      TIMER.StartTimer();
    }, 5000);

    // SEND TRIGGER MSG
  });
  meeting.on("recording-stopped", () => {
    console.log("RECORDING STOPPED EVENT");
    let recInterview = true;
    meeting.sendChatMessage(
      JSON.stringify({ type: "stop-interview", recInterview })
    );
  });

  meeting.on("meeting-left", () => {
    window.location.reload();
  });
  addDomEvents();

  startButtonWrapper.style.setProperty("display", "flex", "important");
}

//get access token

// joinMeeting();

async function joinMeeting(newMeeting) {
  // let defaultMeeting = "qwrc-b9ho-7x3j";

  let name = document.getElementById("joinMeetingName").value || "Sam";
  let meetingId = document.getElementById("joinMeetingId").value;
  if (!meetingId && !newMeeting) {
    return alert("Please Provide a meetingId");
  }

  // document.getElementById("joinPage").style.display = "none";
  document.querySelector(".wrapper").style.display = "none";

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
    // meetingId = await fetch(API_SERVER_URL + "/create-meeting", options).then(
    //   async (result) => {
    //     const { meetingId } = await result.json();
    //     console.log(meetingId);
    //     // console.log("NEW MEETING meetingId", meetingId);
    //     return meetingId;
    //   }
    // );
    meetingId = MEETING_ID;
  }
  // meetingId = "test"
  // console.log("MEETING_ID::", meetingId);

  navigator.clipboard.writeText(meetingId);
  //set meetingId
  // document.querySelector("#meetingid").innerHTML = meetingId;
  startMeeting(token, meetingId, name);
  console.log(token, meetingId, name);
  // console.log(token, meetingId, name);

  if (mode === "toolH") {
    // console.log(meeting.localParticipant.id);
  }
  if (mode === "toolP") {
    // console.log(meeting.localParticipant.id);
  }
  // let url = new URLSearchParams("http://localhost:3000/room.html?mode=tool");
  // const mode = params.get("mode");
}

// creating video element
function createVideoElement(pId) {
  if (mode === "toolH" || mode === "toolP") {
    let videoElement = document.createElement("video");
    let allVideos = document.querySelectorAll("video");
    // let parentVideo = videoElement.parentNode;

    videoElement.classList.add("video-frame");
    // videoContainerOne.classList.add("resize-drag");
    // videoContainerTwo.classList.add("resize-drag");
    if (mode === "toolH") {
      if (allVideos.length === 2) {
        videoContainerOne.classList.add("resize-drag");
      }
    }

    // console.log(allVideos);

    videoElement.setAttribute("id", pId);

    // socket.emit("webcam_id", {
    //   id: ("id", `v-${pId}`),
    // });
    return videoElement;
  }
  if (mode === "public") {
    let videoElement = document.createElement("video");
    let allVideos = document.querySelectorAll("video");
    // let parentVideo = videoElement.parentNode;

    videoElement.classList.add("video-frame");
    // videoContainerOne.classList.add("resize-drag");
    // videoContainerTwo.classList.add("resize-drag");

    if (allVideos.length === 2) {
      videoContainerOne.classList.add("resize-drag");
    }

    console.log(allVideos);

    videoElement.setAttribute("id", pId);

    // socket.emit("webcam_id", {
    //   id: ("id", `v-${pId}`),
    // });
    return videoElement;
  }
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

  //! PUT BACK AUDIO HERE

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
  // let recording = new Player({ csv, video1, video2 });
  // recording.onMessage(onMessage.bind(this));

  meeting.on("chat-message", (event) => {
    // split
    onMessage(event);

    // updateTool(event);

    // updatePrewiew(event);
  });

  // moveAndResize();

  VIDEO.moveVideo();
  VIDEO.resizeVideo();

  startButton.addEventListener("click", async () => {
    console.log("sendUser1");
    let localUser = true;
    // let localUser = { user1: true, user2: false };

    meeting.sendChatMessage(JSON.stringify({ type: "user1-ready", localUser }));
  });
  startOtherButton.addEventListener("click", async () => {
    console.log("sendUser1");
    const allUsersReady = true;
    meeting.sendChatMessage(
      JSON.stringify({ type: "all-user-ready", allUsersReady })
    );
  });

  sendMessageBtn.addEventListener("click", async () => {
    const message = inputUser.value;
    meeting.sendChatMessage(
      JSON.stringify({ type: "chatMessageCreated", message })
    );
    console.log(message);
    inputUser.value = "";
  });
  inputUser.addEventListener("input", function () {
    const message = inputUser.value;
    meeting.sendChatMessage(JSON.stringify({ type: "ontap-chat", message }));
    console.log(message);
  });
  publicSendMessageBtn.addEventListener("click", async () => {
    const message = inputPublic.value;
    meeting.sendChatMessage(
      JSON.stringify({ type: "public-send-chat", message })
    );
    console.log(message);
    inputPublic.value = "";
  });

  startRecordingBtn.addEventListener("click", async () => {
    meeting.startRecording();
  });
  stopRecordingBtn.addEventListener("click", async () => {
    meeting.stopRecording();
  });

  //! HIDE OR SHOW CAM
  camButton.addEventListener("click", () => {
    const toggleBLur = true;

    if (camButton.innerText == "Flouter sa caméra") {
      console.log("WOW");
      // meeting.disableWebcam();
      console.log(meeting.localParticipant.id, participant);
      $(".video-frame:first").addClass("blur");
      camButton.innerText = "Enlever le flou";
      meeting.sendChatMessage(JSON.stringify({ type: "blur-cam", toggleBLur }));
      console.log("hide");
    } else {
      // meeting.enableWebcam();
      $(".video-frame").removeClass("blur");
      meeting.sendChatMessage(JSON.stringify({ type: "blur-cam", toggleBLur }));

      camButton.innerText = "Flouter sa caméra";
      console.log("show");
    }
  });

  //! MUTE OR UNMUTE MIC
  micButton.addEventListener("click", () => {
    if (micButton.innerText == "Unmute Mic") {
      meeting.unmuteMic();
      micButton.innerText = "Mute Mic";
    } else {
      meeting.muteMic();
      micButton.innerText = "Unmute Mic";
    }
  });
}

// let inputImg = document.querySelector("#imgfiles");
// let inputVid = document.querySelector("#vidfiles");

// var imagekit = new ImageKit({
//   publicKey: "public_F+y/bdBG9098fxlawOAt4+sv63Q=",
//   urlEndpoint: "https://ik.imagekit.io/diploma/",
//   authenticationEndpoint: "http://localhost:3000/auth",
// });

// inputImg.addEventListener("change", (event) => {
//   imagekit.upload(
//     {
//       file: inputImg.files[0],
//       fileName: inputImg.files[0].name || "test_image.jpg",
//       tags: ["reference"],
//     },
//     function (err, result) {
//       if (err) {
//         // statusEl.innerHTML = "Error uploading image. " + err.message;
//         console.log(err);
//       } else {
//         // statusEl.innerHTML = "File Uploaded";
//         var sampleTransformations = [{ HEIGHT: 300, WIDTH: 400 }];
//         srcUrl = result.url;
//         transformedURL = imagekit.url({
//           src: srcUrl,
//           transformation: sampleTransformations,
//         });

//         var img = document.querySelector("#orig_image > p > img");
//         img.setAttribute("src", srcUrl);
//         img.classList.add("resize-drag");

//         meeting.sendChatMessage(
//           JSON.stringify({ type: "resize-webcam", srcUrl })
//         );
//       }
//     }
//   );
// });
// inputVid.addEventListener("change", (event) => {
//   imagekit.upload(
//     {
//       file: inputVid.files[0],
//       fileName: inputVid.files[0].name || "test_image.jpg",
//       tags: ["reference"],
//     },
//     function (err, result) {
//       if (err) {
//         // statusEl.innerHTML = "Error uploading image. " + err.message;
//         console.log(err);
//       } else {
//         // statusEl.innerHTML = "File Uploaded";
//         var sampleTransformations = [{ HEIGHT: 300, WIDTH: 400 }];
//         srcUrl = result.url;
//         transformedURL = imagekit.url({
//           src: srcUrl,
//           transformation: sampleTransformations,
//         });

//         const video = document.createElement("video");
//         video.src = srcUrl;
//         video.classList.add("video-test");
//         video.classList.add("resize-drag");

//         document.body.appendChild(video);
//         video.autoplay = true;
//       }
//     }
//   );
// });
// interact(".resize-drag")
//   .resizable({
//     // resize from all edges and corners
//     edges: { left: true, right: true, bottom: true, top: true },

//     listeners: {
//       move(event) {
//         var target = event.target;
//         var x = parseFloat(target.getAttribute("data-x")) || 0;
//         var y = parseFloat(target.getAttribute("data-y")) || 0;

//         // update the element's style
//         target.style.width = event.rect.width + "px";
//         target.style.height = event.rect.height + "px";

//         target.setAttribute("data-x", x);
//         target.setAttribute("data-y", y);

//         const resizeWebcam = {
//           w: event.rect.width,
//           h: event.rect.height,
//         };

//         // meeting.sendChatMessage(
//         //   JSON.stringify({ type: "resize-webcam", resizeWebcam })
//         // );
//       },
//     },
//     modifiers: [
//       // keep the edges inside the parent
//       interact.modifiers.restrictEdges({
//         outer: "wrapper",
//       }),

//       // minimum size
//       interact.modifiers.restrictSize({
//         min: { width: 100, height: 50 },
//       }),
//     ],

//     inertia: true,
//   })
//   .draggable({
//     listeners: {
//       start(event) {
//         // console.log(event.type, event.target);
//       },
//       move(event) {
//         const movingWebcam = {
//           x: (position.x += event.dx),
//           y: (position.y += event.dy),
//         };

//         // meeting.sendChatMessage(
//         //   JSON.stringify({ type: "moving-webcam", movingWebcam })
//         // );
//         position.x += event.dx;
//         position.y += event.dy;

//         event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
//       },
//     },
//   });
