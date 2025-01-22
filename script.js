var video = document.getElementById("video");
var captureBtn = document.getElementById("capture");
var photoContainer = document.getElementById("photos");
var videoContainer = document.querySelector(".video-container");
var closeBtn = document.getElementById("close");
var main = document.getElementsByTagName('main')[0];
var carouselRight = document.getElementById('carousel-right');
var galleryBtn = document.getElementById("gallery");
var gallerySection = document.getElementById('gallery-section');
var mainSection = document.getElementById('main-section');
var title = document.getElementById('title');
var backBtn = document.getElementById('back');
var editSection = document.getElementById('edit-section');

backBtn.addEventListener('click', () => {
    gallerySection.style.display = "none";
    mainSection.style.display = 'block';
    title.textContent = 'Photobooth';
    backBtn.style.display = 'none';
})

galleryBtn.addEventListener('click', () => {
    gallerySection.style.display = "block";
    mainSection.style.display = 'none';
    title.textContent = 'Gallery';
    backBtn.style.display = 'flex';
});

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

    var btnDiv = document.createElement('div');
    btnDiv.classList.add("btn-div");

    var downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download";
    downloadBtn.classList.add('download-btn')

    downloadBtn.addEventListener("click", () => {
        var a = document.createElement("a");
        a.href = dataURL;
        a.download = "photo.png";
        a.click();
    })
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
        editSection.style.display = "block";
        gallerySection.style.display ="none";
        backBtn.addEventListener('click', () => {
            backBtn.style.display = 'flex'
            editSection.style.display = "none";
            gallerySection.style.display ="block";
            mainSection.style.display = 'none';
            backBtn.addEventListener('click', () => {
                gallerySection.style.display ="none";
                mainSection.style.display = 'block';
                backBtn.style.display = 'none';
            })
        })
        title.textContent = 'Edit'
    });


    btnDiv.appendChild(downloadBtn);
    btnDiv.appendChild(editBtn);
    photoDiv.appendChild(btnDiv);
    photoContainer.appendChild(photoDiv);
    carouselRight.appendChild(photoDiv.cloneNode(true));
});

