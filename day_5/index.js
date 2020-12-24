$("#form_id").submit(function(e) {
    e.preventDefault();
    var text_form = document.getElementById('link_input');
    var text_input = $(text_form).val();
    removeWord(text_input);
    text_form.value="";
});

function removeWord(text_input) {
    console.log("here");
    console.log(text_input);
    var container = document.getElementById("container");
    var children = $(container).children();
    for (var child of children) {
        var childText = $(child).text();
        console.log(childText);
        if (childText === text_input) {
            $(child).remove();
            break;
        }
    }
};

setInterval(addWord, 2000);

function addWord() {
    // get the word
    var word = randomWordList[Math.floor(Math.random() * randomWordList.length)];

    //make the html elements
    var wordBox = document.createElement("span");
    wordBox.className = "wordBox";
    $(wordBox).text(word);

    // set the random positions
    var wbDimensions = wordBox.getBoundingClientRect()
    var fDimensions = document.getElementById("form_id").getBoundingClientRect();
    var minX = 0;
    var maxX = screen.width - wbDimensions.width - 50;
    var minY = fDimensions.bottom;
    var maxY = screen.height*6/10 - wbDimensions.height;
    var posx = (Math.floor(Math.random() * (maxX - minX))).toFixed();
    var posy = (Math.floor(Math.random() * (maxY - minY))).toFixed();
    wordBox.style.position = "absolute";
    wordBox.style.left = posx+'px';
    wordBox.style.top = posy+"px";
    document.getElementById("container").appendChild(wordBox);
}


var randomWordList = [
  "import",
  "dump",
  "factory",
  "cell phone",
  "brand",
  "eagle",
  "leadership",
  "cycle",
  "happen",
  "childish",
  "fair",
  "divide",
  "forecast",
  "college",
  "exaggerate",
  "graduate",
  "rhythm",
  "moment",
  "heart",
  "stunning",
]