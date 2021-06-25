(function ()
{
  var addButtons = document.getElementsByClassName("add_button");
  var subtractButtons = document.getElementsByClassName("subtract_button");

  /* add onclick events for all add-subtract buttons */
  for (i in addButtons)
  {
    addButtons[i].onclick = function() {addSubtractSettingModifier(this,1,this.value)};
    subtractButtons[i].onclick = function() {addSubtractSettingModifier(this,-1,this.value)};
  }
})();

/* changes the input of the add-subtract settings */
function addSubtractSettingModifier(domObject,modifier,limit)
{
  limit = parseInt(limit);
  var x = parseInt(domObject.parentNode.getElementsByTagName("input")[0].value);
  var condition1 = modifier > 0 && x < limit;
  var condition2 = modifier < 0 && x > limit;
  if (condition1 || condition2)
  {
    x += modifier;
    domObject.parentNode.getElementsByTagName("input")[0].value = x;
    if (typeof addSubtractChange !== "undefined") {addSubtractChange();}
  }
}