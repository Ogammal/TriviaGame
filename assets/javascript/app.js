// Declaring the global variables needed
var timer = 5;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var setInt;

// Once the timer is done, stop and clear the timer. Initiate allDone function
function timeUp() {
  clearInterval(setInt);
  for (var i = 0; i < 10; i++) {
    var userAnswer = $("input[name='btn" + i + "']:checked").val();
    if (userAnswer === "true") {
      correct++;
    }
    else if(userAnswer==="false") {
      incorrect++;
    }
    console.log(userAnswer);
  }
  unanswered = 10 - (correct + incorrect);

  $('#timer').empty()
  $('#quiz-area').empty()
  allDone();
  var restart = $('<button id="restart" >Restart</button>');
  $('#quiz-area').append(restart);
  $('#restart').on("click", function() {
    timer = 5;
    init (); 
  });
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


// function that initiates the game
function init() {
  $('#quiz-area').empty()
  // append the game clock to the HTML
  $('#timer').text("You have " + timer + " seconds remaining");
  setInt = setInterval(decrement, 1000);
  // create variable with API URL
  var queryURL = "https://cocktail-trivia-api.herokuapp.com/api/category/entertainment-video-games/difficulty/easy";
  // call api using ajax function 
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
      console.log(response)
      var questions = response;
      // for loop to run through the length of the question bank from the api
      for (var i = 0; i < questions.length; i++) {
        //create and append the rows of questions
        var question = $('<p>' + response[i].text + '<p>')
        $('#quiz-area').append(question);
        // create variable for radio button names
        var radioName = "btn" + i
        // nested for loop to run through the number of radio button choices in the question bank
        for (var j = 0; j < 4; j++) {
        var choices = $('<input id="check" type="radio">').val(response[i].answers[j].correct);
        // add the name attribute to each row of radio buttons and append them to HTML
        choices.attr("name", radioName);
        $('#quiz-area').append(choices);
        // add the corresponding answer next to each radio button
        var choiceText = $('<span>' + response[i].answers[j].text + '</span>')
        $('#quiz-area').append(choiceText);
        }
      }
  })  
};
// click event listener to call on the intitialize function
$('#start').on("click", function() {
  init();
});

