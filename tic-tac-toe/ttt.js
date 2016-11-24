$(function () {
  var turn = 0;

  $('td').click (function() {
    if (turn % 2 === 0) {
    $(this).html('X');
    } else {
      $(this).html('O');
    }

    turn++;
  });
});
