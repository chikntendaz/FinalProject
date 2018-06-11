var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

var db = firebase.database();
var s;

var circleRow = 3;
var circleColumn = 5;
var boxHeight = 40;
var boxWidth = 40;
var box = (canvas.width-boxWidth)/2;
var boxX = (canvas.height-boxHeight)/2;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var x = canvas.width/2;
var y = canvas.height/2;
var dx = 4;
var dy = -4;

document.getElementById("b1").style.display = "none";

function hide(){
  document.getElementById("home").style.display = "none";
  document.getElementById("home1").style.display = "none";
  document.getElementById("b").style.display = "none";
  document.getElementById("body").style.backgroundColor = "white";
  document.getElementById("b1").style.display = "block";

  document.getElementById("b1").addEventListener("click", function(){
    var score = db.ref('score');
     score.on('value', function(snapshot) {
     document.getElementById('p').innerHTML = snapshot.val();
    });
    s = s+1;
    score.set(s);
  })

drawBox();
draw();
}

function drawCircles(){
  var i = canvas.width/15;
  for(var upperX = i; upperX<=15*i; upperX=upperX+(3*i)){
      for(var upperY = i; upperY<=10*i; upperY=upperY+(2.4*i)){

        c.beginPath();
        c.arc(upperX,upperY,10,0,2*Math.PI);
        c.fillStyle = "red";
        c.fill();
        c.closePath();
      }
  }
}

function drawBox(){
  c.beginPath();
  c.fillStyle = "blue"
  c.rect(0,0,5000,5000);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "#0cff00"
  c.rect(box,boxX,boxWidth,boxHeight);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(550,300,100,300);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(900,300,100,300);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(150,200,500,100);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(150,500,500,100);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(900,200,300,100);
  c.fill();
  c.closePath();

  c.beginPath();
  c.fillStyle = "red";
  c.rect(900,500,500,100);
  c.fill();
  c.closePath();
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
  else if(e.keyCode == 38){
    upPressed = true;
  }
  else if(e.keyCode == 40){
    downPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  }
  else if(e.keyCode == 37){
    leftPressed = false;
  }
  else if(e.keyCode == 38){
    upPressed = false;
  }
  else if(e.keyCode == 40){
    downPressed = false;
  }
}

function draw(){
c.clearRect(0,0,canvas.width,canvas.height);
drawBox();
drawCircles();

if(box + dy < 5){
    box = canvas.width-50;
}
else if(box + dy > (canvas.width-10)-boxWidth){
  box = 10;
}

if(rightPressed){
  box += 6;
}
else if(leftPressed){
  box -= 6;
}
else if(upPressed){
  boxX -= 6;
}
else if(downPressed){
  boxX += 6;
}

requestAnimationFrame(draw);
}
