describe "Fondant", ->
  beforeEach ->
    this.addMatchers
      toHaveClass: (expected) ->
        if @actual.hasClass
          @actual.hasClass expected.replace(/^\./, '')
        else
          false

  describe "$.fn.fondant", ->
    it "should instantiate the Fondant editor", ->
      editor = $('<textarea>').fondant()
      expect(editor.data('fondant')).toBeDefined()
      expect(typeof editor.data('fondant')).toMatch(/object/i)
      expect(editor.data('fondant').type).toMatch(/^fondant$/i)

    describe "options", ->
      it "should not create a toolbar if toolbar is set to false", ->
        editor = $('<textarea>').fondant { toolbar: false }
        expect(editor.find('.fondant-toolbar').length).toBe(0)

      it "should set element class prefixes based on prefix option", ->
        editor = $('<textarea>').fondant { prefix: 'icing' }
        expect(editor).toHaveClass('icing-editor')

  describe "A fondant instance", ->
    editor = Fondant = undefined

    beforeEach ->
      editor = $('<textarea class="my-editor is-really-cool">Test 123</textarea>').fondant()
      Fondant = editor.data('fondant')

    describe "internals", ->
      it "should replace a textarea with a div", ->
        expect(editor.prop('tagName')).toMatch(/^div$/i)

      it "should add the 'fondant-editor' class to the editor div", ->
        expect(editor).toHaveClass('fondant-editor')

      it "should carry the classes across to the wrapper div", ->
        expect(editor).toHaveClass('my-editor')
        expect(editor).toHaveClass('is-really-cool')

      it "should insert a toolbar", ->
        expect(editor.find('.fondant-toolbar').length).toBeGreaterThan(0)

      it "should set contenteditable to true", ->
        expect(editor.find('.fondant-editor-content').attr('contenteditable')).toBe('true')

      it "should unset contenteditable", ->
        editor.fondant('makeUneditable')
        expect(editor.attr('contenteditable')).toBe(undefined)

    describe "externals", ->

      it "should get the value of the textarea", ->
        expect(editor.fondant('value')).toBe("Test 123")

      it "should focus the editor", ->
        $('body').append(editor)
        editor.fondant('focus')

        expect($(document.activeElement)).toHaveClass('fondant-editor-content')

        editor.detach()

      it "should destroy itself", ->
        editor.fondant('destroy')
        expect(editor.data('fondant')).toBe(undefined)

    describe "editor actions", ->
      beforeEach ->
        $('body').append(editor)

        this.addMatchers
          toApplyFormatAndMatch: (format, expected, argument) ->
            selection_helper.selectElementText(@actual.find('.fondant-editor-content'))
            @actual.fondant(format, argument)
            console.log("#{format}: #{@actual.fondant('value')}")
            new RegExp(expected).test(@actual.fondant('value'))

      it "should remove formatting", ->
        editor.fondant('value', '<b><strong><em><i>Test 123</i></em></strong></b></a>')
        expect(editor.fondant('value')).toNotMatch(/^Test 123$/)
        expect(editor).toApplyFormatAndMatch('remove', /^Test 123$/)

      it "should insert custom html", ->
        expect(editor).toApplyFormatAndMatch('custom'
        , '<img src="http://placehold.it/350x150">'
        , '<img src="http://placehold.it/350x150">'
        )

      xit "should undo"
      xit "should redo"

      it "should apply bold", ->
        expect(editor).toApplyFormatAndMatch('bold', /^<b>Test 123<\/b>$/i)

      it "should apply italic", ->
        expect(editor).toApplyFormatAndMatch('italic', /^<i>Test 123<\/i>$/i)

      it "should apply paragraph", ->
        expect(editor).toApplyFormatAndMatch('p', /^<p>Test 123<\/p>$/)

      it "should apply h1", ->
        expect(editor).toApplyFormatAndMatch('h1', '<h1>Test 123</h1>')

      it "should apply h2", ->
        expect(editor).toApplyFormatAndMatch('h2', '<h2>Test 123</h2>')

      it "should apply h3", ->
        expect(editor).toApplyFormatAndMatch('h3', '<h3>Test 123</h3>')

      it "should apply h4", ->
        expect(editor).toApplyFormatAndMatch('h4', '<h4>Test 123</h4>')

      it "should apply blockquote", ->
        expect(editor).toApplyFormatAndMatch('blockquote', '<blockquote>Test 123</blockquote>')

      it "should create ordered lists", ->
        expect(editor).toApplyFormatAndMatch('ol', '<ol><li>Test 123</li></ol>')

      it "should create unordered lists", ->
        expect(editor).toApplyFormatAndMatch('ul', '<ul><li>Test 123</li></ul>')

      it "should indent block", ->
        selection_helper.selectElementText(editor.find('.fondant-editor-content'))
        editor.fondant('ul')
        expect(editor).toApplyFormatAndMatch('indent', '<ul><ul><li>Test 123</li></ul></ul>')

      it "should outdent block", -> 
        selection_helper.selectElementText(editor.find('.fondant-editor-content'))
        editor.fondant('ul')
        editor.fondant('indent')
        expect(editor).toApplyFormatAndMatch('outdent', '<ul><li>Test 123</li></ul>')

      it "should link text", ->
        link = 'http://ovenbits.com'
        expect(editor).toApplyFormatAndMatch('link', "<a href=\"#{link}\">Test 123</a>", link)

      it "should unlink text", ->
        selection_helper.selectElementText(editor.find('.fondant-editor-content'))
        editor.fondant('link', 'http://ovenbits.com')
        expect(editor).toApplyFormatAndMatch('unlink', 'Test 123')


      afterEach ->
        editor.detach()

    afterEach ->
      Fondant = null
      editor.fondant('destroy')
      editor.remove()

