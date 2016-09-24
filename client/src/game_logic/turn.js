var Turn = function(player, dice){
  this.player = player;
  this.dice = dice;
  this.score = 0;
  this.finished = false;
}

Turn.prototype = {
  //Holy shit refactor me
  roll: function(){
    console.log('turn rolling', this.score)

    if(this.finished) return false;

    var result1 = this.dice.roll()
    var result2 = this.dice.roll()

    if(this.hasAOne(result1, result2)){
      if(this.bothEqualOne(result1, result2)){
        this.score += 25
      }else{
        this.score = 0;
        this.finished = true;
      }
    } else{
      console.log('turn score', this.score)
      this.score += result1 + result2
    }
    return([result1, result2])
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
