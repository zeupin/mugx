/**
 * A nice sliding menu jquery extension.
 * See https://github.com/zeupin/mugx
 *
 * Copyright (c) 2017 Zeupin LLC.
 * Author: Macc Liu (https://github.com/maccliu)
 *
 * Licensed under MIT.
 */
;
(function ($) {
  $.fn.extend({
    "mugx": function (parameters) {
      // default parameters
      var defaults = {
        pos: "list.bottom",
        classes: "active",
        z_index: 20,
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

        var z_index = $(this).attr("data-z-index");
        if (z_index == undefined) {
          z_index = options.z_index;
        }

        // get the .mugx-list element
        var list = $(this);
        var list_width = list.outerWidth();
        var list_height = list.outerHeight();

        // fetch all items
        var items = $(this).find(".mugx-item");

        // each .mugx-item element
        items.each(function (item_index, item_ele) {

          // get the .mugx-item element
          var item = $(this);
          var item_left = item.position().left;

          // set item's z-index
          item.css("z-index", z_index);

          // add/remove .active class for each .mugx-item element
          item.mouseenter(function () {
            item.addClass("active");
          });
          item.mouseleave(function () {
            item.removeClass("active");
          });

          // get .mugx-sub element
          var sub = item.find(".mugx-sub");
          if (sub.length == 0) return true;

          // set sub's z-index
          sub.css("z-index", z_index+1);

          // get sub's width
          var sub_width = sub.outerWidth();

          switch (pos) {
            case "list.right":
              sub.css({
                "top": 0,
                "left": 0,
                "margin-left": list_width + "px",
                "height": list_height + "px",
                "border-left": "none"
              });
              break;

            case "list.left":
              sub.css({
                "top": 0,
                "right": 0,
                "margin-right": list_width + "px",
                "height": list_height + "px",
                "border-right": "none"
              });
              break;

            case "list.bottom":
              sub.css({
                "left": 0,
                "width": list_width + "px"
              });
              break;

            case "list.top":
              sub.css({
                "left": 0,
                "width": list_width + "px",
                "bottom": 0,
                "margin-bottom": list_height + "px"
              });
              break;

            case "item.bottom":
              if (sub_width > list_width) {
                sub.css({
                  "width": list_width + "px",
                  "left": 0
                });
              } else if ((item_left + sub_width) > list_width) {
                sub.css({
                  "right": 0
                });
              } else {
                sub.css({
                  "left": item_left + "px",
                });
              }
              break;

            case "item.top":
              if (sub_width > list_width) {
                sub.css({
                  "width": list_width + "px",
                  "left": 0,
                  "bottom": 0,
                  "margin-bottom": list_height + "px"
                });
              } else if ((item_left + sub_width) > list_width) {
                sub.css({
                  "right": 0,
                  "bottom": 0,
                  "margin-bottom": list_height + "px"
                });
              } else {
                sub.css({
                  "left": item_left + "px",
                  "bottom": 0,
                  "margin-bottom": list_height + "px"
                });
              }
              break;

            default:
              // if data-pos is invalid
              return true;
          }

          // add/remove classes for each .mugx-sub element
          $(this).mouseenter(function () {
            sub.addClass(classes);
          });
          $(this).mouseleave(function () {
            sub.removeClass(classes);
          });
        });
      });

      // for chain-style code
      return this;
    }
  });
})(jQuery);