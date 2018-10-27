// Declaring the global variables needed
var timer = 60;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var setInt;

// Once the timer is done, stop and clear the timer. Initiate allDone function
function timeUp() {
  clearInterval(setInt);
  $('#timer').empty()
  allDone();
};

// function to append the resulting scores from the game to the HTML
function allDone() {
  $('#quiz-area').text("Your time is up!");
  var correctAnswer = $('<div>Correct: ' + correct + '</div>')
  $('#quiz-area').append(correctAnswer);
  var incorrectAnswer = $('<div>Incorrect: ' + incorrect + '</div>')
  $('#quiz-area').append(incorrectAnswer);
  var totalUnanswered = $('<div>Unanswered: ' + unanswered + '</div>')
  $('#quiz-area').append(totalUnanswered);
};

//
function decrement() {
  timer--
  $('#timer').text("You have " + timer + " seconds remaining");
  if (timer === 0) {
    timeUp ();
  }
}

$('#start').on("click", function() {
  $('#quiz-area').empty()
  $('#timer').text("You have " + timer + " seconds remaining");
  setInt = setInterval(decrement, 1000);
  var queryURL = "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiplehttps://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple";
    
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
      console.log(response)
      var questions = response.results;
      
  })
});