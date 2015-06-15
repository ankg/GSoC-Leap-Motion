"use strict";
/* jslint devel:true */
/* global Leap, iframePhone */

var temp,
    handLeft={},
    handRight={},
    scaleFactor = 30;
var interactiveIframe = document.querySelector(".interactive");
var interactive = new iframePhone.ParentEndpoint(interactiveIframe);

function magnitude(vector, digits)
{
  var value=0;
  vector.forEach(function (p) {
    value += p*p;
  });
  return Math.sqrt(value).toFixed(digits);
}

function dotProduct(aVector, bVector)
{
  var magnitude=0;
  for(var i=0;i<3;i++) 
    magnitude += aVector[i]*bVector[i];
  return magnitude;
}

Leap.loop(function (frame) {
  // handLeft and handRight will both contain a hand object
  handLeft = frame.hands[0];
  handRight = frame.hands[1];
  console.log(frame.hands);

  if (typeof handRight != "undefined" && typeof handLeft != "undefined") {

    if (handLeft.valid && handRight.valid) {   //don't proceed if any of it is empty

      if (handLeft.type == "right") {     //Swap if handLeft variable contains right hand object and vice versa
        temp = handLeft;
        handLeft = handRight;
        handRight = temp;
      }

      if (handLeft.grabStrength>=0.95 && handRight.grabStrength<=0.05) {  //right hand has to be flat(grabStrength = 0). left has to be closed fist(grabStrength = 1)
        var velocity = handLeft.palmVelocity;
        var normal = handRight.palmNormal;
        var cosine = dotProduct(velocity,normal)/(magnitude(velocity)*magnitude(normal));

        if (cosine<0) { 
          console.log("Hand moving towards the palm. Set the temperature.");   
          interactive.addListener("propertyValue",function(data){
            if(data.name == "purpleAtomTemperature")
            { 
              var temperature = data.value + magnitude(velocity,2)*scaleFactor/100;
              console.log(data.value);
              interactive.post("set", { name:"purpleAtomTemperature", value: temperature});
            }
          });       
          interactive.addListener("modelLoaded", function(){
            interactive.post("observe","purpleAtomTemperature");
          });
          interactive.post("get","purpleAtomTemperature");
        }
        else if (cosine>0) {
          console.log("Hand moving away from the palm.");
          //Doing nothing here as of now.
        }
      }
    }
}
});