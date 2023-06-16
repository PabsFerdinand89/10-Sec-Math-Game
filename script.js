$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        if (score > highScore) {
          highScore = score;
          $('#highScore').text(highScore);
          alert("New High Score!");
          localStorage.setItem(highScore, '#highScore.text');
        };
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
  

  var questionGenerator = function () {
    var question = {};
    var getRandomNumberA = Math.floor(Math.random() * 10) + 1;
    var getRandomNumberB = Math.floor(Math.random() * 10) + 1;
    
    //get random operator
    var opArray = ['+', '-', '*', '/'];
    var getRandomItem = function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      var item = arr[randomIndex];
        return item;
      };
    var randomOp = getRandomItem(opArray);
    
    question.answer = eval(getRandomNumberA + randomOp + getRandomNumberB);
    question.equation = String(getRandomNumberA) + String(randomOp) + String(getRandomNumberB);

    if (randomOp === '-') {
      question.answer = eval((getRandomNumberA + getRandomNumberB) - getRandomNumberB);
      question.equation = String(getRandomNumberA + getRandomNumberB) + '-' + String(getRandomNumberB)
    }
    
    if (randomOp === '/') {
      question.answer = eval((getRandomNumberA * getRandomNumberB) / getRandomNumberB);
      question.equation = String(getRandomNumberA * getRandomNumberB) + '/' + String(getRandomNumberB);
    }
 
    return question;
  };
  

  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };

  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  renderNewQuestion();

});

