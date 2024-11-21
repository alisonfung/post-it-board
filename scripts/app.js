'use strict';

let lastUsedId = 0;
const postItsObject = {}; // object to store post-it data by id

function openOverlayForNewPostIt() {
    // open/show the overlay
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";

    // create new post-it object
    const newPostIt = {
        text: "",
        color: "green"
    };

    // default values for new post-it
    const postItText = document.getElementById("postItText");
    postItText.value = "";

    const displayPostIt = document.getElementById("postIt");
    displayPostIt.className = "post-it green"; // default color for displayed post-it

    const colorButtons = document.querySelectorAll(".color-btn");
    colorButtons.forEach(button => button.classList.remove("selected-color"));
    document.querySelector(".color-btn[data-color='green']").classList.add("selected-color");  // reset color selection buttons in overlay to green
}

function getPostItFields() {
    const postItText = document.getElementById("postItText").value; // get text from the input box on overlay
    const displayPostIt = document.getElementById("postIt");
    const selectedColor = displayPostIt.classList[1] || "green"; // get the color from display post-it, default to green

    lastUsedId += 1;
    return {
        id: lastUsedId,
        text: postItText,
        color: selectedColor,
    };
}

function addPostIt(postIt) {
    const postItContainer = document.querySelector('.post-it-container');

    const postItElement = document.createElement('div');
    postItElement.className = `post-it ${postIt.color}`;
    postItElement.dataset.id = postIt.id;
    postItElement.innerText = postIt.text;

    // add click event to open overlay to edit
    postItElement.addEventListener('click', function () {
        openOverlay(postIt.id);
    });

    // add a checkbox div for removal
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';
    checkboxDiv.title = 'Remove Post-it';

    // add event listener to remove post-it on checkbox click
    checkboxDiv.addEventListener('click', function(event) {
        //prevent the event from reaching the post-it
        event.stopPropagation();
        removePostIt(this);
    });

    // add checkbox and text to post-it element
    postItElement.appendChild(checkboxDiv);

    // add post-it to container
    postItContainer.appendChild(postItElement);
}

function savePostIt() {
    const overlay = document.getElementById("overlay");
    const currentId = overlay.dataset.currentPostItId;

    const postItText = document.getElementById("postItText").value; // get input text
    const displayPostIt = document.getElementById("postIt");
    const selectedColor = displayPostIt.classList[1] || "green"; // get selected color

    if (currentId) {
        // editing an existing post-it
        const postIt = postItsObject[currentId];
        postIt.text = postItText;
        postIt.color = selectedColor;

        // update post-it DOM element
        const postItElement = document.querySelector(`.post-it[data-id='${currentId}']`);
        if (postItElement) {
            const checkboxDiv = postItElement.querySelector('.checkbox');

            postItElement.innerText = postIt.text;
            postItElement.className = `post-it ${postIt.color}`;

            postItElement.appendChild(checkboxDiv);
        }
    } else {
        // creating a new post-it
        lastUsedId += 1; // increment ID counter
        const newPostIt = {
            id: lastUsedId,
            text: postItText,
            color: selectedColor,
        };

        postItsObject[newPostIt.id] = newPostIt; // store new post-it in postItsObject
        addPostIt(newPostIt); // add to screen
    }

    overlay.style.display = "none"; // close overlay
    overlay.dataset.currentPostItId = ""; // clear overlay's post-it ID
}

// fills overlay with the correct text and color of the post-it being editied
function openOverlay(id) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";

    const postIt = postItsObject[id]; // find post-it data by id
    const postItText = document.getElementById("postItText");
    const displayPostIt = document.getElementById("postIt");
    const colorButtons = document.querySelectorAll(".color-btn");

    // update overlay fields
    postItText.value = postIt.text;
    displayPostIt.className = `post-it ${postIt.color}`;

    colorButtons.forEach(button => {
        button.classList.remove("selected-color"); //reset buttons
        if (button.getAttribute("data-color") === postIt.color) {
            button.classList.add("selected-color");
        }
    });

    // save the id of the post-it being edited
    overlay.dataset.currentPostItId = id;
}

const colorButtons = document.querySelectorAll(".color-btn");
colorButtons.forEach(button => {
    button.addEventListener("click", function () {
        colorButtons.forEach(btn => btn.classList.remove("selected-color")); //reset buttons
        button.classList.add("selected-color");

        // update the display post-it color
        const selectedColor = button.getAttribute("data-color");
        const displayPostIt = document.getElementById("postIt");
        displayPostIt.className = `post-it ${selectedColor}`;
    });
});

document.getElementById("openOverlayButton").addEventListener("click", openOverlayForNewPostIt);
document.getElementById("doneButton").addEventListener("click", savePostIt);

// close Button (x) event listener
document.getElementById("overlayCloseBtn").addEventListener("click", function () {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Hide overlay
});

// close overlay if clicked outside of it
window.onclick = function(event) {
    if (event.target === overlay) {
        overlay.style.display = "none";
    }
};

function removePostIt(checkbox) {
    const postIt = checkbox.parentElement; 
    postIt.style.transition = "opacity 0.3s, transform 0.3s";
    postIt.style.opacity = 0;
    postIt.style.transform = "scale(0.9)";

    setTimeout(() => {
        postIt.remove(); 
    }, 300); 
<<<<<<< HEAD
}
=======
}

>>>>>>> main
