(function() {

  describe("Fondant", function() {
    beforeEach(function() {
      return this.addMatchers({
        toHaveClass: function(expected) {
          if (this.actual.hasClass) {
            return this.actual.hasClass(expected.replace(/^\./, ''));
          } else {
            return false;
          }
        }
      });
    });
    describe("$.fn.fondant", function() {
      it("should instantiate the Fondant editor", function() {
        var editor;
        editor = $('<textarea>').fondant();
        expect(editor.data('fondant')).toBeDefined();
        expect(typeof editor.data('fondant')).toMatch(/object/i);
        return expect(editor.data('fondant').type).toMatch(/^fondant$/i);
      });
      return describe("options", function() {
        it("should not create a toolbar if toolbar is set to false", function() {
          var editor;
          editor = $('<textarea>').fondant({
            toolbar: false
          });
          return expect(editor.find('.fondant-toolbar').length).toBe(0);
        });
        it("should use a custom toolbar from a string", function() {
          var editor;
          editor = $('<textarea>').fondant({
            toolbar: "<div><div id=\"custom-toolbar\"></div></div>"
          });
          return expect(editor.children().first().html()).toEqual("<div id=\"custom-toolbar\"></div>");
        });
        it("should use a custom toolbar from a function", function() {
          var editor, toolbar, toolbarBuilder;
          toolbarBuilder = function() {
            var toolbar_id;
            toolbar_id = 'custom-toolbar';
            return "<div class=\"" + (this.toolbarClass()) + "\"><div id=\"" + toolbar_id + "\"></div></div>";
          };
          editor = $('<textarea>').fondant({
            toolbar: toolbarBuilder
          });
          toolbar = editor.children().first();
          expect(toolbar).toHaveClass('fondant-toolbar');
          return expect(toolbar.html()).toEqual("<div id=\"custom-toolbar\"></div>");
        });
        return it("should set element class prefixes based on prefix option", function() {
          var editor;
          editor = $('<textarea>').fondant({
            prefix: 'icing'
          });
          return expect(editor).toHaveClass('icing-editor');
        });
      });
    });
    return describe("A fondant instance", function() {
      var Fondant, editor;
      editor = Fondant = void 0;
      beforeEach(function() {
        editor = $('<textarea class="my-editor is-really-cool">Test 123</textarea>').fondant();
        return Fondant = editor.data('fondant');
      });
      describe("internals", function() {
        it("should replace a textarea with a div", function() {
          return expect(editor.prop('tagName')).toMatch(/^div$/i);
        });
        it("should add the 'fondant-editor' class to the editor div", function() {
          return expect(editor).toHaveClass('fondant-editor');
        });
        it("should carry the classes across to the wrapper div", function() {
          expect(editor).toHaveClass('my-editor');
          return expect(editor).toHaveClass('is-really-cool');
        });
        it("should insert a toolbar", function() {
          return expect(editor.find('.fondant-toolbar').length).toBeGreaterThan(0);
        });
        it("should set contenteditable to true", function() {
          return expect(editor.find('.fondant-editor-content').attr('contenteditable')).toBe('true');
        });
        return it("should unset contenteditable", function() {
          editor.fondant('makeUneditable');
          return expect(editor.attr('contenteditable')).toBe(void 0);
        });
      });
      describe("externals", function() {
        it("should get the value of the textarea", function() {
          return expect(editor.fondant('value')).toBe("Test 123");
        });
        it("should focus the editor", function() {
          $('body').append(editor);
          editor.fondant('focus');
          expect($(document.activeElement)).toHaveClass('fondant-editor-content');
          return editor.detach();
        });
        return it("should destroy itself", function() {
          editor.fondant('destroy');
          return expect(editor.data('fondant')).toBe(void 0);
        });
      });
      describe("editor actions", function() {
        beforeEach(function() {
          $('body').append(editor);
          return this.addMatchers({
            toApplyFormatAndMatch: function(format, expected, argument) {
              selection_helper.selectElementText(this.actual.find('.fondant-editor-content'));
              this.actual.fondant(format, argument);
              console.log("" + format + ": " + (this.actual.fondant('value')));
              return new RegExp(expected).test(this.actual.fondant('value'));
            }
          });
        });
        it("should remove formatting", function() {
          editor.fondant('value', '<b><strong><em><i>Test 123</i></em></strong></b></a>');
          expect(editor.fondant('value')).toNotMatch(/^Test 123$/);
          return expect(editor).toApplyFormatAndMatch('remove', /^Test 123$/);
        });
        it("should insert custom html", function() {
          return expect(editor).toApplyFormatAndMatch('custom', '<img src="http://placehold.it/350x150">', '<img src="http://placehold.it/350x150">');
        });
        xit("should undo");
        xit("should redo");
        it("should apply bold", function() {
          return expect(editor).toApplyFormatAndMatch('bold', /^<b>Test 123<\/b>$/i);
        });
        it("should apply italic", function() {
          return expect(editor).toApplyFormatAndMatch('italic', /^<i>Test 123<\/i>$/i);
        });
        it("should apply paragraph", function() {
          return expect(editor).toApplyFormatAndMatch('p', /^<p>Test 123<\/p>$/);
        });
        it("should apply h1", function() {
          return expect(editor).toApplyFormatAndMatch('h1', '<h1>Test 123</h1>');
        });
        it("should apply h2", function() {
          return expect(editor).toApplyFormatAndMatch('h2', '<h2>Test 123</h2>');
        });
        it("should apply h3", function() {
          return expect(editor).toApplyFormatAndMatch('h3', '<h3>Test 123</h3>');
        });
        it("should apply h4", function() {
          return expect(editor).toApplyFormatAndMatch('h4', '<h4>Test 123</h4>');
        });
        it("should apply blockquote", function() {
          return expect(editor).toApplyFormatAndMatch('blockquote', '<blockquote>Test 123</blockquote>');
        });
        it("should create ordered lists", function() {
          return expect(editor).toApplyFormatAndMatch('ol', '<ol><li>Test 123</li></ol>');
        });
        it("should create unordered lists", function() {
          return expect(editor).toApplyFormatAndMatch('ul', '<ul><li>Test 123</li></ul>');
        });
        it("should indent block", function() {
          selection_helper.selectElementText(editor.find('.fondant-editor-content'));
          editor.fondant('ul');
          return expect(editor).toApplyFormatAndMatch('indent', '<ul><ul><li>Test 123</li></ul></ul>');
        });
        it("should outdent block", function() {
          selection_helper.selectElementText(editor.find('.fondant-editor-content'));
          editor.fondant('ul');
          editor.fondant('indent');
          return expect(editor).toApplyFormatAndMatch('outdent', '<ul><li>Test 123</li></ul>');
        });
        it("should link text", function() {
          var link;
          link = 'http://ovenbits.com';
          return expect(editor).toApplyFormatAndMatch('link', "<a href=\"" + link + "\">Test 123</a>", link);
        });
        it("should unlink text", function() {
          selection_helper.selectElementText(editor.find('.fondant-editor-content'));
          editor.fondant('link', 'http://ovenbits.com');
          return expect(editor).toApplyFormatAndMatch('unlink', 'Test 123');
        });
        return afterEach(function() {
          return editor.detach();
        });
      });
      return afterEach(function() {
        Fondant = null;
        editor.fondant('destroy');
        return editor.remove();
      });
    });
  });

}).call(this);
