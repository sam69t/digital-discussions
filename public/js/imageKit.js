// var imagekit = new ImageKit({
//   publicKey: "public_F+y/bdBG9098fxlawOAt4+sv63Q=",
//   urlEndpoint: "https://ik.imagekit.io/diploma/",
//   authenticationEndpoint: "http://localhost:3000/auth",
// });

// window.imagekit = imagekit;
// var file = document.getElementById("file-upload");
// file.addEventListener("change", (event) => {
//   // UploadImage(file);
//   console.log(file[0].name);
// });
// // var statusEl = document.getElementById("status");
// // statusEl.innerHTML = "Uploading...";

// function UploadImage(file) {
//   imagekit.upload(
//     {
//       file: file.files[0],
//       fileName: file.files[0].name || "test_image.jpg",
//       tags: ["reference"],
//       // folder: "/TEST_NO_1",
//       //- extensions: [
//       //-         {
//       //-             name: "aws-auto-tagging",
//       //-             minConfidence: 80,
//       //-             maxTags: 10
//       //-         }
//       //-     ],
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

//         var orig_img = document.querySelector("#orig_image > p > img");
//         // var trans_img = document.querySelector("#trans_image > p > img");

//         orig_img.setAttribute("src", srcUrl);
//         // trans_img.setAttribute("src", transformedURL);

//         // var el = document.getElementById("images");
//         // el.setAttribute("style", "block");
//       }
//     }
//   );
// }
