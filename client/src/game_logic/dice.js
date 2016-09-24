var Dice = function(sides){
  this.sides = sides;
}

Dice.prototype = {
  roll: function(){
    return Math.ceil(Math.random() * this.sides);
  }
}

module.exports = Dice