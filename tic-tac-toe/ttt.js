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

  //Check for win
  var checkStatus = function() {
    var used_boxes = 0;

    for(var rows = 0; rows < board.length; rows++ ) {
      var row_total = 0;
      var column_total = 0;

      for(var columns = 0; columns < board[rows].length; columns++) {
        row_total += gameBoard[rows][columns];
        column_total += gameBoard[columns][rows];

        if(typeof gameBoard[rows][columns] !== "undefined") {
          used_boxes++;
        }
      }

      //Win condition for diagonal scenarios [0,4,8], [2,4,6]
      var diagonal_tl_br == gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2]; // diagonal top left to bottom right
      var diagonal_tr_bl== gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0]; // diagonal top right to bottom left

      if(diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
        return true;
      }

      //Win condition for row [0,1,2], [3,4,5], [6,7,8]
      //Win condition for column [0,3,6], [1,4,7], [2,5,8]
      //Total must be 0 or 3 for win to occur, X are worth 1 point and O are worth 0 points
      if(row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
        return true;
          }

      //Draw: if all boxes are full
      if(used_boxes == 9) {
        gameDraw();
      }
    }
  }
  var gameWon = function() {
    clearEvents();

    //show game won alerts
    alerts.className = 'player-' + computeScenario() + '-win';

    //update player score
    switch(computeScenario()) {
      case 'x':
      pOneScore.innerHTML = ++pOneScore;
      break;
      case 'o':
      pTwoScore.innerHTML = ++pTwoScore;
    }
  }
  //show game draw alert
  var gameDraw = function() {
    alerts.className = 'draw';
    clearEvents();
  }

  //Stop user from clicking empty boxes after game is over
  var clearEvents = function() {
    for(var i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener('click', clickHandler);
    }
  }
    }
  }
});
