'use strict';

const openButton = document.getElementById("openOverlayButton");
const closeButton = document.getElementById("closeOverlayButton");
const closeButtonInside = document.getElementById("closeOverlayButtonInside");
const overlay = document.getElementById("overlay");

openButton.onclick = function() {
    overlay.style.display = "block";
}

closeButton.onclick = function() {
    overlay.style.display = "none"; 
}

closeButtonInside.onclick = function() {
    overlay.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == overlay) {
        overlay.style.display = "none";
    }
}