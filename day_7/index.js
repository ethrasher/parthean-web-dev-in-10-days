$("#form1").submit(function(e) {
    e.preventDefault();

    var url = document.getElementById("image-url");
    var caption = document.getElementById("caption");
    var url_text = url.value;
    var caption_text = caption.value;

    if (url_text !== "" || caption_text !== "") {
        addNewPost(url_text, caption_text);
    }

    url.value = "";
    caption.value = "";
});


function addNewPost(url, caption) {
    // make the delete button
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "X";

    // make the img
    var imgBlock = document.createElement("img");
    imgBlock.src = url;

    // make the image div
    var image = document.createElement("div");
    image.classList.add("image");
    image.appendChild(deleteButton);
    image.appendChild(imgBlock);

    //make the description div
    var descriptionText = document.createElement("p");
    descriptionText.innerHTML = caption;
    var description = document.createElement("div");
    description.classList.add("description");
    description.appendChild(descriptionText);

    // make the post div
    var post = document.createElement("div");
    post.classList.add("post");
    post.appendChild(image);
    post.appendChild(description);

    document.getElementById("postContainer").appendChild(post);

    deleteButton.onclick = function () {
        post.remove();
    }
}

$("#editProfile").submit(function(e) {
    e.preventDefault();

    var name = document.getElementById("profile-name");
    var name_text = name.value;
    var url = document.getElementById("profile-image-url");
    var url_text = url.value;
    var bio = document.getElementById("profile-bio");
    var bio_text = bio.value;

    if (name_text !== "" || url_text !== "" || bio_text !== "") {
        editProfile(name_text, url_text, bio_text);
    }

    name.value = "";
    url.value = "";
    bio.value = "";
});


function editProfile(name, url, bio) {
    var nameComponent = document.getElementById("profileName");
    var urlComponent = document.getElementById("profileImage");
    var bioComponent = document.getElementById("profileBio");

    if (name !== "") {
        nameComponent.innerHTML = name;
    }
    if (url !== "") {
        urlComponent.src = url;
    }
    if (bio !== "") {
        bioComponent.innerHTML = bio;
    }
}