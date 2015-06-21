  "use strict";
/* jshint quotmark : false */
/* jslint devel : true */
/* global $ */
/* exported GRASP */

var GRASP = {
    leapInfo : function(parentDiv, options){
      //desired structure of options needed to be sent by the developer
      /*
         {
          palmVelocity : {
            hand : "left",
            value : "50"
          },
          palmNormal : {
            hand : "right",
            value : [20, 30, 40]
          }
         }
      */
      for(var key in options){
        var hand = options[key].hand;
        var value = options[key].value;
        
        var leftDiv = $('.left-hand');
        var rightDiv = $('.right-hand');
        var propertyDiv, propertyValue;
        if($('.'+hand+'-'+key).length === 0)
        {  
          propertyDiv = $('<h3 class="' + hand + '-' + key + '">');
          propertyDiv[0].innerHTML = key + ": ";
        }
        else
          propertyDiv = $('.'+hand+'-'+key);
        

        if($('.'+hand+'-'+key+' .value').length === 0)
          propertyValue = $('<span class="value">');
        else
          propertyValue = $('.'+hand+'-'+key+' .value');

        propertyValue[0].innerHTML = value[0] + "";
        console.log(propertyValue);

        if(propertyDiv.has(propertyValue).length === 0)
          propertyDiv.append(propertyValue);
        if(hand == "left")
        {
          //add to the left hand's div
          if(leftDiv.has(propertyDiv).length === 0)
          leftDiv.append(propertyDiv);
        }
        else
        {
          //add to the right hand's div
          if(rightDiv.has(propertyDiv).length === 0)
          rightDiv.append(propertyDiv);
        }
      }
    },
    initialize : function (parentDiv) {
      var leftDiv = $('<div class="left-hand">');
      var rightDiv = $('<div class="right-hand">');
      var title_left = $('<h2>Left Hand Properties</h2>');
      var title_right = $('<h2>Right Hand Properties</h2>');
      title_left.appendTo(leftDiv);
      title_right.appendTo(rightDiv);
      leftDiv.appendTo(parentDiv);
      rightDiv.appendTo(parentDiv);
    }

  };
