  "use strict";
/* jshint quotmark : false */
/* jslint devel : true */
/* global $ */
/* exported GRASP */

//desired structure of options needed to be sent by the developer
      /*
         {
           "palmVelocity" : true, (stands for both hands)
           "palmNormal" : "leftHand",
           "grabStrength" : "rightHand"
         };
      */
function addToDiv(hand, key, value)
{
  var propertyDiv, propertyValue;
  var leftDiv = $('.left-hand');
  var rightDiv = $('.right-hand');
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

  propertyValue[0].innerHTML = value[hand].toString() + "";

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
var GRASP = {
    leapInfo : function(parentDiv, options, frame){
      //pre-processing
      //leftHandObject will have the left hand object if it exists
      //rightHandObject will have the right hand object if it exists
      var leftHandObject, rightHandObject;
      if(frame.hands.length === 1)
      {  
        if(frame.hands[0].type == "left")
          leftHandObject = frame.hands[0];
        if(frame.hands[0].type == "right")
          rightHandObject = frame.hands[0];
      }
      else if(frame.hands.length === 2)
      {  
        if(frame.hands[0].type == "left")
        {
          leftHandObject = frame.hands[0];
          rightHandObject = frame.hands[1];
        }
        else
        {
          leftHandObject = frame.hands[1];
          rightHandObject = frame.hands[0];
        }
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

      if(leftHandObject === undefined){
        leftDiv.empty();
        leftDiv.append("<h2>Left Hand Properties</h2>");
      }
      else if(rightHandObject === undefined){
        rightDiv.empty();
        rightDiv.append("<h2>Right Hand Properties</h2>");
      }

      //for every key in options, render the data
      for(var key in options){

        var hand = "none";
        var value = {};
        if(options[key] === true && (leftHandObject != undefined && rightHandObject != undefined)){
          hand = "both";
          value["left"] = leftHandObject[key];
          value["right"] = rightHandObject[key];
          addToDiv("left", key, value);
          addToDiv("right", key, value);
        }
        else if(options[key] == "leftHand" && leftHandObject != undefined){
          hand = "left";
          value["left"] = leftHandObject[key];
          addToDiv("left", key, value);
        }
        else if(options[key] == "rightHand" && rightHandObject != undefined){
          hand = "right";
          value["right"] = rightHandObject[key];
          addToDiv("right", key, value);
        }
      }
    }

  };
