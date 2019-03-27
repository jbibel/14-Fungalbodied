// p5.disableFriendlyErrors = true
const IMAGES = 99



var seqHead = Array(IMAGES)
var seqHead1 = Array(IMAGES)
var seqHead2 = Array(IMAGES)

var seqBody = Array(IMAGES)

var seqMouth = Array(IMAGES)
var seqMouth1 = Array(IMAGES)
var seqMouth2 = Array(IMAGES)

var seqEyeLeft = Array(IMAGES)
var seqEyeLeft1 = Array(IMAGES)
var seqEyeLeft2 = Array(IMAGES)
var seqEyeLeft3 = Array(IMAGES)
var seqEyeLeft4 = Array(IMAGES)

var seqEyeRight = Array(IMAGES)
var seqEyeRight1 = Array(IMAGES)
var seqEyeRight2 = Array(IMAGES)
var seqEyeRight3 = Array(IMAGES)
var seqEyeRight4 = Array(IMAGES)

var seqName = Array(IMAGES)


// var group0 = [seq1_0,seq2_0,seq3_0,seq4_0,seq5_0,seq6_0]
// var group1 = [seq1_1,seq2_1,seq3_1,seq4_1,seq5_1]

var env
var env2
var env3
// var loop
// var loop2
// var loop3

var smoothAmnt = 0.75

var meter40 = new Tone.Meter({
  smoothing: smoothAmnt
});
var meter160 = new Tone.Meter({
  smoothing: smoothAmnt
});
var meter640 = new Tone.Meter({
  smoothing: smoothAmnt
});
var meter2560 = new Tone.Meter({
  smoothing: smoothAmnt
});
var meter10240 = new Tone.Meter({
  smoothing: smoothAmnt
});

// var limit1 = new Tone.Limiter(-12).connect(meter40)
// var limit2 = new Tone.Limiter(-12).connect(meter160)
// var limit3 = new Tone.Limiter(-12).connect(meter640)
// var limit4 = new Tone.Limiter(-12).connect(meter2560)
// var limit5 = new Tone.Limiter(-12).connect(meter10240)

var Q_val = 0.8
var filterRoll = -96

var filter40 = new Tone.Filter({
  type: "bandpass",
  frequency: 40,
  rolloff: filterRoll,
  Q: Q_val,
  gain: 0
}).connect(meter40);

var filter160 = new Tone.Filter({
  type: "bandpass",
  frequency: 160,
  rolloff: filterRoll,
  Q: Q_val,
  gain: 0
}).connect(meter160);

var filter640 = new Tone.Filter({
  type: "bandpass",
  frequency: 640,
  rolloff: filterRoll,
  Q: Q_val,
  gain: 0
}).connect(meter640);

var filter2560 = new Tone.Filter({
  type: "bandpass",
  frequency: 2560,
  rolloff: filterRoll,
  Q: Q_val,
  gain: 0
}).connect(meter2560);

var filter10240 = new Tone.Filter({
  type: "bandpass",
  frequency: 10240,
  rolloff: filterRoll,
  Q: Q_val,
  gain: 0
}).connect(meter10240);

var tempVal = 0

// var eq = new Tone.EQ3(tempVal, 0, 0).toMaster();




// var eq = new Tone.EQ3(0, 0, 0).toMaster();
var eq = new Tone.EQ3(0, 0, 0).connect(filter40).connect(filter160).connect(filter640).connect(filter2560).connect(filter10240);



// create a synth and connect it to the master output (your speakers)
// var synth = new Tone.Synth().toMaster()
//
// //play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease('C4', '8n')
var mapMax = 100
var levelMin = -40
var levelMult = 5
// var lowSlider
// var lowTemp
var player

env = new Tone.AmplitudeEnvelope({
  attack: 0.05,
  decay: 5,
  sustain: 0,
  release: 0
});

env2 = new Tone.AmplitudeEnvelope({
  attack: 0.05,
  decay: 0.3,
  sustain: 0,
  release: 0
});

var gridW = new Tone.Signal(-13)
gridW.convert = false
var copyJitter = new Tone.Signal(1)
var headArraySignal = new Tone.Signal(0)
var mouthArraySignal = new Tone.Signal(0)
var eyeLeftArraySignal = new Tone.Signal(0)
var eyeRightArraySignal = new Tone.Signal(0)



// Tone.Transport.start()
// Tone.Transport.schedule(function(time){
// 	//time = sample accurate time of the event
// }, "1m");

function preload() {


  player = new Tone.Player({
    "url": "./14_128k.mp3",
    //"loop": true,
    //"autostart": true,

  }).connect(eq).toMaster();

  // for (var _ii = 0; _ii < IMAGES;_ii++){
  //   seq1_3[_ii] = loadImage("seq/head-" + _ii + ".jpg");
  //   seq2_3[_ii] = loadImage("seq/eyeLeft-" + _ii + ".jpg");
  //   seq3_3[_ii] = loadImage("seq/eyeRight-" + _ii + ".jpg");
  //   seq4_3[_ii] = loadImage("seq/mouth-" + _ii + ".jpg");
  //   seq5_3[_ii] = loadImage("seq/nose-" + _ii + ".jpg");
  // }


  for (var _i = 0; _i < IMAGES; _i++) {
    seqHead[_i] = loadImage("../elements/head/1/head1-" + _i + ".jpg");
    seqHead1[_i] = loadImage("../elements/head/2/head2-" + _i + ".jpg");
    seqHead2[_i] = loadImage("../elements/head/sad/head3-" + _i + ".jpg");

    seqBody[_i] = loadImage("../elements/body/body-" + _i + ".jpg");

    seqMouth[_i] = loadImage("../elements/mouth/happy/mouthHappy-" + _i + ".jpg");
    seqMouth1[_i] = loadImage("../elements/mouth/neutral/mouthNeutral-" + _i + ".jpg");
    seqMouth2[_i] = loadImage("../elements/mouth/sad/mouthSad-" + _i + ".jpg");

    seqEyeLeft[_i] = loadImage("../elements/eyeLeft/center1/eyeLeft_c1-" + _i + ".jpg");
    seqEyeLeft1[_i] = loadImage("../elements/eyeLeft/center2/eyeLeft_c2-" + _i + ".jpg");
    seqEyeLeft2[_i] = loadImage("../elements/eyeLeft/left/eyeLeft_l-" + _i + ".jpg");
    seqEyeLeft3[_i] = loadImage("../elements/eyeLeft/right/eyeLeft_r-" + _i + ".jpg");
    seqEyeLeft4[_i] = loadImage("../elements/eyeLeft/sad/eyeLeft_s-" + _i + ".jpg");

    seqEyeRight[_i] = loadImage("../elements/eyeRight/center1/eyeRight_c1-" + _i + ".jpg");
    seqEyeRight1[_i] = loadImage("../elements/eyeRight/center2/eyeRight_c2-" + _i + ".jpg");
    seqEyeRight2[_i] = loadImage("../elements/eyeRight/left/eyeRight_l-" + _i + ".jpg");
    seqEyeRight3[_i] = loadImage("../elements/eyeRight/right/eyeRight_r-" + _i + ".jpg");
    seqEyeRight4[_i] = loadImage("../elements/eyeRight/sad/eyeRight_s-" + _i + ".jpg");

    seqName[_i] = loadImage("../seq/name-" + _i + ".jpg");
  }



}

var lowHTML

let pg
var cnvRatioBase = 1280

var headArray
var mouthArray
var eyeLeftArray
var eyeRightArray

function setup() {
  // lowSlider = document.getElementById("low")
  // lowTemp = lowSlider.value
  pixelDensity(1);
  noSmooth()
  createCanvas(cnvRatioBase, cnvRatioBase * 0.56)
  // var cnv = createCanvas(cnvRatioBase, cnvRatioBase*0.56)
  // cnv.imageSmoothingEnabled = false
  // cnv.position(10,10)

  frameRate(30)

  headArray=[
    seqHead,seqHead1,seqHead2
  ]
  mouthArray=[
    seqMouth,seqMouth1,seqMouth2
  ]
  eyeLeftArray=[
    seqEyeLeft,seqEyeLeft1,seqEyeLeft2,seqEyeLeft3,seqEyeLeft4
  ]
  eyeRightArray=[
    seqEyeRight,seqEyeRight1,seqEyeRight2,seqEyeRight3,seqEyeRight4
  ]

  // background(150)

  sliderLow = createSlider(-6, 6, 0, 0.1)
  sliderLow.input(sliderLowEvent)
  lowHTML = createDiv(sliderLow.value())
  sliderMid = createSlider(-6, 6, 0, 0.1)
  sliderMid.input(sliderMidEvent)
  sliderHigh = createSlider(-6, 6, 0, 0.1)
  sliderHigh.input(sliderHighEvent)

  playBut = createButton('play')
  playBut.mousePressed(playTrans)

  // for (var _i = 0; _i < IMAGES; _i++) {
  //   seq1[_i] = loadImage("seq2/head-" + _i + ".jpg");
  //   seq2[_i] = loadImage("seq2/eyeLeft-" + _i + ".jpg");
  //   seq3[_i] = loadImage("seq2/eyeRight-" + _i + ".jpg");
  //   seq4[_i] = loadImage("seq2/mouth-" + _i + ".jpg");
  //   seq5[_i] = loadImage("seq2/nose-" + _i + ".jpg");
  //   seq6[_i] = loadImage("seq/name-" + _i + ".jpg");
  // }

}
var drawTest = false

function draw() {


  lowHTML.html(sliderLow.value())



  blendMode(BLEND)
  background(255)
  var level1 = round(map(meter40.getLevel(), levelMin, 0, 0, mapMax));
  var level2 = round(map(meter160.getLevel(), levelMin, 0, 0, mapMax));
  var level3 = round(map(meter640.getLevel(), levelMin, 0, 0, mapMax));
  var level4 = round(map(meter2560.getLevel(), levelMin, 0, 0, mapMax));
  var level5 = round(map(meter10240.getLevel(), levelMin, 0, 0, mapMax));



  if (level1 <= 0) {
    level1 = 0;
  }
  if (level2 <= 0) {
    level2 = 0;
  }
  if (level3 <= 0) {
    level3 = 0;
  }
  if (level4 <= 0) {
    level4 = 0;
  }
  if (level5 <= 0) {
    level5 = 0;
  }

  if (level1 >= 99) {
    level1 = 99;
  }
  if (level2 >= 99) {
    level2 = 99;
  }
  if (level3 >= 99) {
    level3 = 99;
  }
  if (level4 >= 99) {
    level4 = 99;
  }
  if (level5 >= 99) {
    level4 = 99;
  }

  var dance = round(env2.value * 10)
  var dance2 = round(env2.value * 7)
  var dance3 = round(env2.value * 5)

  image(seqBody[level1], 0, -10, width, height+10);
  blendMode(MULTIPLY)
  image(headArray[headArraySignal.value][level2], 0, -10+dance, width, height+10);
  image(mouthArray[mouthArraySignal.value][level3], 0, -10+dance2, width, height+10);
  image(eyeLeftArray[eyeLeftArraySignal.value][level4], 0, -10+dance3, width, height+10);
  image(eyeRightArray[eyeRightArraySignal.value][level5], 0, -10+dance3, width, height+10);

  var c = get()
  for (var iX = 0;iX<30;iX++){
    for (var iY = 0;iY<30;iY++){
      var forW = width/round(gridW.value+random(13,15))
      var forH = height/round(gridW.value+random(13,15))
      blend(c,iX*forW,iY*forH,forW,forH,iX*forW+(random(-1*copyJitter.value,copyJitter.value)/1),iY*forH+(random(-1*copyJitter.value,copyJitter.value)/1),forW+round(random(-1,1)*copyJitter.value),forH+round(random(-1,1)*copyJitter.value),BLEND)
    }
  }
  // blendMode(MULTIPLY)
  image(seqName[round(env.value * 98)], 0, 0, width, height);

  // angleMode(DEGREES)

  // image(seq1[frameCount%96], 0, 0, width, height);
  // blendMode(MULTIPLY)
  // image(seq2[frameCount%98], 0, 0, width, height);
  // image(seq3[frameCount%99], 0, 0, width, height);
  // image(seq4[frameCount%97], 0, 0, width, height);
  // image(seq5[frameCount%95], 0, 0, width, height);



  // ellipse(83, 250, 15,level1*5);
  // ellipse(166, 250, 15,level2*5);
  // ellipse(250, 250, 15,level3*5);
  // ellipse(334, 250, 15,level4*5);
  // ellipse(417, 250, 15,level5*5);

}

function playTrans() {
  // Tone.Transport.position = "0:0:0"
// Tone.Transport.position = "0"
// compVal.value = 0
  gridW.value = -14
  copyJitter.value=1
  headArraySignal.value=0
  mouthArraySignal.value=0
  eyeLeftArraySignal.value=0
  eyeRightArraySignal.value=0
  Tone.Transport.bpm.value = 128
  Tone.Transport.start(0);
  player.sync().start().stop("+4:0")
  Tone.Transport.scheduleRepeat(function(time) {
    env.triggerAttack()
  }, "0:2", "+0:0:0","4:0");
  Tone.Transport.scheduleRepeat(function(time) {
    env2.triggerAttack()
  }, "0:1", "+0:0:0","4:0");
  gridW.rampTo(14,"1:3","+2:0")
  copyJitter.rampTo(9,"1:0","+2:2")
  copyJitter.rampTo(19,"0:1","+3:2")
  copyJitter.rampTo(29,"0:0.5","+3:3.5")
  Tone.Transport.schedule(function(time){
    gridW.value = -14
    copyJitter.value=1
    headArraySignal.value=0
    mouthArraySignal.value=0
    eyeLeftArraySignal.value=0
    eyeRightArraySignal.value=0
  },"+4:0")
  Tone.Transport.schedule(function(time){
    eyeLeftArraySignal.value=2
    eyeRightArraySignal.value=2
  },"+0:2")
  Tone.Transport.schedule(function(time){
    eyeLeftArraySignal.value=0
    eyeRightArraySignal.value=0
    mouthArraySignal.value=1
  },"+1:0")
  Tone.Transport.schedule(function(time){
    headArraySignal.value=1
    eyeLeftArraySignal.value=3
    eyeRightArraySignal.value=3
  },"+1:2")
  Tone.Transport.schedule(function(time){
    eyeLeftArraySignal.value=1
    eyeRightArraySignal.value=1
    mouthArraySignal.value=2
  },"+2:0")
  Tone.Transport.schedule(function(time){
    headArraySignal.value=2
    eyeLeftArraySignal.value=4
    eyeRightArraySignal.value=4
  },"+3:0")

  // compVal.rampTo(29,"1:0","+0")

  // Tone.Transport.scheduleRepeat(function(time) {
  //   compVal.value = 0
  //   compVal.rampTo(29,"0:3",)
  //   // compVal.rampTo(0,"0:1","+0:2")
  // }, "1", "+0:0:0","4:0");
  // Tone.Transport.pause("8:0")

  // Tone.Transport.schedule(function(time){
  //   Tone.Transport.stop()
  //
  //   console.log("stopped??")
  // },"6:0")
  //
  // console.log("hi fucko")
}


function sliderLowEvent() {
  eq.low.value = sliderLow.value()
}

function sliderMidEvent() {
  eq.mid.value = sliderMid.value()
}

function sliderHighEvent() {
  eq.high.value = sliderHigh.value()
}
