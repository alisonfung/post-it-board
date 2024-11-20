function removePostIt(checkbox) {
    const postIt = checkbox.parentElement; 
    postIt.style.transition = "opacity 0.3s, transform 0.3s";
    postIt.style.opacity = 0;
    postIt.style.transform = "scale(0.9)";

    setTimeout(() => {
        postIt.remove(); 
    }, 300); 
}
