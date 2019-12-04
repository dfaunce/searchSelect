/*
    Title: searchSelect.js
    Author: David Faunce
    Description: Converts an <input> HTML element into a searchable textbox - an alternative to a <select>
    
    Pre-requisites:
        - jQuery (v2.2 to 3.0+)
*/

$(function () {

	//If user clicks outside of the searchSelect element, then hide all lists
    $(window).on("click.Bst", function (event) {
        if (!$(event.target).closest(".djf-master-searchSelect input.searchSelect").length) {
            $("ul.searchSelect").each(function () {
                if ($(this).is(":visible")) {
                    $(this).hide();
                }
            });
        }
    });


	//Primary function to initialize searchSelect
   $.fn.searchList = function(options) {
    var $settings = $.extend({
      placeholder: "Search",
      width:"auto",      
      listItemHover: {
        backgroundColor:"#caf1ff;",
        color:"inherit"
      },
      button: {
        backgroundColor: "auto",        
        color:"auto",
        iconClass: "glyphicon glyphicon-remove"
      },
      buttonHover: {
        backgroundColor: "#c75555",        
        color:"#fff",
        iconClass: null
      }
    }, options);
    
    //Set the master div
    var $master = $(this);
    $master.addClass("djf-master-searchList");
    $master.css("width", $settings.width);
    
    //Find the input
    var $input = $master.find("input");
    $input.attr("placeholder", $settings.placeholder).addClass("searchList");
       
    //Wrap the input inside an .input-group
    $input.wrap('<div class="searchList-group"></div>');
    
    //Define the .input-group
    var $inputGroup = $input.parent(".searchList-group");
    
    //Append a button
    $inputGroup.append('<div class="btn-searchList-clear" title="Clear"><div>&#215;</div></div>');
   
    
    if ($settings.buttonHover.iconClass == null) {
      $settings.buttonHover.iconClass = $settings.button.iconClass;
    }
    
    //Define remove button
    var $btn = $inputGroup.find(".btn-searchList-clear");    
    var $span = $btn.find("div");
    $btn.css({"background-color": $settings.button.backgroundColor, "color":$settings.button.color});
    $btn.on("mouseover", function() { 
      $(this)
        .css({"background-color":$settings.buttonHover.backgroundColor, "color":$settings.buttonHover.color, "opacity":1});
        $span.removeClass($settings.button.iconClass).addClass($settings.buttonHover.iconClass);
    });
    $btn.on("mouseout", function() {
      $(this)
        .css({"background-color":$settings.button.backgroundColor, "color":$settings.button.color, "opacity":0.75}); 
      $span.removeClass($settings.buttonHover.iconClass).addClass($settings.button.iconClass);
    });
    
    
    //Define the UL list
    var $ul = $master.find("ul");
    $ul.addClass("searchList");
    
    
    var i = 0, j = 0;
    
    //Search
    $input.on("keyup", function() {
      search($(this).val());
    });
    function search(txt) {
      if (txt.length === 0) {
        $ul.hide();
        $ul.find("li").show();
      }
      var arr = (txt.toLowerCase()).split(" ");
      var b = 1;
      var li = "";
      $ul.children("li").each(function() {
        b = 1;
        li = $.trim($(this).text().toLowerCase());
        for (i = 0; i < arr.length; i++) {
          b *= (li.indexOf(arr[i]) >= 0) ? 1 : 0;
        }
        if (b > 0) {
          $(this).show();
        }
        else {
          $(this).hide();
        }
      });
      $ul.show();
    }
    
    $input.on("click", function() {
      $ul.find("li").show();
      $ul.show();
    });
    
    
    //Select
    $ul.children("li").on("click", function() {
        var txt = $.trim($(this).text());
        $input.val(txt);
      
        //Transfer all data-attributes to the input element
        $.each($(this).data(), function (name, value) {
          $input.attr("data-" + name, value);
        });
      
        toggleInputEnable(false, false);
    });
    
    
        //If there is a value detected, disable the input
        if ($input.val().length > 0) {
            toggleInputEnable(false, false);
        }
    
    
    function toggleInputEnable(enabled, clear) {
      if (clear) {
        $input.val("");
      }
      
      if (enabled) {
        $input.prop("disabled", false).removeAttr("disabled");
        $btn.css("visibility", "hidden");        
      }
      else {
        $input.prop("disabled", true);
        $btn.css("visibility", "visible");
      }
      $ul.hide();      
    }
    
    //Clear Search
    $btn.on("click", clear);
    function clear() {
      toggleInputEnable(true, true);
      $input.focus().click();
    }
    
    $(window).on("click.Bst", function(event) {
      if (!$(event.target).closest(".djf-master-searchList input.searchList").length) {
        $("ul.searchList").each(function () {
          if ($(this).is(":visible")) {
            $(this).hide();
          }
        });
      }   
    });
    
    
  };
  
  
  /* *************************************************************************************************
  /* --------------------------------------------- USAGE ---------------------------------------------
  
  ---- SIMPLE ----
  $("div.searchSelect").searchSelect();
  
  ---- CONFIGURABLE ----
  $("div.searchSelect").searchSelect({
    placeholder: "Search Items",
    width: "600px",
    listItemHover: {
      backgroundColor: "#000",
      color: "#fff"
    },
    button: {
      backgroundColor: "blue",
      color: "#fff",
      iconClass: "glyphicon glyphicon-ok"
    },
    buttonHover: {
      backgroundColor: "#fff",
      color: "#333",
      iconClass: "glyphicon glyphicon-minus"
    }
  });

  */


});
