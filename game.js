//Initialisation
var level = 0;
var start = false;
var highest = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//key click
$(document).keydown(function() {
  if (start === false) {
    $("#UserLevel").text("0");
    start = true;
    nextSequence();
  }
});
//user clicks
$(".btn").click(function() {
  if (level !== 0) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    Animation(userChosenColor);
    $(this).addClass("pressed");
    setTimeout(function() {
      $("." + userChosenColor).removeClass("pressed");
    }, 70);

    checkAnswer(userClickedPattern.length - 1);
  }

});
//functions
function nextSequence() {
  userClickedPattern = [];
  $("#UserLevel").text(++level);
  if (level > highest) {
    highest = level;
    $("#HighestLevel").text(highest);
  }
  $("h1").text(" 🪀 Simon Game 🪀 ");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  Animation(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100);
  $("." + randomChosenColor).fadeIn(100);
}

function Animation(selectedColor) {
  var randomAudio = new Audio("sounds/" + selectedColor + ".mp3");
  randomAudio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").text(" ❌ Oops you went wrong!!! Press Any Key to restart ❌ ");
    Animation("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 2000);
    level = 0;
    gamePattern = [];
    start = false;
  }

}
