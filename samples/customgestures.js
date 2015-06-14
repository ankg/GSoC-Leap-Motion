var scaleFactor = 20; //Change as per units of pressure

function getMagnitude(vector, digits)
{
  var magnitude=0;
  vector.forEach(function(p){
    magnitude += p*p;
  });
  return Math.sqrt(magnitude).toFixed(digits);
};

function dotProduct(a_vector, b_vector)
{
  var magnitude=0;
  for(var i=0;i<3;i++) 
    magnitude += a_vector[i]*b_vector[i];
  return magnitude;
}
Leap.loop(function (frame){
  // hand_left will have one hand object
  // hand_right will have the other hand object
  var hand_left = frame.hands[0];
  var hand_right = frame.hands[1];

  console.log(frame.hands);
  if(typeof hand_right != "undefined" && typeof hand_left != "undefined"){
  if(hand_left.valid && hand_right.valid)   // Check :- don't proceed if any of it is empty
  {
    console.log("Both hands Detected");
    if(hand_left.type == "right")     // Check :- Swap if hand_left variable contains right hand object and vice versa
    {
      //swap(hand_left, hand_right);
      var temp;
      temp = hand_left;
      hand_left = hand_right;
      hand_right = temp;
    }
    if(hand_left.grabStrength>=0.95 && hand_right.grabStrength<=0.05)  // Check :- right hand has to be flat(grabStrength = 0). left has to be closed fist(grabStrength = 1)
    {
      console.log("gesture!");
      // Now if left hand is moving towards the right, do the appropriate actions.
      var velocity = hand_left.palmVelocity;
      var normal = hand_right.palmNormal;
      var cosine = dotProduct(velocity,normal)/(getMagnitude(velocity)*getMagnitude(normal));
      var pressure = getMagnitude(velocity, 2)*scaleFactor;

      if(cosine<0){ 
      // hand moving towards 
      console.log("Gesture detected hand moving towards");
      //INCREASE the pressure using iframe-phone
      }
      else if(cosine>0){
        //hand moving away 
        console.log("Gesture detected hand moving away");
        //DECREASE the Pressure
      }
    }
  }
}
});