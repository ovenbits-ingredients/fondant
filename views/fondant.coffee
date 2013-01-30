saveAllEditableFields = ->
  $('[contenteditable="true"]').each ->
    $field = $(this)
    $field.htmlClean()

    $.ajax
      type: "POST"
      url: '/update/' + $field.data('bind')
      data: $field.html()

$ ->
  $('.actions a.save').on 'click', (event) ->
    event.preventDefault()
    saveAllEditableFields()

  $('.actions a.cancel').on 'click', (event) ->
    event.preventDefault()

    if $('body').hasClass('editing')
      $('.editable').attr('contenteditable','false')
      $('body').removeClass('editing')
      saveAllEditableFields()

    else
      $('.editable').attr('contenteditable','true')
      $('body').addClass('editing')


  $('.toolbar a.bold').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('bold')

  $('.toolbar a.italic').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('italic')

  $('.toolbar a.ol').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('insertOrderedList')

  $('.toolbar a.ul').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('insertUnorderedList')

  $('.toolbar a.indent').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('indent')

  $('.toolbar a.indent').on 'click', (event) ->
    event.preventDefault()
    document.execCommand('outdent')
