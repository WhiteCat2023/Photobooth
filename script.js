var video = document.getElementById("video");
var captureBtn = document.getElementById("capture");
var photoContainer = document.getElementById("photos");
var videoContainer = document.querySelector(".video-container");
var closeBtn = document.getElementById("close");
var main = document.getElementsByTagName('main')[0];
var carouselRight = document.getElementById('carousel-right');

closeBtn.addEventListener("click", () => {
    main.style.display = "block";
    videoContainer.style.display = "none";
})

camBtn.addEventListener("click", (e) => {
    e.preventDefault();

    main.style.display = "none";
    videoContainer.style.display = "block";
})

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
});

captureBtn.addEventListener('click', (e) =>{
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL("img/png");

    var photoDiv = document.createElement("div");
    photoDiv.classList.add("photo");

    var img = document.createElement("img");
    img.src = dataURL;
    photoDiv.appendChild(img);

    var downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.addEventListener("click", () => {
        var a = document.createElement("a");
        a.href = dataURL;
        a.download = "photo.png";
        a.click();
    })
    photoDiv.appendChild(downloadBtn);

    photoContainer.appendChild(photoDiv);
    carouselRight.appendChild(photoDiv.cloneNode(true));
});

