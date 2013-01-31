#   # Fondant 0.0.1
#   ## HTML5 WYSIWYG Editor
#
#   Fondant is the icing on the cake for user input.
#
#   (c) 2013 Phillip Ridlen, Oven Bits LLC
#

$ = jQuery

$ ->

  Fondant = (element, options) ->
    this.init 'fondant', element, options

  Fondant.prototype =

    constructor: Fondant

    init: (type, element, options) ->
      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)

      this.textarea = true if this.$element.prop('tagName') == 'textarea'

    getOptions: (options) ->
      options = $.extend {},
        $.fn[this.type].defaults,
        options,
        this.$element.data()

    destroy: ->
      this.$element.removeData(this.type)

    format:
      apply: (command, value) ->
        document.execCommand(command, false, value)
      remove: ->
        this.apply 'removeFormat'
      bold: ->
        this.apply 'bold'
      italic: ->
        this.apply 'italic'
      p: ->
        this.apply 'formatBlock', '<p>'
      h1: ->
        this.apply 'formatBlock', '<h1>'
      h2: ->
        this.apply 'formatBlock', '<h2>'
      h3: ->
        this.apply 'formatBlock', '<h3>'
      h4: ->
        this.apply 'formatBlock', '<h4>'
      blockquote: ->
        this.apply 'formatBlock', '<blockquote>'
      ol: ->
        this.apply 'insertOrderedList'
      ul: ->
        this.apply 'insertUnorderedList'
      indent: ->
        this.apply 'indent'
      outdent: ->
        this.apply 'outdent'
      undo: ->
        this.apply 'undo'
      redo: ->
        this.apply 'redo'
      link: (url) ->
        this.apply 'createLink', url

  $.fn.fondant = ->
    this.each ->
      $this = $(this)
      data = $this.data('fondant')
      options = typeof option == 'object' && option
      if (!data)
        $this.data('fondant', (data = new Fondant(this, options)))
      if (typeof option == 'string')
        data[option]()

  $.fn.fondant.Contstructor = Fondant

  $.fn.fondant.defaults =
    cssPrefix: 'fondant-'

