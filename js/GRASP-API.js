  "use strict";
/* jshint quotmark : false */
/* jslint devel : true */
/* global $ */
/* exported GRASP */

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
var GRASP = {
    leapInfo : function(parentDiv, options, frame){
      //pre-processing
      //leftDetected will be set true if left hand has been detected
      //rightDetected will be set true if right hand has been detected
      var leftDetected, rightDetected;
      if(frame.hands.length === 1)
      {  
        leftDetected = (frame.hands[0].type == "left");
        rightDetected = (frame.hands[0].type == "right");
      }
      else
      {  
        leftDetected = true;
        rightDetected = true;
      }


      //Creating the left and right hand div's if they don't already exist
      //Fetching if they exist already in the leftDiv and rightDiv vars
      var leftDiv, rightDiv, title_left, title_right;
      if($('.left-hand').length === 0 && $('.right-hand').length === 0)
      {
        leftDiv = $('<div class="left-hand">');
        rightDiv = $('<div class="right-hand">');
        title_left = $('<h2>Left Hand Properties</h2>');
        title_right = $('<h2>Right Hand Properties</h2>');
        title_left.appendTo(leftDiv);
        title_right.appendTo(rightDiv);
        leftDiv.appendTo(parentDiv);
        rightDiv.appendTo(parentDiv);
      }
      else
      {
        leftDiv = $('.left-hand');
        rightDiv = $('.right-hand');
      }

      if(leftDetected === false)
        leftDiv.innerHTML = "";
      else if(rightDetected === false)
        rightDiv.innerHTML = "";

      //for every key in options, render the data
      for(var key in options){
        var hand = options[key].hand;
        var value = options[key].value;
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
    }

  };
