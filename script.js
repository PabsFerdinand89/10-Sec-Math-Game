$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#timeLeft').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#userScore').text(score);
  };
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };

  
  var getRandomNumberA = Math.floor(Math.random() * 10) + 1;
  var getRandomNumberB = Math.floor(Math.random() * 10) + 1;

  var opArray = ['+', '-', '*', '/'];
  var getRandomItem = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var item = arr[randomIndex];
      return item;
    };
  var randomOp = getRandomItem(opArray);

  var getRandomQuestion = function () {
    question = {};
    question = getRandomNumberA + randomOp + getRandomNumberB;
    return question;
    };
  $('#equation').text(getRandomQuestion);
  var answer = eval(getRandomNumberA + randomOp + getRandomNumberB);
  
  var getNewQuestion = function () {
    currentQuestion = getRandomQuestion();
  }


  var checkAnswer = function (userAnswerInput, answer) {
    if (userAnswerInput === answer) {
      getNewQuestion();
      $('#userAnswerInput').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#userAnswerInput').on('keyup', function () {
    startGame();
    checkAnswer(($(this).val()), currentQuestion.answer);
  });
  
  getNewQuestion();
});


