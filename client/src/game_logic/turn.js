var Turn = function(player, dice){
  this.player = player;
  this.dice = dice;
  this.score = 0;
  this.finished = false;
}

Turn.prototype = {
  roll: function(){
    console.log('turn rolling', this.score)

    if(this.finished) return;

    var result1 = this.dice.roll()
    var result2 = this.dice.roll()

    turnInfo = this.checkRolls(result1, result2);

    if(turnInfo.finished) this.finished = true;
    this.score += turnInfo.score;

    console.log('turn score', this.score)

    return([result1, result2])
  },

  checkRolls: function(result1, result2){
    var score = 0;
    if(!this.hasAOne(result1, result2)) {
      score = result1 + result2    
    }
    
    if(this.bothEqualOne(result1, result2)){
      score = 25;
    }

    var turnFinished = score == 0;
    return {
      score: score,
      finished: turnFinished
    }
  },

  //TODO this is crude
  hasAOne: function(firstNumber, secondNumber){
    return (firstNumber === 1 || secondNumber === 1)
  },

  bothEqualOne: function(firstNumber, secondNumber){
    return firstNumber === 1 && secondNumber === 1
  },

  exit: function(){
    this.finished = true;
    this.player.score += this.score
    return this.score;
  }

}

module.exports = Turn;
