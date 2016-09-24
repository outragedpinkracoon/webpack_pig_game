var WinChecker = function(winningScore){
  this.onLastTurn = false;
  this.winningScore = winningScore || 100;
}

WinChecker.prototype = {
  checkWin:function(player1, player2){
    if(this.onLastTurn){
      this.lastTurnWinner(player1, player2);
      return
    };

    if(player2.score >= this.winningScore){
      player2.hasWon = true
      return
    }else if(player1.score >= this.winningScore){
      this.onLastTurn = true
    }
  },

  lastTurnWinner:function(player1, player2){
    if(player1.score == player2.score){
      player1.hasWon = true;
      player2.hasWon = true;
      return;
    }
    if(player1.score > player2.score){
      player1.hasWon = true;
    }else{
      player2.hasWon = true;
    }

  }
}


module.exports = WinChecker;
