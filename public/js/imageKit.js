// var CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dejdsouuf";
// var CLOUDINARY_UPLOAD_PRESET = "hrkmwjql";
// var imgPreview = document.getElementById("img-preview");
// var fileUpload = document.getElementById("file-upload");

// fileUpload.addEventListener("change", function (event) {
//   console.log(event);
//   var file = event.target.files[0];
//   var formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//   axios({
//     url: CLOUDINARY_URL,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Headers": "Origin",
//       "Access-Control-Allow-Credentials": true,
//     },
//     data: formData,
//   })
//     .then(function (res) {
//       console.log(res);
//       imgPreview.src = res.data.secure_url;
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// });
