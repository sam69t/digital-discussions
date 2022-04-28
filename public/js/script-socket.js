// var id = new Date().getTime();

// window.addEventListener("load", function () {
//   var socket = io();
//   socket = io.connect(`${window.location.origin}`);
//   socket.emit("id", id);

//   console.log("socket-on");

//   //! MOUSE TRACKER

//   // $(document).on("mousemove", function (event) {
//   //   socket.emit("mouse_activity", {
//   //     x: event.pageX,
//   //     y: event.pageY,
//   //   });
//   // });
//   socket.on("all_mouse_activity", function (data) {
//     if ($('.pointer[id="' + data.session_id + '"]').length <= 0) {
//       $("body").append(
//         '<div class="pointer" id="' + data.session_id + '"></div>'
//       );
//     }

//     var $pointer = $('.pointer[id= "' + data.session_id + '"]');
//     $pointer.css("left", data.coords.x);
//     $pointer.css("top", data.coords.y);
//   });

//   let ids = [];

//   //! WEBCAMES ID ASSIGMENT

//   socket.on("all_webcam_id", function (data) {
//     // console.log(data.coords.x);
//     // console.log(data.webcamId);
//     ids.push(data.webcamId);
//     console.log(data.webcamId);
//     // console.log(ids[0]);
//   });

//   //! WEBCAMES MOVEMENTS

//   socket.on("all_webcam_moves", function (data) {
//     console.log(data.session_id);
//     // var $webcam = $(".video-frame:last");
//     var $webcam = $('.video-frame[id= "' + data.session_id + '"]');

//     // $(".video-frame:first").addClass(".resize-drag");

//     console.log($webcam);
//     $webcam.css("left", data.coords.x);
//     $webcam.css("top", data.coords.y);
//   });

//   //! WEBCAMES SIZES

//   // socket.on("all_webcam_sizes", function (data) {
//   //   console.log(data.coords.width, data.session_id);
//   //   var $webcam = $(".video-frame");
//   //   $webcam.css("width", data.coords.width);
//   //   $webcam.css("height", data.coords.height);
//   // });
// });
