"use strict";
/* jslint devel:true */
/* global Leap, iframePhone */

var temp,
    handLeft={},
    handRight={},
    handLeftVelocity=[0,0,0],
    temperature,
    normal,
    cosine,
    scaleFactor = 300;

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

      var condition1 = handLeft.grabStrength>=0.95;
      var condition2 = handRight.grabStrength<=0.05;
      if (condition1 && condition2) {  //right hand has to be flat(grabStrength = 0). left has to be closed fist(grabStrength = 1)

        handLeftVelocity = handLeft.palmVelocity;
        normal = handRight.palmNormal;
        cosine = dotProduct(handLeftVelocity,normal)/(magnitude(handLeftVelocity)*magnitude(normal));
        var condition3 = normal[1] <= 0.45 && normal[1] >= -0.45;
        
        if (cosine<0) { 
          if(condition3){
            
              console.log("Hand moving towards the palm. Increase the temperature."); 
              temperature = magnitude(handLeftVelocity,2)*scaleFactor/100;
              console.log(temperature);
              interactive.post("set", { name:"purpleAtomTemperature", value: temperature});
          }
        }
      }
    }
}
});