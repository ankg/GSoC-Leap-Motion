"use strict";
/* exported gesture */
var gesture = {
    initial: {
        info: "Please put your two hands above Leap device",
        nextState: function (frame) {
            if (frame.hands.length == 2) {
              return "two-hands-detected";
            }
            return null; // stop here
         }
        }, 
    twoHandsDetected: {
    info: "Close your fist",
    nextState: function (frame) {
        if (frame.hands[0].grabStrength > 0.9) {
            return "fistClosed";
        } else if (frame.hands[1].grabStrength > 0.9) {
           return "wrongFistClosed";
       }
       return null;
    }
    }, 
    fistClosed: {
        info: "Move your closed fist to increase or decrease temperature",
        action: function (frame) {
            var temp = getTempFromHandVelocity(frame.hands[0].velocity[0]);
            setTemperature(temp);
        },
        nextState: function() {
          return null;
        }
    },
    wrongFistClosed: {
        info: "Wrong fist has been closed. Close the other fist.",
        action: function(){
            return null;
        }
    }
};