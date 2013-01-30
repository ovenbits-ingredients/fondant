saveAllEditableFields = ->
  $('[contenteditable="true"]').each ->
    $field = $(this)
    $field.htmlClean()

    $.ajax
      type: "POST"
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      url: '/update/' + $field.data('bind')
      data: $field.html()

toggleEditor = ->
  if $('body').hasClass('editing')
    saveAllEditableFields()
    $('.editable').attr('contenteditable','false')
    $('body').removeClass('editing')
    $('.actions a.power').addClass('btn-success').removeClass('btn-danger')
    $('.actions a.power i').addClass('icon-pencil').removeClass('icon-remove')

  else
    $('.editable').attr('contenteditable','true')
    $('body').addClass('editing')
    $('.actions a.power').addClass('btn-danger').removeClass('btn-success')
    $('.actions a.power i').addClass('icon-remove').removeClass('icon-pencil')

executor = (cmd, value) ->
  if value instanceof Function
    value = value()
  document.execCommand(cmd, false, value)

$ ->
  $.fn.fondle = (cmd, value) ->
    $(this).on 'click', (event) ->
      event.preventDefault()
      executor(cmd, value)

$ ->
  $('.actions a.save').on 'click', (event) ->
    event.preventDefault()
    saveAllEditableFields()
    toggleEditor()

  $('.actions a.power').on 'click', (event) ->
    event.preventDefault()
    toggleEditor()

  # Text formatting
  $('.toolbar a.bold').fondle 'bold'
  $('.toolbar a.italic').fondle 'italic'

  # Block Styles
  $('.toolbar a.normal').fondle 'formatBlock', 'p'
  $('.toolbar a.h1').fondle 'formatBlock', 'h1'
  $('.toolbar a.h2').fondle 'formatBlock', 'h2'
  $('.toolbar a.h3').fondle 'formatBlock', 'h3'
  $('.toolbar a.h4').fondle 'formatBlock', 'h4'
  $('.toolbar a.quote').fondle 'formatBlock', 'blockquote'

  # Lists
  $('.toolbar a.ol').fondle 'insertOrderedList'
  $('.toolbar a.ul').fondle 'insertUnorderedList'
  $('.toolbar a.indent').fondle 'indent'
  $('.toolbar a.outdent').fondle 'outdent'

  # Undo/Redo
  $('.toolbar a.undo').fondle 'undo'
  $('.toolbar a.redo').fondle 'redo'

  # Links
  $('.toolbar a.link').fondle 'createLink', ->
    prompt('Link URL:')

  # Insert custom html
  $('.toolbar a.code').fondle 'insertHTML', ->
    prompt('Enter your custom html:')

  # Clear Formatting (pasting from Word, etc)
  $('.toolbar a.clear-formatting').fondle 'removeFormat'
