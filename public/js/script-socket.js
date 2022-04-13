var id = new Date().getTime();

window.addEventListener("load", function () {
  var socket = io();
  socket = io.connect("http://localhost:3000");
  socket.emit("id", id);

  let xCam;
  let yCam;
  let wCam;
  let hCam;

  console.log("socket-on");

  //! MOUSE TRACKER

  $(document).on("mousemove", function (event) {
    socket.emit("mouse_activity", {
      x: event.pageX,
      y: event.pageY,
    });
  });
  socket.on("all_mouse_activity", function (data) {
    if ($('.pointer[session_id="' + data.session_id + '"]').length <= 0) {
      $("body").append(
        '<div class="pointer" session_id="' + data.session_id + '"></div>'
      );
    }

    var $pointer = $('.pointer[session_id= "' + data.session_id + '"]');
    $pointer.css("left", data.coords.x);
    $pointer.css("top", data.coords.y);
  });

  //! WEBCAMES ID ASSIGMENT

  socket.on("all_webcam_id", function (data) {
    // console.log(data.coords.x);
    console.log(data);
  });

  //! WEBCAMES MOVEMENTS

  socket.on("all_webcam_moves", function (data) {
    var $webcam = $(".video-frame");
    $webcam.css("left", data.coords.x);
    $webcam.css("top", data.coords.y);
  });

  //! WEBCAMES SIZES

  socket.on("all_webcam_sizes", function (data) {
    console.log(data.coords.width, data.session_id);
    var $webcam = $(".video-frame");
    $webcam.css("width", data.coords.width);
    $webcam.css("height", data.coords.height);
  });
});
