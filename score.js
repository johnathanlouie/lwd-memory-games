function counter(arg1, domObj, interval, arg4)
{
  this.default = arg1;
  this.current = arg1;
  this.temporary = 0;
  this.livesAdded = 0;
  this.interval = interval;
  this.calledFn = arg4;
  this.counter = document.getElementById(domObj);
  this.display = function() {this.counter.innerHTML = this.current; this.checkForInterval();};
  this.reset = function() {this.current = this.default; this.livesAdded = 0;};
  this.checkForInterval = function()
  {
    if (this.interval)
    {
      var change = Math.floor(this.current / this.interval) - this.livesAdded;
      if (change > 0) {this.livesAdded += change;}
      this.calledFn(change);
    }
  };
  this.display();
}