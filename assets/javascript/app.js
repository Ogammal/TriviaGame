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
  $('#quiz-area').empty()
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

// reduce the count down timer every second and then call timeUp function when timer hits 0
function decrement() {
  timer--
  $('#timer').text("You have " + timer + " seconds remaining");
  if (timer === 0) {
    timeUp ();
  }
}


// click event that triggers
$('#start').on("click", function() {
  $('#quiz-area').empty()
  $('#timer').text("You have " + timer + " seconds remaining");
  setInt = setInterval(decrement, 1000);
  
  var queryURL = "https://cocktail-trivia-api.herokuapp.com/api/category/entertainment-video-games/difficulty/easy";
    
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
      console.log(response)
      var questions = response;
      for (var i = 0; i < questions.length; i++) {
        var question = $('<p>' + response[i].text + '<p>')
        $('#quiz-area').append(question);
        var name = "btn" + i
        for (var j = 0; j < 4; j++) {
        var choices = $('<input type="radio">').val(response[i].answers[j].text);
        choices.attr("name", name);
        $('#quiz-area').append(choices);
        var choiceText = $('<span>' + response[i].answers[j].text + '</span>')
        $('#quiz-area').append(choiceText);
        console.log(choices.val())
        }
      }
      // if ()
  })  
});