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

        console.log $(document.activeElement)
        expect($(document.activeElement)).toHaveClass('fondant-editor-content')

        editor.detach()

      it "should destroy itself", ->
        editor.fondant('destroy')
        expect(editor.data('fondant')).toBe(undefined)


