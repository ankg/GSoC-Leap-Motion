
var scaleFactor = 20,
    temp,
    handLeft={},
    handRight={}; //Change as per units of pressure

function magnitude(vector, digits)
{
  var magnitude=0;
  vector.forEach(function(p){
    magnitude += p*p;
  });
  return Math.sqrt(magnitude).toFixed(digits);
};

function dotProduct(aVector, bVector)
{
  var magnitude=0;
  for(var i=0;i<3;i++) 
    magnitude += aVector[i]*bVector[i];
  return magnitude;
};

Leap.loop(function (frame){
  // handLeft will have one hand object
  // handRight will have the other hand object
  handLeft = frame.hands[0];
  handRight = frame.hands[1];

  console.log(frame.hands);

  if (typeof handRight != "undefined" && typeof handLeft != "undefined") {

    if (handLeft.valid && handRight.valid) {   //don't proceed if any of it is empty

      console.log("Both hands Detected");
      if (handLeft.type == "right"){     //Swap if handLeft variable contains right hand object and vice versa
        //swap(handLeft, handRight);
        temp = handLeft;
        handLeft = handRight;
        handRight = temp;
      }

      if (handLeft.grabStrength>=0.95 && handRight.grabStrength<=0.05){  //right hand has to be flat(grabStrength = 0). left has to be closed fist(grabStrength = 1)
        
        console.log("gesture!");
        var velocity = handLeft.palmVelocity;
        var normal = handRight.palmNormal;
        var cosine = dotProduct(velocity,normal)/(magnitude(velocity)*magnitude(normal));
        var pressure = magnitude(velocity, 2)*scaleFactor;

        if(cosine<0){ 
          console.log("Gesture detected hand moving towards");
        }
        else if(cosine>0){
          console.log("Gesture detected hand moving away");
        }
      }
    }
}
});