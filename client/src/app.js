var GameView = require('./views/game_view');
var Player = require('./game_logic/player');
var Game = require('./game_logic/game');
var Dice = require('./game_logic/dice');

window.onload = function(){
  var player1 = new Player("Player 1");
  var player2 = new Player("Player 2");

  var dice = new Dice(6)
  var game = new Game(player1, player2, dice, 20);

  var gameView = new GameView({ parentEl: document.body, model: game })

  gameView.render();
};
