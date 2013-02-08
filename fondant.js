(function() {
  var $;

  $ = jQuery;

  $(function() {
    var Fondant;
    Fondant = (function() {

      function Fondant(element, options) {
        this.init('fondant', element, options);
      }

      Fondant.prototype.init = function(type, element, options) {
        this.id = new Date().getTime();
        this.type = type;
        this.$element = $(element);
        this.options = this.getOptions(options);
        this.templates.fondant = this;
        if (this.$element.prop('tagName').toLowerCase() === 'textarea') {
          this.textarea = this.$element;
          this.replaceTextareaWithDiv();
        }
        this.makeEditable();
        this.insertToolbar();
        return this.bindToolbar();
      };

      Fondant.prototype.destroy = function(keep_changes) {
        if (keep_changes == null) keep_changes = true;
        this.unbindToolbar();
        this.removeToolbar();
        this.makeUneditable();
        if (this.textarea) this.replaceDivWithTextarea(keep_changes);
        this.$element.removeData(this.type);
        return delete this;
      };

      Fondant.prototype.insertToolbar = function() {
        if (this.options.toolbar) {
          return this.$element.prepend(this.templates.toolbar());
        }
      };

      Fondant.prototype.bindToolbar = function() {
        var action, _i, _len, _ref, _results;
        _ref = this.actions;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          action = _ref[_i];
          _results.push($("[data-action='" + this.type + "-" + action + "']").on('click.fondant', $.proxy(this[action], this)));
        }
        return _results;
      };

      Fondant.prototype.unbindToolbar = function() {
        if (!this.options.toolbar) {
          return $("[data-action^='" + this.type + "-']").off('.fondant');
        }
      };

      Fondant.prototype.removeToolbar = function() {
        if (this.options.toolbar) {
          return this.$element.find(this.options.prefix + "-toolbar").remove();
        }
      };

      Fondant.prototype.getElement = function() {
        return this.$element.get(0);
      };

      Fondant.prototype.getOptions = function(options) {
        return options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());
      };

      Fondant.prototype.makeEditable = function() {
        this.$element.attr('contenteditable', 'true');
        return this.$element = this.wrapEditorContent();
      };

      Fondant.prototype.makeUneditable = function() {
        this.$element = this.unwrapEditorContent();
        return this.$element.attr('contenteditable', 'false');
      };

      Fondant.prototype.replaceElement = function($old, fresh) {
        var $fresh;
        $old.replaceWith($fresh = $(fresh));
        return $fresh;
      };

      Fondant.prototype.replaceDivWithTextarea = function(keep_changes) {
        var html;
        if (keep_changes == null) keep_changes = true;
        html = this.$element.html();
        this.$element = this.replaceElement(this.$element, this.textarea);
        this.$element.data(this.type, this);
        if (keep_changes) this.$element.val(html);
        return this.$element;
      };

      Fondant.prototype.replaceTextareaWithDiv = function() {
        if (this.textarea) {
          this.$element = this.replaceElement(this.$element, this.templates.editorContent());
          this.$element.data(this.type, this);
          this.$element.addClass(this.textarea.attr('class'));
          this.$element.html(this.textarea.val());
        }
        return this.$element;
      };

      Fondant.prototype.unwrapEditorContent = function() {
        var $wrap;
        $wrap = this.$element;
        this.$element = this.replaceElement(this.$element, this.$element.find("." + (this.templates.editorContentClass())));
        this.$element.data(this.type, this);
        this.$element.addClass(this.templates.editorClass());
        $wrap.remove();
        if (this.textarea) this.$element.addClass(this.textarea.attr('class'));
        return this.$element;
      };

      Fondant.prototype.wrapEditorContent = function() {
        var $original_element;
        $original_element = this.$element;
        this.$element = this.$element.wrap(this.templates.editor()).parent();
        this.$element.data(this.type, this);
        this.$element.addClass($original_element.attr('class')).removeClass(this.templates.editorContentClass());
        $original_element.removeClass(this.templates.editorClass());
        $original_element.removeData(this.type);
        if (this.textarea) {
          $original_element.removeClass(this.textarea.attr('class'));
        }
        return this.$element;
      };

      Fondant.prototype.applyFormat = function(command, value) {
        return document.execCommand(command, false, value);
      };

      Fondant.prototype.actions = ['remove', 'custom', 'undo', 'redo', 'bold', 'italic', 'p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'ol', 'ul', 'indent', 'outdent', 'link', 'unlink'];

      Fondant.prototype.remove = function() {
        return this.applyFormat('removeFormat');
      };

      Fondant.prototype.custom = function(html) {
        if (navigator.appName === "Microsoft Internet Explorer") {
          return console.log("Custom HTML not yet implemented");
        } else {
          return this.applyFormat('insertHTML', html);
        }
      };

      Fondant.prototype.bold = function() {
        return this.applyFormat('bold');
      };

      Fondant.prototype.italic = function() {
        return this.applyFormat('italic');
      };

      Fondant.prototype.p = function() {
        return this.applyFormat('formatBlock', '<p>');
      };

      Fondant.prototype.h1 = function() {
        return this.applyFormat('formatBlock', '<h1>');
      };

      Fondant.prototype.h2 = function() {
        return this.applyFormat('formatBlock', '<h2>');
      };

      Fondant.prototype.h3 = function() {
        return this.applyFormat('formatBlock', '<h3>');
      };

      Fondant.prototype.h4 = function() {
        return this.applyFormat('formatBlock', '<h4>');
      };

      Fondant.prototype.blockquote = function() {
        return this.applyFormat('formatBlock', '<blockquote>');
      };

      Fondant.prototype.ol = function() {
        return this.applyFormat('insertOrderedList');
      };

      Fondant.prototype.ul = function() {
        return this.applyFormat('insertUnorderedList');
      };

      Fondant.prototype.indent = function() {
        return this.applyFormat('indent');
      };

      Fondant.prototype.outdent = function() {
        return this.applyFormat('outdent');
      };

      Fondant.prototype.link = function(url) {
        return this.applyFormat('link', url);
      };

      Fondant.prototype.unlink = function() {
        return this.applyFormat('unlink');
      };

      Fondant.prototype.templates = {
        editorClass: function() {
          return "" + this.fondant.options.prefix + "-editor";
        },
        editorContentClass: function() {
          return "" + (this.editorClass()) + "-content";
        },
        toolbarClass: function() {
          return "" + this.fondant.options.prefix + "-toolbar";
        },
        editor: function() {
          var id;
          id = "" + this.fondant.options.prefix + "-" + this.fondant.id;
          return "<div class=\"" + (this.editorClass()) + "\" id=\"" + id + "\">\n</div>";
        },
        editorContent: function() {
          return "<div class=\"" + (this.editorClass()) + " " + (this.editorContentClass()) + "\">\n</div>";
        },
        toolbar: function() {
          return "<div class=\"" + (this.toolbarClass()) + "\">\n  <ul>\n    <li>Text Styles</li>\n    <ul>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-bold\">B</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-italic\">I</a></li>\n    </ul>\n    <li>Block Styles</li>\n    <ul>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-p\">P</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-h1\">H1</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-h2\">H2</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-h3\">H3</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-h4\">H4</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-blockquote\">Quote</a></li>\n    </ul>\n    <li>Lists</li>\n    <ul>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-ol\">Numbers</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-ul\">Bullets</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-indent\">Increase Indent</a></li>\n      <li><a href=\"#\" data-action=\"" + this.fondant.type + "-outdent\">Decrease Indent</a></li>\n    </ul>\n  </ul>\n</div>";
        }
      };

      return Fondant;

    })();
    $.fn.fondant = function() {
      var args, option;
      option = arguments[0];
      args = Array.prototype.slice.call(arguments).slice(1);
      return this.map(function() {
        var $this, instance, options;
        $this = $(this);
        instance = $this.data('fondant');
        options = typeof option === 'object' && option;
        if (!instance) {
          $this.data('fondant', (instance = new Fondant(this, options)));
        }
        if (typeof option === 'string') instance[option].apply(instance, args);
        return instance.getElement();
      });
    };
    return $.fn.fondant.defaults = {
      prefix: 'fondant',
      toolbar: true
    };
  });

}).call(this);