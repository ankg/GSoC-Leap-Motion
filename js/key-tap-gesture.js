"use strict";
/* jslint devel:true */
/* global iframePhone, Leap */

var paused = true;
var interactiveIframe = document.querySelector(".interactive");
var interactive = new iframePhone.ParentEndpoint(interactiveIframe);

Leap.loop({enableGestures: true}, function (frame) {

if (frame.valid && frame.gestures.length > 0) {
  frame.gestures.forEach(function (gesture) {

    if ((gesture.type == "keyTap" || gesture.type == "screenTap") && paused === true) { 
      interactive.post("play");
      paused = false;
    }
    else if ((gesture.type == "keyTap" || gesture.type == "screenTap") && paused === false) {
      interactive.post("stop");
      paused = true;
    }
  });
}
});