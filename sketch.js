const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

// creating variables
var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats = [];

//Preloading images
function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}


function setup() {
  //creating canvas, engine and world
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //changing the angle to change which direction the cannonball goes
  angleMode(DEGREES)
  angle = 15

  //creating rectangle and loading images for the ground
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  //creating tower
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  //creating cannon with a seperate js file 
  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  //background creation
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();
  
  //function for creating more boats and display
  showBoats();

  //for loop, producing more cannonballs
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  //displaying cannon function 
  cannon.display();
}

function keyPressed() {
  //command is given so that when pressing down arrow, the cannonball is fired at the specific angle
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

//user defined function for process cannon balls 
function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

//user defined function to display and move the boats towards the tower 
function showBoats() {
  //checking whether the array is not empty and processing the same by giving random postion 
if(boats.length>0) {
  if(
    boats[boats.length-1] === undefined || 
    boats [boats.length-1].body.position.x < width-300
  ) {
    var positions = [-40, -60, -70, -20];
    var position = random(positions);
   var boat = new Boat(width, height - 100, 170, 170, position);
   boats.push(boat);
  }
  for(var i=0; i<boats.length; i++) {
    if(boats[i]) {
      //set velocity is moving the boat from right to left
      Matter.Body.setVelocity(boats[i].body,{x:-0.9, y:0});
      boats[i].display()
    }
  }
}

// if arrays are empty we are creating a new boat and adding to the empty array
else {
  var boat = new Boat(width, height - 60, 170, 170, -60); 
  boats.push(boat); 
}


}
