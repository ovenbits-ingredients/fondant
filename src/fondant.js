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
        return this.$element.removeData(this.type);
      };

      Fondant.prototype.focus = function() {
        return this.$element.find('.' + this.templates.editorContentClass()).focus();
      };

      Fondant.prototype.insertToolbar = function() {
        if (this.options.toolbar) {
          return this.$element.prepend(this.templates.toolbar());
        }
      };

      Fondant.prototype.bindToolbar = function() {
        var $button, action, _i, _len, _ref, _results;
        _ref = this.actions;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          action = _ref[_i];
          $button = $("[data-action='" + this.type + "-" + action + "']");
          _results.push($button.on('click.fondant', {
            action: action,
            editor: this
          }, function(event) {
            event.preventDefault();
            return event.data.editor[event.data.action]();
          }));
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

      Fondant.prototype.getSelection = function() {
        var content;
        content = window.getSelection().getRangeAt(0).cloneContents();
        return $('<span>').html(content).html();
      };

      Fondant.prototype.value = function(html) {
        if (html === void 0) {
          return this.$element.find('.' + this.templates.editorContentClass()).html();
        } else {
          return this.$element.find('.' + this.templates.editorContentClass()).html(html).html();
        }
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
        document.execCommand(command, false, value);
        return this.focus();
      };

      Fondant.prototype.actions = ['remove', 'custom', 'undo', 'redo', 'bold', 'italic', 'p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'ol', 'ul', 'indent', 'outdent', 'link', 'unlink'];

      Fondant.prototype.remove = function() {
        return this.applyFormat('removeFormat');
      };

      Fondant.prototype.custom = function(html) {
        var range;
        if (navigator.appName === "Microsoft Internet Explorer") {
          range = document.selection.createRange();
          return range.pasteHTML(html);
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
        this.applyFormat('outdent');
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
          var button, group;
          group = this.toolbarClass() + '-button-group';
          button = this.toolbarClass() + '-button';
          return "<ul class=\"" + (this.toolbarClass()) + "\">\n  <li class=\"" + group + "-label\">Text Styles</li>\n  <ul class=\"" + group + "\">\n    <li class=\"" + button + " " + button + "-bold\"><a href=\"#\" data-action=\"" + this.fondant.type + "-bold\">B</a></li>\n    <li class=\"" + button + " " + button + "-italic\"><a href=\"#\" data-action=\"" + this.fondant.type + "-italic\">I</a></li>\n  </ul>\n  <li class=\"" + group + "-label\">Block Styles</li>\n  <ul class=\"" + group + "\">\n    <li class=\"" + button + " " + button + "-p\"><a href=\"#\" data-action=\"" + this.fondant.type + "-p\">P</a></li>\n    <li class=\"" + button + " " + button + "-h1\"><a href=\"#\" data-action=\"" + this.fondant.type + "-h1\">H1</a></li>\n    <li class=\"" + button + " " + button + "-h2\"><a href=\"#\" data-action=\"" + this.fondant.type + "-h2\">H2</a></li>\n    <li class=\"" + button + " " + button + "-h3\"><a href=\"#\" data-action=\"" + this.fondant.type + "-h3\">H3</a></li>\n    <li class=\"" + button + " " + button + "-h4\"><a href=\"#\" data-action=\"" + this.fondant.type + "-h4\">H4</a></li>\n    <li class=\"" + button + " " + button + "-blockquote\"><a href=\"#\" data-action=\"" + this.fondant.type + "-blockquote\">Quote</a></li>\n  </ul>\n  <li class=\"" + group + "-label\">Lists</li>\n  <ul class=\"" + group + "\">\n    <li class=\"" + button + " " + button + "-ol\"><a href=\"#\" data-action=\"" + this.fondant.type + "-ol\">Numbers</a></li>\n    <li class=\"" + button + " " + button + "-ul\"><a href=\"#\" data-action=\"" + this.fondant.type + "-ul\">Bullets</a></li>\n    <li class=\"" + button + " " + button + "-indent\"><a href=\"#\" data-action=\"" + this.fondant.type + "-indent\">Increase Indent</a></li>\n    <li class=\"" + button + " " + button + "-outdent\"><a href=\"#\" data-action=\"" + this.fondant.type + "-outdent\">Decrease Indent</a></li>\n  </ul>\n</ul>";
        }
      };

      return Fondant;

    })();
    $.fn.fondant = function() {
      var args, instance, option;
      option = arguments[0];
      args = Array.prototype.slice.call(arguments).slice(1);
      if (typeof option === 'string' && args.length < 1) {
        if (option === 'getElement' || option === 'getSelection' || option === 'value') {
          instance = $(this).data('fondant');
          if (instance) return instance[option].apply(instance, args);
        }
      }
      return this.map(function() {
        var $this, options;
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
