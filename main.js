song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() 
{
    song = loadSound("BoyWithUke - Understand.mp3")   
}
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO)
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized')    
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FFFEFE");
    stroke("#FFFEFE");

    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX,leftWristY,20);
        InNumerleftWristY = Number(leftWristY);
        remove_desimal = floor(InNumerleftWristY);
        volume = remove_desimal/500;
        document.getElementById("volume").innerHTML = "Volume=" + volume;
        song.setVolume(volume);
    }
}

function gotPoses(results) 
{
if (results.length) 
{
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;   
    leftWristY = results[0].pose.leftWrist.y;   
    console.log("leftWristX" + leftWristX + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;   
    rightWristY = results[0].pose.rightWrist.y;   
    console.log("leftWristX" + leftWristX + "leftWristY = " + leftWristY);
}
}

function play() 
{
    song.play();
    song.setVolume(1);
    song.rate(1);   
   

}