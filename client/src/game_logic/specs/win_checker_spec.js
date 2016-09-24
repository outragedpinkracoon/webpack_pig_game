var assert = require('assert');
var WinChecker = require('../win_checker');

describe('WinChecker', function(){
  it('should give no winner if scores less than 100', function(){
    var winChecker = new WinChecker();
    var p1 = {score: 75, hasWon:false};
    var p2 = {score: 75, hasWon:false};
    winChecker.checkWin(p1,p2)
    assert.equal( false, p1.hasWon )
    assert.equal( false, p2.hasWon )
  })

  it('should set player 2 as winner if greater than 100', function(){
    var winChecker = new WinChecker();
    var p1 = {score: 75, hasWon:false};
    var p2 = {score: 110, hasWon:false};
    winChecker.checkWin(p1,p2)
    assert.equal( p1.hasWon, false )
    assert.equal( p2.hasWon, true )
  })

  it('should go into last turn if player 1 is greater than 100', function(){
    var winChecker = new WinChecker();
    var p1 = {score: 120, hasWon:false};
    var p2 = {score: 90, hasWon:false};
    winChecker.checkWin(p1,p2)
    assert.equal( p1.hasWon, false )
    assert.equal( p2.hasWon, false )
    assert.equal( winChecker.onLastTurn, true)
  })

  it('should set the larger of the scores as winner on last turn', function(){
    var winChecker = new WinChecker();
    var p1 = {score: 120, hasWon:false};
    var p2 = {score: 140, hasWon:false};
    winChecker.lastTurnWinner(p1,p2)
    assert.equal( p1.hasWon, false )
    assert.equal( p2.hasWon, true )
  })
})
