
let checkGesture;
let video;
let flippedVideo;

// let urlModel = 'https://teachablemachine.withgoogle.com/models/ER1zXZWOS/';
// let urlModel = 'https://teachablemachine.withgoogle.com/models/ER1zXZWOS/' + 'model.json';
// let urlModel = 'https://teachablemachine.withgoogle.com/models/LfD_7_yGE/' + 'model.json';
let urlModel = 'https://teachablemachine.withgoogle.com/models/WZPVsSjqZ/' + 'model.json';

let label = "";
// 1
let questionFade = 0;
let question;
// 2
let yesFade = 0;
let yes;
// 3
let noFade = 0;
let no;
// 4
let helloFade = 0;
let hello;
// 5
let goodbyeFade = 0;
let goodbye;
// 6
let understoodFade = 0;
let understood;
// 7
let brbFade = 0;
let brb;
// 8
let hahaFade = 0;
let haha;

function preload() {
  // checkGesture = ml5.imageClassifier(urlModel + 'model.json');
  checkGesture = ml5.imageClassifier(urlModel);
  
  question = loadImage("Alerts/Question.jpeg");
  yes = loadImage("Alerts/Yes.png");
  no = loadImage("Alerts/No.png");
  hello = loadImage("Alerts/Hello.jpeg");
  goodbye = loadImage("Alerts/Goodbye.jpg");
  understood = loadImage("Alerts/Understood.jpeg");
  brb = loadImage("Alerts/brb.jpeg");
  haha = loadImage("Alerts/Haha.jpeg");
}

function setup() {
  // createCanvas(640, 480);
  var canvas = createCanvas(640, 480);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
  
  video = createCapture(VIDEO);
  video.size(width-20, height-20);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {

  // background(0, 255, 0);
  background(0)
  tint(255);
  image(flippedVideo, 10, 10);
  
  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(label, width / 2, height - 16);

  if (label == 'Question') {
    questionFade = 255;
  }
  else if (label == 'Yes') {
    yesFade = 255;
  }
  else if (label == 'No') {
    noFade = 255;
  }
  else if (label == 'Hello') {
    helloFade = 255;
  }
  else if (label == 'Goodbye') {
    goodbyeFade = 255;
  }
  else if (label == 'Haha') {
    hahaFade = 255;
  }
  else if (label == 'Understood') {
    understoodFade = 255;
  }
  else if (label == 'brb') {
    brbFade = 255;
  }

  if (questionFade > 0) {
    tint(255, questionFade);
    image(question, 10, 10, 228, 301);
    questionFade -= 10;    
  }
  else if (yesFade > 0) {
    tint(255, yesFade);
    image(yes, 10, 10);
    yesFade -= 10;    
  }
  else if (noFade > 0) {
    tint(255, noFade);
    image(no, 10, 10);
    noFade -= 10;    
  }
  else if (helloFade > 0) {
    tint(255, helloFade);
    image(hello, 10, 10, 228, 257);
    helloFade -= 10;    
  }
  else if (goodbyeFade > 0) {
    tint(255, goodbyeFade);
    image(goodbye, 10, 10, 250, 362);
    goodbyeFade -= 10;    
  }
  else if (hahaFade > 0) {
    tint(255, hahaFade);
    image(haha, 10, 10, 250, 250);
    hahaFade -= 10;    
  }
  else if (understoodFade > 0) {
    tint(255, understoodFade);
    image(understood, 10, 10, 250, 364);
    understoodFade -= 10;    
  }
  else if (brbFade > 0) {
    tint(255, brbFade);
    image(brb, 140, 10, 381, 440);
    brbFade -= 10;
  }  
  
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  checkGesture.classify(flippedVideo, getResult);
}


function getResult(error, results) {
  if (error) {
    console.error(error);
    // console('Error!! Try Again!!!');
    return;
  }
  // console.log(results[0]);
  // console.log(results[0].label);
  label = results[0].label;
  console.log(results)
  classifyVideo();
}