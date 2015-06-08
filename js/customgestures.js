var scaleFactor = 20; //Change as per units of pressure

function getMagnitude(vector, digits)
{
  var magnitude;
  vector.forEach(p){
    magnitude += p*p;
  }
  return Math.sqrt(magnitude).toFixed(digits);
}

Leap.loop(function (frame){
  // hand_left will have one hand object
  // hand_right will have the other hand object
  var hand_left = frame.hands[0];
  var hand_right = frame.hands[1];
  
  if(hand_left && hand_right)   // Check :- don't proceed if any of it is empty
  {
    if(hand_left.isRight())     // Check :- Swap if hand_left variable contains right hand object and vice versa
    {
      //swap(hand_left, hand_right);
      var temp;
      temp = hand_left;
      hand_left = hand_right;
      hand_right = temp;
    }
    if(hand_left.grabStrength>=0.95 && hand_right.grabStrength<=0.05)  // Check :- right hand has to be flat(grabStrength = 0). left has to be closed fist(grabStrength = 1)
    {
      // Now if left hand is moving towards the right, do the appropriate actions.
      var pressure = getMagnitude(hand.palmVelocity, 2)*scaleFactor;
      //set the pressure using iframe-phone
    }
  }
});