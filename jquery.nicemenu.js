/**
 * A nice sliding menu jquery extension
 *
 * Copyright (c) 2017 Zeupin LLC.
 * Licensed under MIT.
 */
;
(function ($) {
  $.fn.extend({
    "nicemenu": function (parameters) {
      // default parameters
      var defaults = {}

      // combines defaults and parameters
      var options = $.extend({}, defaults, parameters);

      // extension main
      this.each(function () {
        // get [data-pos=...] attribute
        var pos = $(this).attr("data-pos");
        if (pos == undefined) {
          pos = "list.right";
        }

        // get [data-classes=...] attribute
        var classes = $(this).attr("data-classes");
        if (classes == undefined) {
          classes = "active";
        }

        // get .nicemenu-list element
        var list = $(this).find(".nicemenu-list");
        if (list.length == 0) return true;

        // each .nicemenu-item element
        $(this).find(".nicemenu-item").each(function () {

          // get .nicemenu-sub element
          var sub = $(this).find(".nicemenu-sub");
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

            case "list.top":
              sub.css({
                "top": 0,
                "left": 0,
                "width": list.outerWidth() + "px"
              });
              break;

            case "list.bottom":
              sub.css({
                "left": 0,
                "width": list.outerWidth() + "px"
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