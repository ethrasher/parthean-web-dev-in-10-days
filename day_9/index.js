var firebaseConfig = {
    apiKey: "AIzaSyA3LN_atwZVTzyBmXdua12pBHLTqa4JjLU",
    authDomain: "sams-tagram.firebaseapp.com",
    databaseURL: "https://sams-tagram.firebaseio.com",
    projectId: "sams-tagram",
    storageBucket: "sams-tagram.appspot.com",
    messagingSenderId: "323417596174",
    appId: "1:323417596174:web:ba38d37a3ee1f3ffa3375f"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

$("#form1").submit(function(e) {
    e.preventDefault();

    var url = document.getElementById("image-url");
    var caption = document.getElementById("caption");
    var url_text = url.value;
    var caption_text = caption.value;

    if (url_text !== "" || caption_text !== "") {
        savePostToDatabase(url_text, caption_text);
    }

    url.value = "";
    caption.value = "";
});

function savePostToDatabase(url_text, caption_text) {
    doc = db.collection("posts").add({
        imageUrl: url_text,
        caption: caption_text
    })
    .then(function(docRef) {
        docRef.get().then(function(doc) {
            addNewPost(doc);
        })
    })
}


function addNewPost(doc) {
    // make the delete button
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "X";

    // make the img
    var imgBlock = document.createElement("img");
    imgBlock.src = doc.data().imageUrl;

    // make the image div
    var image = document.createElement("div");
    image.classList.add("image");
    image.appendChild(deleteButton);
    image.appendChild(imgBlock);

    //make the description div
    var descriptionText = document.createElement("p");
    descriptionText.innerHTML = doc.data().caption;
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
        db.collection("posts").doc(doc.id).delete();
    }
}


function loadPosts () {
    db.collection("posts").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNewPost(doc);
        })
    })
}

$(document).ready(loadPosts);