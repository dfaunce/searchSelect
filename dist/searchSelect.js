/*
    Title: searchSelect.js
    Author: David Faunce
    Description: Converts an <input> HTML element into a searchable textbox - an alternative to a <select>
    
    Pre-requisites:
        - jQuery (v2.2 to 3.0+)
        - Bootstrap v3.3.X (preferably 3.3.7)
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
    $.fn.searchSelect = function (options) {
	
		//Customizable settings
        var $settings = $.extend({
          placeholder: "Search",         //Extend a placeholder
          width:"auto",                  //Define the width of the entire searchSelect object
          listItemHover: {               //When the user hovers on a selectable list item
            backgroundColor:"#caf1ff;",  // -- set the background color
            color:"inherit"              // -- set the text color
          },
          button: {                      //The button next to the input (A "clear entry" button)
            backgroundColor: "auto",     // -- set the background color   
            color:"auto",                // -- set the text color
            iconClass: "glyphicon glyphicon-remove" // -- the icon displayed
          },
          buttonHover: {                 //When the user hovers over the button
            backgroundColor: "#c75555",  // -- set the background color
            color:"#fff",                // -- set the text color
            iconClass: null              // -- set the icon (if null then it will be same as button [above])
          }
        }, options);
    
        //Set the master div
        var $master = $(this);
        $master.addClass("djf-master-searchSelect");
        $master.css("width", $settings.width);
    
        //Find the input
        var $input = $master.find("input.searchSelect");
        $input.attr("placeholder", $settings.placeholder);
       
        //Wrap the input inside an .input-group
        $input.wrap('<div class="input-group"></div>');
    
        //Define the .input-group
        var $inputGroup = $input.parent(".input-group");
        console.log("input group length: " + $inputGroup.length);
    
        //Append a button
        $inputGroup.append('<span class="input-group-addon" title="Clear"><span class="' + $settings.button.iconClass + ' btn-searchSelect-remove"></span></span>');
   
    
        if ($settings.buttonHover.iconClass == null) {
          $settings.buttonHover.iconClass = $settings.button.iconClass;
        }
    
        //Define remove button
        var $btn = $inputGroup.find(".input-group-addon");    
        var $span = $btn.find("span");
        $btn.css({"background-color": $settings.button.backgroundColor, "color":$settings.button.color});
        $btn.on("mouseover", function() { 
          $(this)
            .css({"background-color":$settings.buttonHover.backgroundColor, "color":$settings.buttonHover.color});
            $span.removeClass($settings.button.iconClass).addClass($settings.buttonHover.iconClass);
        });
        $btn.on("mouseout", function() {
          $(this)
            .css({"background-color":$settings.button.backgroundColor, "color":$settings.button.color}); 
          $span.removeClass($settings.buttonHover.iconClass).addClass($settings.button.iconClass);
        });
    
    
        //Define the UL list
        var $ul = $master.find("ul.searchSelect");
    
    
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
