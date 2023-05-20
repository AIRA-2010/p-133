img = "";
status = "";
object = [];
function preload(){
img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(640,420);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function modelLoaded(){
    console.log("model is initialized");
    status = true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
        console.log(results);
        object = results;
}
function draw(){
    image(img,0,0,640,420);
    for(i=0 ;i<object.length ;i++){
        if(status != ""){
            fill("red");
            confidence = floor(object[i].confidence*100);
            text(object[i].label+"  "+confidence+"%",object[i].x+10,object[i].y+10);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }   
    }
}