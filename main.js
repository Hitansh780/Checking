video= "";
status= " ";
objects= [];

function preload() {

  video= createVideo('video.mp4');
  video.hide();  
}

function setup() {
  canvas= createCanvas(480,380);
  canvas.center();  
}

function draw() {
  image(video,0,0,480,380); 
  if (status!="") {
    objectDetector.detect(video,gotResult);
    document.getElementById("status").innerHTML= "Status: Object Detected.";
    document.getElementById("Quantity").innerHTML= "There are a total of "+objects.length+" objects";
    for (i=0; i <= objects.length-1; i++) {
    fill("#0000");
    stroke("#0000");
    nofill();
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    accuracy= floor(objects[i].confidence*100);
    text(objects[i].label+" "+accuracy+"%"+objects[i].x+15, objects[i].y+15);
    
    }
  }
}

function gotResult(error,results) {
  if (error) {
   console.log(error); 
  }
else {
   console.log(results);
   objects= results;
}

}




function start()  {
  objectDetector= ml5.objectDetector('cocossd',modelLoaded);  
}

function modelLoaded() {
   console.log("CocoSSD loaded");
   status= true;
   video.loop();
   video.volume(0);
   video.speed(1); 
}


