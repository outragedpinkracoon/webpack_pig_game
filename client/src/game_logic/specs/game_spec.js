var assert = require('chai').assert;
var Player = require('../player');
var Game = require('../game')
var Dice = require('../dice')

describe('game', function(){
  it('should be created with two players and a dice', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var dice = new Dice(6)
    var game = new Game(p1, p2, dice);
    assert.equal(game.player1, p1);
    assert.equal(game.player2, p2);
    assert.equal(game.dice, dice);
  })

  it('should have a null current turn to start', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var dice = new Dice(6)
    var game = new Game(p1, p2, dice);
    assert.equal(game.currentTurn, null);
  })

  it('should have no turn in play', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var dice = new Dice(6);
    var game = new Game(p1, p2, dice);
    assert.equal(game.turnInPlay(), undefined);
  })

  it('should give us the first turn for player 1', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var game = new Game(p1, p2);
    game.nextTurn();
    var turn = game.currentTurn;
    assert.equal(turn.player, p1);
  })

  it('should give the next player', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var game = new Game(p1, p2);
    game.nextTurn();
    assert.equal(game.nextPlayer(), p2);
  })

  it('should give the next player', function(){
    var p1 = new Player('Valerie');
    var p2 = new Player('Jay');
    var game = new Game(p1, p2);
    game.nextTurn();
    assert.equal(game.nextPlayer(), p2);
  })
});
