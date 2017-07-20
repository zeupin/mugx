/**
 * A nice sliding menu jquery extension.
 * See https://github.com/zeupin/menu-maaa
 *
 * Copyright (c) 2017 Zeupin LLC.
 * Author: Macc Liu (https://github.com/maccliu)
 *
 * Licensed under MIT.
 */
;
(function ($) {
  $.fn.extend({
    "maaa": function (parameters) {
      // default parameters
      var defaults = {
        pos: "list.bottom",
        classes: "active",
      }

      // combines defaults and parameters
      var options = $.extend({}, defaults, parameters);

      // extension main
      this.each(function () {
        // get [data-pos=...] attribute
        var pos = $(this).attr("data-pos");
        if (pos == undefined) {
          pos = options.pos;
        }

        // get [data-classes=...] attribute
        var classes = $(this).attr("data-classes");
        if (classes == undefined) {
          classes = options.classes;
        }

        // get .maaa-list element
        var list = $(this);

        // each .maaa-item element
        $(this).find(".maaa-item").each(function () {

          // get .maaa-sub element
          var sub = $(this).find(".maaa-sub");
          if (sub.length == 0) return true;

          switch (pos) {
            case "list.right":
              sub.css({
                "top": 0,
                "left": 0,
                "margin-left": (list.outerWidth() - 1) + "px",
                "height": list.outerHeight() + "px",
                "border-left": "none"
              });
              break;

            case "list.left":
              sub.css({
                "top": 0,
                "right": 0,
                "margin-right": (list.outerWidth() - 1) + "px",
                "height": list.outerHeight() + "px",
                "border-right": "none"
              });
              break;

            case "list.bottom":
              sub.css({
                "left": 0,
                "width": list.outerWidth() + "px"
              });
              break;

            case "list.top":
              sub.css({
                "left": 0,
                "width": list.outerWidth() + "px",
                "bottom": 0,
                "margin-bottom": list.outerHeight() + "px",
              });
              break;
          }

          $(this).mouseenter(function () {
            $(this).addClass("active");
            sub.addClass(classes);

          });

          $(this).mouseleave(function () {
            $(this).removeClass("active");
            sub.removeClass(classes);
          });
        });
      });

      // for chain-style code
      return this;
    }
  });
})(jQuery);