var loadFile = function(event) {
  var file = event.target.files[0]; 
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = readerEvent => {
    var inputImage = readerEvent.target.result;             
    var photo = document.getElementById("photo");
    var frame = document.getElementById("frame");
    var video = document.querySelector("#video");
    crop(inputImage, 1).then((canvas) => {
      canvas.getContext("2d").drawImage(frame, 0, 0, frame.naturalWidth, frame.naturalHeight, 0, 0, canvas.width, canvas.height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    });
    photo.style.display = 'block';
    video.style.display = 'none';
    frame.style.display = 'none';
    document.getElementById("choose-overlay-area-id").style.display = 'none';
    document.getElementById("rate-area-id").style.display = 'block';
  }
};

function startUpPage() {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  if (vw/vh < 674/458 || vw/vh > 1000/458) {
    document.getElementsByTagName("BODY")[0].style.backgroundImage = 'none';
  }
  //x.style.backgroundColor = "black";
  //x.style.backgroundColor = "red";
  //var foobarElement = document.getElementById('foobar');
  //foobarElement.style.background = 'none';
  /*var site_content = document.getElementById("site-content-id");
  let newWidth = screen.width*720/3510;
  let newHeight = newWidth*1280/720;
  site_content.style.width = newWidth + "px";
  site_content.style.height = newHeight + "px";
  var white_oval_buttons = document.getElementsByClassName("white-oval-button");
  let oval_new_max_width = newWidth*167/315;
  for (let i = 0; i < white_oval_buttons.length; i++) {
    white_oval_buttons[i].style.maxWidth = oval_new_max_width + "px";
  }*/
  var web_cam = document.getElementById("webcam-id");
  var video = document.getElementById("video");
  var photo = document.getElementById("photo");
  var frame = document.getElementById("frame");
  var phoneWidth = vh*0.78*0.5625;
  var phoneHeight = vh*0.78;
  let cam_new_width = Math.round(phoneWidth*206/316.6);
  web_cam.style.width = cam_new_width + "px";
  web_cam.style.height = cam_new_width + "px";
  video.style.width = cam_new_width + "px";
  video.style.height = cam_new_width + "px";
  photo.style.width = cam_new_width + "px";
  photo.style.height = cam_new_width + "px";
  frame.style.width = cam_new_width + "px";
  frame.style.height = cam_new_width + "px";

  var white_oval_buttons = document.getElementsByClassName("white-oval-button");
  let oval_new_width = phoneWidth*137.452/263.25;
  for (let i = 0; i < white_oval_buttons.length; i++) {
    white_oval_buttons[i].style.width = oval_new_width + "px";
  }
  var camera_icon_id = document.getElementById("camera-icon-id");
  var camera_icon_new_size = phoneWidth*30/316.6;
  camera_icon_id.style.width = camera_icon_new_size  + "px";
  camera_icon_id.style.height = camera_icon_new_size  + "px";

  var lineBreaks = document.getElementsByTagName('p');
  let breakSize = phoneHeight*118.932/1067.01 + "px";
  for (let i = 0; i < lineBreaks.length; i++) {
    lineBreaks[i].style.marginBottom = breakSize;
  }
  document.getElementById("message-choose-frame").style.marginBottom = "16px";
  document.getElementById("camera-icon-p-id").style.marginBottom = "16px";
  document.getElementById("message-tryAgain").style.marginBottom = "16px";
  document.getElementById("message-enterInfo").style.marginBottom = "12px";
  
  //site_content.style.display = 'block';
  /*var site_content = document.getElementById("site-content-id");
  let height = site_content.clientHeight;
  let margin = (height - 720)/2;
  site_content.style.top =  margin + "px";
  site_content.style.bottom =  margin + "px";*/
  document.getElementById("live-content-area-id").style.display = 'none';
  document.getElementById("submission-area-id").style.display = 'none';
  document.getElementById("restart-or-share-area-id").style.display = 'none';

  document.getElementById("google_translate_element").style.display = 'block';
}

function goToLivePage() {
  document.getElementById("starting-content-area-id").style.display = 'none';
  document.getElementById("live-content-area-id").style.display = 'block';
  document.getElementById("photo").style.display = 'none';
  var frame = document.getElementById("frame");
  frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame1.png";
  frame.style.display = 'block';
  document.getElementById("choose-overlay-area-id").style.display = 'none';
  document.getElementById("rate-area-id").style.display = 'none'; 
  var video = document.querySelector("#video");
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(function(stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function(err) {
    console.log("An error occurred: " + err);
  });
}

function showChooseOverlayArea() {
  document.getElementById("choose-experience-area-id").style.display = 'none';
  document.getElementById("choose-overlay-area-id").style.display = 'block';
  var frame = document.getElementById("frame");
  frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame1.png";
  frame.style.display = 'block';
}

function goToLivePageBack() {
  document.getElementById("upload-photo-id").value = ''; 
  clearphoto();
  document.getElementById("photo").style.display = 'none';   
  document.getElementById("rate-area-id").style.display = 'none';
  document.getElementById("video").style.display = 'block';
  document.getElementById("frame").style.display = 'block';
  document.getElementById("choose-overlay-area-id").style.display = 'block';
}

function goToLivePageRestart() {
  document.getElementById("restart-or-share-area-id").style.display = 'none';
  document.getElementById("upload-photo-id").value = ''; 
  clearphoto();
  document.getElementById("live-content-area-id").style.display = 'none';
  document.getElementById("submission-area-id").style.display = 'none';
  document.getElementById("restart-or-share-area-id").style.display = 'none';
  document.getElementById("starting-content-area-id").style.display = 'none';
  document.getElementById("live-content-area-id").style.display = 'block';
  document.getElementById("photo").style.display = 'none';
  var frame = document.getElementById("frame");
  frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame1.png";
  frame.style.display = 'block';
  document.getElementById("choose-overlay-area-id").style.display = 'none';
  document.getElementById("rate-area-id").style.display = 'none';
  document.getElementById("choose-experience-area-id").style.display = 'block';
  document.getElementById("video").style.display = 'block';
}

function showSendEmailPage() {
  document.getElementById("live-content-area-id").style.display = 'none';
  document.getElementById("submission-area-id").style.display = 'block';
}

function showLastPage() {
  document.getElementById("submission-area-id").style.display = 'none';
  document.getElementById("restart-or-share-area-id").style.display = 'block';
  //var photo = document.getElementById("photo");
  //document.getElementById("twitter-share-id").data('url', photo.src);
}

function setFrame(i){
  var frame = document.getElementById("frame");
  if (i == 0) {
    frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame1.png";
  }
  else if (i == 1) {
    frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame2.png";
  }
  else if (i == 2) {
    frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame3.png";
  }
  else if (i == 3) {
    frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame4.png";
  }
  else {
    frame.src = "https://raw.githubusercontent.com/junlianglu/walkRunRideMoon/master/img/frame5.png";
  }
  frame.style.display = 'block';
}

function clearphoto() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function takepicture() {
  var canvas = document.getElementById("canvas");
  var video = document.querySelector("#video");
  var photo = document.getElementById("photo");
  var frame = document.getElementById("frame");
  var context = canvas.getContext('2d');
  var cropStartX = 0;
  var cropStartY = 0;
  var cropLength = video.videoHeight;
  if (video.videoWidth >= video.videoHeight) {
    cropStartX = (video.videoWidth-video.videoHeight)/2;
  } else {
    cropStartY = (video.videoHeight-video.videoWidth)/2;
    cropLength = video.videoWidth;
  }
  canvas.width = 275;
  canvas.height = 275;   
  context.drawImage(video, cropStartX, cropStartY, cropLength, cropLength, 0, 0, canvas.width, canvas.height);
  context.scale(-1, 1);
  context.drawImage(canvas, -canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(frame, 0, 0, frame.naturalWidth, frame.naturalHeight, 0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL('image/png');
  document.createElement('canvas');
  photo.setAttribute('src', data);
  photo.style.display = 'block';
  video.style.display = 'none';
  frame.style.display = 'none';
  document.getElementById("choose-overlay-area-id").style.display = 'none';
  document.getElementById("rate-area-id").style.display = 'block';
  var audio = new Audio("shutter.mp3");
  audio.play();
  //downloadPic();
}

function pickFile() {
  var input = document.createElement('input');
  input.type = 'file';
  input.onchange = e => {
    var file = e.target.files[0]; 
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = readerEvent => {
      var inputImage = readerEvent.target.result;             
      var photo = document.getElementById("photo");
      var frame = document.getElementById("frame");
      var video = document.querySelector("#video");
      crop(inputImage, 1).then((canvas) => {
        canvas.getContext("2d").drawImage(frame, 0, 0, frame.naturalWidth, frame.naturalHeight, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      });
      photo.style.display = 'block';
      video.style.display = 'none';
      frame.style.display = 'none';
      document.getElementById("choose-overlay-area-id").style.display = 'none';
      document.getElementById("rate-area-id").style.display = 'block';
    }
  }
  input.click();
}

function crop(url, aspectRatio) {
  // we return a Promise that gets resolved with our canvas element
  return new Promise((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      // create a canvas that will present the output image
      const outputImage = document.createElement("canvas");

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext("2d");
      ctx.drawImage(inputImage, outputX, outputY);
      resolve(outputImage);
    };

    // start loading our image
    inputImage.src = url;
    
  });
}

function downloadPic() {
  photo = document.getElementById("photo");
  a = document.createElement("a");
  a.href = photo.src;
  a.download = photo.src;
  a.click();
};

document.getElementById('submit-button-id')
    .addEventListener('click', (e) => {
        e.preventDefault();
        const fullName = document
            .querySelector('#receiverFullName').value;

        const email = document
            .querySelector('#receiverEmail').value;
        const resultImage = document.querySelector('#photo').src;
        var base64Data = resultImage.replace(/^data:image\/png;base64,/,"");
        var fileName = base64Data.replace(/[^A-Za-z0-9]/g, '').substr(72, 250);
        document.getElementById("fa-id").href = "https://www.facebook.com/sharer/sharer.php?u=snapluu.org/" + fileName + ".png" + "&hashtag=%23WRR2Moon";
        document.getElementById("tw-id").href = "https://twitter.com/share?url=snapluu.org/" + fileName + ".png" + "&text=Checking out the virtual photo booth from Self-Help for the Elderly! You can too %40 snapluu.org" + "&hashtags=WRR2Moon";
        document.getElementById("li-id").href = "http://www.linkedin.com/shareArticle?mini=true&url=snapluu.org/" + fileName + ".png";
        fetch('/nodeapp', {
            method: 'POST',
            headers: {
                Authorization: 'Dexter Lu',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName,
                email,
                resultImage,
            }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => console.log(""));
});
