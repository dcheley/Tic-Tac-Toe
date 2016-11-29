(function Game() {
  //HTML Elements
  var board = document.getElementById('board');
  var boxes = document.querySelectorAll('li');
  var reset = document.getElementById('reset');
  var displayTurn = document.getElementById('player-turn');
  var alert = document.getElementById('alerts');
  var pOneScore = document.getElementById('player-one-score');
  var pTwoScore = document.getElementById('player-two-score');

  //Variables
  var scenario = { 'player1' : 'x', 'player2' : 'o'};
  var gameBoard = [];
  var pOneScore = 0;
  var pTwoScore = 0;
  var turns;
  var currentScenario;

  //Constructor
  var init = function() {
    turns = 0;

    currentScenario = computeScenario();

    //3x3 board
    gameBoard[0] = new Array(3);
    gameBoard[1] = new Array(3);
    gameBoard[2] = new Array(3);

    for (var i = 0; i < boxes.length; i++) {
      boxes[i].addEventListener('click', clickHandler, false);
      }
      reset.addEventListener('click', resetHandler, false);
  }
  //Track current turn
  var computeScenario = function() {
    return (turns % 2 == 0) ? scenario.player1 : scenario.player2;
  }

  //Bind the dom element to the click callback
  var clickHandler = function() {
    this.removeEventListener('click', clickHandler);

    this.className = currentScenario;
    this.innerHTML = currentScenario;

    var position = this.getAttribute('position').split(',');
    gameBoard[position[0]][position[1]] = computeScenario() == 'x' ? 1 : 0;

    if(checkStatus()) {
      gameWon();
    }

    turns++;
    currentScenario = computeScenario();
    displayTurn.className = currentScenario;
  }
});
