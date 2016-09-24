/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(1);
	var Player = __webpack_require__(4);
	var Game = __webpack_require__(5);
	var Dice = __webpack_require__(8);
	
	window.onload = function(){
	  var player1 = new Player("Player 1");
	  var player2 = new Player("Player 2");
	
	  var dice = new Dice(6)
	  var game = new Game(player1, player2, dice, 20);
	
	  var gameView = new GameView({ parentEl: document.body, model: game })
	
	  gameView.render();
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var PlayerView = __webpack_require__(2);
	var TurnView = __webpack_require__(3);
	
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
	
	    this.el.appendChild(nextTurnButton);
	  }
	}
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var PlayerView  = function(options){
	  this.parentEl = options.parentEl;
	  this.model = options.model;
	  this.el = document.createElement('div');
	  this.parentEl.appendChild(this.el)
	}
	
	PlayerView.prototype = {
	  render: function(){
	    this.el.innerHTML = "";
	    var name = document.createElement('p');
	    var score = document.createElement('p');
	    name.innerHTML = this.model.name;
	    score.innerHTML = this.model.score;
	    this.el.appendChild(name);
	    this.el.appendChild(score);
	  }
	}
	
	module.exports = PlayerView;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	var Player = function(name){
	  this.name = name;
	  this.score = 0;
	  this.hasWon = false;
	}
	
	module.exports = Player;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Turn = __webpack_require__(6)
	var WinChecker = __webpack_require__(7)
	
	var Game = function(player1, player2, dice, target){
	  this.player1 = player1;
	  this.player2 = player2;
	  this.dice = dice;
	  this.currentTurn = null;
	  this.lastTurn = false;
	  this.winChecker = new WinChecker(target);
	}
	
	Game.prototype = {
	  turnInPlay: function(){
	    return this.currentTurn && !this.currentTurn.finished;
	  },
	  nextTurn: function(){
	    if(this.turnInPlay() || this.gameWon()) return;
	    this.currentTurn = new Turn(this.nextPlayer(), this.dice);
	  },
	  roll: function(){
	    return this.currentTurn.roll();
	  },
	  completeTurn:function(){
	    if(this.gameWon()) return;
	    this.currentTurn.exit()
	    this.winChecker.checkWin(this.player1, this.player2)
	  },
	  gameWon:function(){
	    return this.player1.hasWon || this.player2.hasWon
	  },
	
	  winningPlayer: function(){
	    if(!this.gameWon) return false;
	    if(this.player1.hasWon) {
	      return this.player1
	    }
	    return this.player2
	  },
	
	  //TODO, this is crude needs fixed
	  nextPlayer: function(){
	    if(!this.currentTurn) return this.player1;
	    if(this.currentTurn.player === this.player1) return this.player2;
	    
	    return this.player1;
	  }
	}
	
	module.exports = Game;


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Dice = function(sides){
	  this.sides = sides;
	}
	
	Dice.prototype = {
	  roll: function(){
	    return Math.ceil(Math.random() * this.sides);
	  }
	}
	
	module.exports = Dice

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map