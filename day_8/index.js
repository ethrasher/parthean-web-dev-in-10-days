var firebaseConfig = {
    apiKey: "AIzaSyArJY45JblOOyWe4JeWnui2e_364Wab-YQ",
    authDomain: "todolist-79748.firebaseapp.com",
    databaseURL: "https://todolist-79748.firebaseio.com",
    projectId: "todolist-79748",
    storageBucket: "todolist-79748.appspot.com",
    messagingSenderId: "991183887865",
    appId: "1:991183887865:web:10a6686ff1f8097b573128",
    measurementId: "G-G2Q915CWF9"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

$("#form1").submit(function(e) {
  e.preventDefault();

  var todo_input = document.getElementById("todo-input");
  var todo_text = todo_input.value;

  saveItemToDatabase(todo_text);

  todo_input.value = "";
});

function saveItemToDatabase(todo_text){
    // Save element to database
    doc = db.collection("notes").add({
       noteText: todo_text
    })
    .then(function(docRef) {
        docRef.get().then(function(doc) {
           addNewItem(doc);
        })
    });
}

function addNewItem(doc) {
    // Create new todo div to store all todo content
    var todo_card = document.createElement("div");
    todo_card.classList.add("todo_card");

    // Put the todo item in a p
    var todo_text_elem = document.createElement("p");
    todo_text_elem.innerHTML = doc.data().noteText;

    // Construct th entire element
    todo_card.appendChild(todo_text_elem);

    // Add it to the DOM
    document.getElementById("container").appendChild(todo_card);

    var todo_card_id = doc.id
    todo_card.id = todo_card_id;
    // Add a click listener to the todo card
    todo_card.addEventListener("click", function () {
        // Remove Element from the DOM
        document.getElementById(todo_card_id).remove()
        //Delete from Database
        db.collection("notes").doc(doc.id).delete();
    })
}

function loadNotes() {
    db.collection("notes").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNewItem(doc);
        })
    })
}

$(document).ready(function() {
    loadNotes()
});
