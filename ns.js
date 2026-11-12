// ================================================================
//  PUT YOUR GEMINI API KEY HERE (keep the quotes)
// ================================================================
const API_KEY = "AQ.Ab8RN6Iua-VvOgNSV63mTh7GCQearWhK47LC-im0qkFjxApBNg";

// ---------- 1. Grab the elements from the page ----------
const video       = document.getElementById("video");
const canvas      = document.getElementById("canvas");
const placeholder = document.getElementById("placeholder");
const startBtn    = document.getElementById("startBtn");
const captureBtn  = document.getElementById("captureBtn");
const fileInput   = document.getElementById("fileInput");
const analyzeBtn  = document.getElementById("analyzeBtn");
const statusText  = document.getElementById("status");
const resultBox   = document.getElementById("result");

let imageData = null;   // will hold the photo as base64 text

// ---------- 2. Open the camera ----------
startBtn.onclick = async function () {
  try {
    // facingMode "environment" = back camera on phones
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
    video.srcObject = stream;
    video.style.display = "block";
    canvas.style.display = "none";
    placeholder.style.display = "none";
    captureBtn.disabled = false;
  } catch (error) {
    statusText.textContent = "Could not open the camera. Allow camera permission, or use Upload instead.";
    statusText.className = "error";
  }
};

// ---------- 3. Capture a photo from the video ----------
captureBtn.onclick = function () {
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  // turn the canvas into base64 text (remove the "data:image/jpeg;base64," start)
  imageData = canvas.toDataURL("image/jpeg", 0.85).split(",")[1];

  // show the photo, hide the live video, switch the camera off
  video.style.display = "none";
  canvas.style.display = "block";
  video.srcObject.getTracks().forEach(function (t) { t.stop(); });
  captureBtn.disabled = true;
  analyzeBtn.disabled = false;
  statusText.textContent = "";
};

// ---------- 4. Or upload a photo from the device ----------
fileInput.onchange = function () {
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new