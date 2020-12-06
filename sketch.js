
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstaclesImage;
var ground, invisGround;
var FoodGroup, obstacleGroup;
var gameState, PLAY, END;
var score;
score = 0;
PLAY = 0;
END = 1;
gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50, 350);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(200, 380, 400, 10);
  
  invisGround = createSprite(200, 385, 400, 10);
  invisGround.visible = false;
  
  FoodGroup = new Group();
  RockGroup = new Group();
}


function draw() {
  background("lightblue");
  
  text("score:  " + score, 330, 30);
  
  monkey.collide(invisGround);
  
  if(gameState === PLAY){
  monkey.velocityY = monkey.velocityY + 0.5;

  
  if(keyDown("space") && monkey.y > 330){
    monkey.velocityY = monkey.velocityY - 4;
  }

  if(FoodGroup.isTouching(monkey)){
    score = score + 2;
    FoodGroup.destroyEach();
  }
  
  bananas();
  obstacles();
    
  if(RockGroup.collide(monkey)){
    gameState = END
  }
  
  if(gameState === END){
    FoodGroup.velocityX = 0;
    RockGroup.velocityX = 0;
  
    
  }
 
}

  drawSprites();
}


function bananas(){
  if(frameCount % 80 === 0){
    banana = createSprite(400, 300);
    banana.y = Math.round(random(190, 270));
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.velocityX = -5;
    banana.setLifetime = 80;
    FoodGroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(400, 360);
    obstacle.addImage(obstaclesImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    RockGroup.add(obstacle);
  }
  
}


