(function() {
  var SelectionHelper;

  SelectionHelper = (function() {

    function SelectionHelper() {}

    SelectionHelper.prototype.selectElementText = function(element) {
      var range, selection;
      element = element.get(0);
      if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        return range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        return selection.addRange(range);
      }
    };

    return SelectionHelper;

  })();

  this.selection_helper = new SelectionHelper();

}).call(this);
