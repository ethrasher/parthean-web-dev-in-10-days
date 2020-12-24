function createNewImage(textInput) {
  var elem = document.createElement("img");
  elem.src = textInput;
  
  // We first get the "container" div element
  // Then we append a child (our image) to it!
  document.getElementById("container").appendChild(elem);
}

$("#form_id").submit(function(e) {
    e.preventDefault();

  var text_input = document.getElementById('link_input');
  createNewImage(text_input.value);
  text_input.value="";
});