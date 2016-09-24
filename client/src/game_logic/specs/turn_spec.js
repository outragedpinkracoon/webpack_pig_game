var assert = require('assert');
var Player = require('../player');
var Turn = require('../turn');
var Dice = require('../dice');


describe('turn', function(){
  it('should have a player', function(){
    var p1 = new Player('Valerie');
    var turn = new Turn(p1);
    assert.equal( turn.player, p1 );
  });
  it('should have a score init 0', function(){
    var p1 = new Player('Valerie');
    var turn = new Turn(p1);
    assert.equal( turn.score, 0 );
  });
  it('should have a dice', function(){
    var p1 = new Player('Valerie');
    var d1 = new Dice(6);
    var turn = new Turn(p1, d1);
    assert.equal( turn.dice, d1 );
  });

  it('should not be finished', function(){
    var p1 = new Player('Valerie');
    var turn = new Turn(p1);
    assert.equal( turn.finished, false );
  });

  it('should save score as sum of rolls', function(){
    var p1 = new Player('Valerie');
    var stubDice = { roll: function(){return 3;} }
    var turn = new Turn(p1, stubDice);
    turn.roll();
    assert.equal(turn.score, 6);
  });

  it('should add 25 if both equal 1', function(){
    var p1 = new Player('Valerie');
    var stubDice = { roll: function(){return 1;} }
    var turn = new Turn(p1, stubDice);
    turn.roll();
    assert.equal(turn.score, 25);
  });


  it('should set finished true and reset score to 0 if single 1', function(){
    var p1 = new Player('Valerie');
    var stubDice = {
      count: 0,
      roll: function(){
        this.count++;
        return this.count;
      }
    }
    var turn = new Turn(p1, stubDice);
    turn.roll();
    assert.equal(turn.finished,true);
    assert.equal(turn.score, 0);
  });

  it('should be able to exit returning score and adding to player', function(){
    var p1 = new Player('Valerie');
    var stubDice = { roll: function(){return 1;} }
    var turn = new Turn(p1, stubDice);
    assert.equal(turn.exit(), 0);
    assert.equal(turn.player.score, turn.score)
    assert.equal(turn.finished, true);

  })

});
