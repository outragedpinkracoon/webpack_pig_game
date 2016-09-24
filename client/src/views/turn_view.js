var TurnView  = function(options){
  this.parentEl = options.parentEl;
  this.model = options.model;
  this.el = document.createElement('div');
  this.parentEl.appendChild(this.el)
  this.diceRoll = [];
}

TurnView.prototype = {
  updateTurn: function(turn){
    this.model = turn;
    this.diceRoll = [];
    this.render();
  },
  render: function(){
    this.el.innerHTML = "";

    var currentPlayerEl = document.createElement('p');
    currentPlayerEl.innerHTML = "Current Player: " + this.model.player.name;
    this.el.appendChild(currentPlayerEl);

    var currentScore = document.createElement('p');
    currentScore.innerHTML = this.model.score;
    this.el.appendChild(currentScore);

    var diceRollEl = document.createElement('div')
    diceRollEl.innerHTML = "Dice: " + this.diceRoll.join(",");
    this.el.appendChild(diceRollEl);

    if(!this.model.finished){
      var rollButton = document.createElement('button');
      rollButton.innerText = "Roll";
      rollButton.onclick = function(){
        this.diceRoll = this.model.roll();
        this.render();
      }.bind(this);
      this.el.appendChild(rollButton);
    }
  }
}

module.exports = TurnView;
