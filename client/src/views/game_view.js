var PlayerView = require('./player_view');
var TurnView = require('./turn_view');

var GameView  = function(options){
  this.parentEl = options.parentEl;
  this.model = options.model;
  this.el = document.createElement('div');
  this.parentEl.appendChild(this.el)
  this.player1View = new PlayerView({ parentEl: document.body, model: this.model.player1 });
  this.player2View = new PlayerView({ parentEl: document.body, model: this.model.player2 });
  this.turnView = new TurnView({ parentEl: document.body, model: this.model.currentTurn })
}

GameView.prototype = {
  render: function(){
    this.player1View.render();
    this.player2View.render();


    var nextTurnButton = document.createElement('button');
    nextTurnButton.innerText = "Next Turn";

    nextTurnButton.onclick = function(){
      if(this.model.currentTurn){
        this.model.completeTurn();
      }
      this.player1View.render();
      this.player2View.render();
      this.model.nextTurn();
      this.turnView.updateTurn(this.model.currentTurn);
    }.bind(this);

    if(!this.model.gameWon()){
      this.el.appendChild(nextTurnButton);
    }
  }
}

module.exports = GameView;
