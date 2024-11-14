'use strict';
var last_used_id = 0

function get_postit_fields(){
    const text = "" // get text from the input box on the overlay
    const color = "" // get color from the overlay
    last_used_id += 1
    return {
        id: last_used_id,
        text: text,
        color: color,
    }
}

function add_postit(postit){
    // add postit to the dom using postit.id, postit.text, postit.color
}

function remove_postit(id){
    // remove postit from the dom using the id
}
