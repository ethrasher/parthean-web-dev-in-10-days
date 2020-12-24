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

$("#editProfile").submit(function(e) {
    e.preventDefault();

    var name = document.getElementById("profile-name");
    var name_text = name.value;
    var url = document.getElementById("profile-image-url");
    var url_text = url.value;
    var bio = document.getElementById("profile-bio");
    var bio_text = bio.value;

    if (name_text !== "" || url_text !== "" || bio_text !== "") {
        saveProfileInfoToDatabase(name_text, url_text, bio_text);
    }

    name.value = "";
    url.value = "";
    bio.value = "";
});

function saveProfileInfoToDatabase(name, url, bio) {
    var updateFields = {};
    if (name !== "") {
        updateFields.name = name;
    }
    if (url !== "") {
        updateFields.imageURL = url;
    }
    if (bio !== "") {
        updateFields.bio = bio;
    }
    var docRef = db.collection("profile").doc("profileInfo");
    docRef.update(updateFields)
        .then(function() {
            docRef.get().then(function(doc) {
                setProfileInfo(doc);
            })
        });
}

function setProfileInfo(doc) {
    var nameComponent = document.getElementById("profileName");
    nameComponent.innerHTML = doc.data().name;
    var urlComponent = document.getElementById("profileImage");
    urlComponent.src = doc.data().imageURL;
    var bioComponent = document.getElementById("profileBio");
    bioComponent.innerHTML = doc.data().bio;
}


function loadPosts () {
    db.collection("profile").doc("profileInfo").get()
        .then(function(doc) {
            setProfileInfo(doc);
        })
}

$(document).ready(loadPosts);