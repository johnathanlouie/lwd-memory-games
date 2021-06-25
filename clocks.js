function stopwatch(domObject, format)
{
  this.container = document.getElementById(domObject);
  this.total = 0;
  this.format = format;

  this.display = function()
  {
    this.days = Math.floor(this.total / 86400);
    this.hours = Math.floor(this.total / 3600);
    this.minutes = Math.floor(this.total / 60);
    this.seconds = Math.floor(this.total % 60);
    this.sec = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
    this.container.innerHTML = this.minutes + ":" + this.sec;
  };
  this.run = function() {this.total++; this.display();};
  this.referToObject = function(fnMethod)
  {
    var objSelf = this;
    return (function() {return (fnMethod.apply(objSelf, arguments));});
  };
  this.check = function(runCondition)
  {
    if (runCondition) {this.interval = setInterval(this.referToObject(function() {this.run();}), 1000);}
    else {clearInterval(this.interval);}
  };
  this.reset = function() {clearInterval(this.interval); this.total = 0;};

  this.display();
}

function timer(domObj, limit)
{
  this.domObj = document.getElementById(domObj);
  this.limit = limit;
  this.current = limit;
  this.specialMoments = [];

  for (i in arguments)
  {
    if (i >= 2) {this.specialMoments.unshift(arguments[i]);}
  }

  this.display = function()
  {
    this.days = Math.floor(this.current / 86400);
    this.hours = Math.floor(this.current / 3600);
    this.minutes = Math.floor(this.current / 60);
    this.seconds = Math.floor(this.current % 60);
    this.sec = (this.seconds < 10) ? "0" + this.seconds : this.seconds;
    this.domObj.innerHTML = this.minutes + ":" + this.sec;
  };
  this.run = function()
  {
    if (this.current > 0) {this.current--; this.display();}
    else {clearInterval(this.interval);}
  };
  this.referToObject = function(fnMethod)
  {
    var objSelf = this;
    return (function() {return (fnMethod.apply(objSelf, arguments));});
  };
  this.check = function(runCondition)
  {
    if (runCondition) {this.interval = setInterval(this.referToObject(function() {this.run();}), 1000);}
    else {clearInterval(this.interval);}
  };
  this.reset = function() {clearInterval(this.interval); this.total = 0;};

  this.display();
}