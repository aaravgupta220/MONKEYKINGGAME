var PLAY = 1;
var END = 0;
gameState = PLAY;
var monkey, monkey_running, monkey_stop;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var food;

function preload() {

  //loading images and animations

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  monkey_stop = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {

  //creating canvas
  createCanvas(600, 400);

  //creating monkey
  monkey = createSprite(25, 370, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  //creating infinite ground
  ground = createSprite(300, 395, 600, 10);
  ground.velocityX = -4;

  //creating groups
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  //default score
  score = 0;

  //default food
  food = 0;

}


function draw() {

  //adding bg
  background(180);

  //adding scoreboard
  stroke("black");
  textSize(20);
  fill("black");
  score = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + score, 400, 50);

  //preventing from falling out of the canvas
  monkey.collide(ground);

  if (gameState === PLAY) {

    if (ground.x > 0) {
      ground.x = ground.width / 2;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    //creating jump
    if (keyDown("space") && monkey.y > 358) {
      monkey.velocityY = -18;
    }

    //calling function
    bananas();
    obstacles();

    //colleting food
    if (bananaGroup.isTouching(monkey)) {
      bananaGroup.destroyEach();
    }


    //hitting obstacles
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }

  } else if (gameState === END) {

    text("GAME OVER", 200, 200);

    ground.velocityX = 0;
    monkey.velocityY = 0;

    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

  }

  //drawing sprites on canvas
  drawSprites();

}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 20, 20);
    banana.addImage("bana", bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 280));
    bananaGroup.add(banana);
    banana.setlifetime = 120;
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 385, 20, 20);
    obstacle.addImage("rocks", obstacleImage);
    obstacle.velocityX = -5;
    obstacle.x = Math.round(random(500, 600));
    obstacle.scale = 0.2;
    obstacle.lifetime = 120;
    obstacleGroup.add(obstacle);
  }
}