// p5.js maze path follower
// A shape moves through a list of coordinates (waypoints).
// Movement speed is controlled by moveSpeed.
// All moves are horizontal or vertical.

let img;
function preload() {
  img = loadImage('assets/maze1a.jpg')
}


let path = [
  // maze path and waypoints - the letter corresponds with a map i made
  //'a.png', to then use a coordinate checker code 
  // - https://editor.p5js.org/brynr/sketches/i_T8O0YRh

  { x: 77, y: 45 },//@
  { x: 79,  y: 93 },//a
  { x: 203, y: 91  },//b
  { x: 203, y: 188 },//j
  { x: 144, y: 185 },//i
  { x: 203, y: 188 },//j
  { x: 203, y: 91  },//b
  { x: 79,  y: 93 },//a
  { x: 80, y: 287 },//p
  { x: 143, y: 287 },//q
  { x: 147, y: 410 },//x
  { x: 238, y: 416 },//y
  { x: 243, y: 287},//r
  { x: 339, y: 288 },//s
  { x: 243, y: 287},//r
  { x: 238, y: 416 },//y
  { x: 147, y: 410 },//x
  { x: 66, y: 411 },//w
  { x: 66, y: 508 },//5
  { x: 329, y: 501 },//6
  { x: 330, y: 415 },//z
  { x: 413, y: 409 },//1
  { x: 418, y: 506 },//7
  { x: 411, y: 202},//l
  { x: 269, y: 196},//k
  { x: 279, y: 87 },//c
  { x: 388, y: 91 },//d
  { x: 394, y: 123 },//e
  { x: 486, y: 119 },//g
  { x: 488, y: 88 },//f
  { x: 487, y: 348 },//u
  { x: 573, y: 353 },//v
  { x: 568, y: 180},//m
  { x: 573, y: 353 },//v
  { x: 487, y: 348 },//u
  { x: 486, y: 119 },//g
  { x: 488, y: 88 },//f
  { x: 715, y: 94 },//h
  { x: 719, y: 185 },//o
  { x: 650, y: 188}, //n

  
  { x: 650, y: 429 },//3
  { x: 735, y: 434 },//4
  { x: 737, y: 257 },//t
  { x: 735, y: 434 },//4


  { x: 650, y: 429 },//3
  { x: 544, y: 436 },//2
  { x: 553, y: 509 },//8
  { x: 729, y: 508 },//9
  { x: 731, y: 555 },//10


 
];

let moverX, moverY;     // current position of the shape
let currentIndex = 0;   // which waypoint we are moving *towards*
let moveSpeed = 2;      // pixels per frame – change this to speed up / slow down
let gif;            // to hold the gif  
let canvas;

function setup() {
  canvas = createCanvas(800, 600);
  // Start at the first coordinate
  moverX = path[0].x;
  moverY = path[0].y;

  //creating gif
  gif = createImg('assets/goldrun1.gif');
 
  gif.style('pointer-events', 'none'); //so it doesn't interfere with mouse
  
  gif.style('position', 'absolute');  //snapping to the center

  gif.size(64,64); //size of the gif

 alert('Get to the end!') ;

}

function draw() {

  background(img);


  // Draw the path as a simple "maze line"
  stroke(200, 245, 242);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  // Draw waypoints
  noStroke();
  fill(200, 245, 242);
  for (let i = 0; i < path.length; i++) {
    circle(path[i].x, path[i].y, 8);
  }

  // Move along the path
  moveAlongPath();

  // Draw the moving shape (what I used to represent the mover code)
  //fill(0, 255, 150);
  //stroke(0);
  //strokeWeight(2);
 // rectMode(CENTER);
  //rect(moverX, moverY, 20, 20);

  control()
 glitch() //adds glitch effect to movement
 controlmover()
  framecount()
  gif.position(
      (moverX - 12) + canvas.position().x, 
    
    (moverY - 12) + canvas.position().y
  );
}


function control() {
//key is pressed = up, down, right, left
let S = 2;
if (keyIsDown(UP_ARROW)) {
  moverY -= S;
}
if (keyIsDown(DOWN_ARROW)) {
  moverY += S;
  //moverY -= S;
  //text("control",moverX, moverY - 15);
}
if (keyIsDown(LEFT_ARROW)) {
  moverX -= S;
}
if (keyIsDown(RIGHT_ARROW)) {
  moverX += S;
//go onto the waypoint near by
  let target = path[currentIndex + 1];
  let D = dist(moverX, moverY, target.x, target.y);
  if (D < 5) {
    moverX = target.x;
    moverY = target.y;
    currentIndex = (currentIndex + 1) % path.length;
}
}
}


function moveAlongPath() {


   //If we've reached the final point, stop (or you could loop)
  if (currentIndex >= path.length - 1) {
    return;
  }


  let target = path[currentIndex + 1];

  // Horizontal / vertical movement only
  let dx = target.x - moverX;
  let dy = target.y - moverY;


  // Move horizontally if needed
  if (abs(dx) > 0) {
    let stepX = constrain(abs(dx), 0, moveSpeed) * Math.sign(dx);
    moverX += stepX;

  }
  // Otherwise move vertically
  else if (abs(dy) > 0) {
    let stepY = constrain(abs(dy), 0, moveSpeed) * Math.sign(dy);
    moverY += stepY;
  }

  // If we've arrived at the target (exactly), go to the next point
  if (moverX === target.x && moverY === target.y) {
    currentIndex++;
  }



}
 


function controlmover() {
  //constrain the mover within the canvas
  moverX = constrain(moverX, 10, width - 10);
  moverY = constrain(moverY, 10, height - 10);
}


function framecount() {
  if (frameCount % 60 === 0) {
  movementSpeed = random(1, 4);
}
}
function glitch() {
let glitch = int(random(4));
if (glitch === 0) {
  moverY += random(-9, 5);
} else if (glitch === 1) {
  moverX += random(-9, 5);
} else if (glitch === 2) {
  moverY -= random(-9, 5);
} else if (glitch === 3) {
  moverX -= random(-9, 5);
}   
}

