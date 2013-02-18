class SelectionHelper
  selectElementText: (element) ->
    element = element.get(0)
    if (document.body.createTextRange)
      range = document.body.createTextRange()
      range.moveToElementText(element)
      range.select()
    else if (window.getSelection)
      selection = window.getSelection()
      range = document.createRange()
      range.selectNodeContents(element)
      selection.removeAllRanges()
      selection.addRange(range)


@selection_helper = new SelectionHelper()
