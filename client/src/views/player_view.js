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
