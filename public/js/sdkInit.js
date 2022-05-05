const API_SERVER_URL = `${window.location.origin}`;

let localUser = false;
let participantUser = false;

let userNotReadyYet = false;

let startButton = document.querySelector(".startButton");
let startOtherButton = document.querySelector(".startOtherButton");
let startButtonWrapper = document.querySelector(".startButtonWrapper");
let toolController = document.querySelector(".tool-control");
let fond = document.querySelector(".chat-wrapper");

let videoContainerOne = document.querySelector(".videoWrapper-one");
let videoContainerTwo = document.querySelector(".videoWrapper-two");
let inputUser = document.querySelector("#inputMessage");

let playGround = document.querySelector(".playGround");
let micButton = document.getElementById("mic-btn");
let camButton = document.querySelector(".cam-btn");
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
  localParticipant = createVideoElement(meeting.localParticipant.id);
  localParticipantAudio = createAudioElement(meeting.localParticipant.id);
  videoContainerOne.appendChild(localParticipant);
  meeting.localParticipant.quality = "high";
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
  });
  //? Meeting Join
  meeting.join();
  // meeting.setWebcamQuality("high");

  //? create Local Participant
  createLocalParticipant();

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
    let videoElement = createVideoElement(participant.id);
    let audioElement = createAudioElement(participant.id);

    participant.on("stream-enabled", (stream) => {
      setTrack(stream, videoElement, audioElement, participant.id);
    });

    participant.setQuality("high");
    console.log(
      participant.length,
      meeting.localParticipant.id,
      participant.id
    );

    let mirrorCam = true;
    meeting.sendChatMessage(
      JSON.stringify({ type: "mirror-webcam", mirrorCam })
    ); // console.log("row");

    console.log("PARTICIPANT-JOINED");

    videoContainerTwo.appendChild(videoElement);
    videoContainerTwo.appendChild(audioElement);
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

  //recording events
  meeting.on("recording-started", () => {
    console.log("RECORDING STARTED EVENT");
    let recInterview = true;
    meeting.sendChatMessage(
      JSON.stringify({ type: "start-interview", recInterview })
    );
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

  navigator.clipboard.writeText(meetingId);
  //set meetingId
  document.querySelector("#meetingid").innerHTML = meetingId;
  startMeeting(token, meetingId, name);
  console.log(token, meetingId, name);
}

// creating video element
function createVideoElement(pId) {
  let videoElement = document.createElement("video");
  let allVideos = document.querySelectorAll("video");
  // let parentVideo = videoElement.parentNode;

  videoElement.classList.add("video-frame");
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

    // const mediaStream = new MediaStream();
    // mediaStream.addTrack(stream.track);
    // audioElement.srcObject = mediaStream;
    // audioElement
    //   .play()
    //   .catch((error) => console.error("audioElem.play() failed", error));
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
    domAction(event);

    // updateTool(event);

    // updatePrewiew(event);
  });

  // moveAndResize();

  VIDEO.moveVideo();
  VIDEO.resizeVideo();

  sendMessageBtn.addEventListener("click", async () => {
    const message = inputUser.value;
    meeting.sendChatMessage(
      JSON.stringify({ type: "chatMessageCreated", message })
    );
    console.log(message);
    document.getElementById("inputMessage").value = "";
  });
  inputUser.addEventListener("input", function () {
    const message = inputUser.value;
    meeting.sendChatMessage(JSON.stringify({ type: "ontap-chat", message }));
    console.log(message);
  });
}
