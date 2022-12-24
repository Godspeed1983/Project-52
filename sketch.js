var PLAY = 1;
var END = 0;
var gameState = PLAY;


var Bird,Sky;
var Pipe1,Pipe2;
var ground,bg;

var Pipe1Img,Pipe2Img;
var BirdImg,GroundImg,Crashed,bgImg;
var gameOver ,restart;
var gameOverImg,restartImg;
var obstaclesGroup, obstacle1Group,obstacle, obstacle1;




function preload () {
  bgImg = loadImage("bg.png");
  GroundImg = loadImage("Ground 1.png");
  BirdImg = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");
  Pipe1Img = loadImage("pipe.png");
  Pipe2Img = loadImage("pipedown.png");
  Crashed = loadAnimation("bird.png");
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}








function setup() {
  createCanvas(700,600);
  


  ground = createSprite(width/2,height-10,500,300);
  ground.addImage(GroundImg);
  ground.x = ground.width/2;
  ground.scale=1;

  Bird=createSprite(120,200,25,25);
  Bird.addAnimation("BirdFlying",BirdImg)
  Bird.scale=0.2;

  Bird.setCollider("circle",0,0,60);
  Bird.debug = false;
  
  obstaclesGroup = new Group();
  obstacle1Group = new Group();

  score = 0;


  gameOver = createSprite(330,220);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(330,300);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.3;
  restart.scale = 0.21;

   Sky = createSprite(500,5,1000,10)
  Sky.visible = false;

  if(keyDown("space")) {
    Bird.velocityY = -10;
  }










}

function draw() {
  background(bgImg); 
  fill("white") 
  textSize(25)
  text("Score "+ score, 120,50);
  

  if(gameState === PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -4 ;
    spawnObstacle1();

    spawnObstacles();

  }

  if (ground.x < 0){
    ground.x = ground.width/2;
  }


  if(keyDown("space")) {
    Bird.velocityY = -10;
   
  
}


  Bird.velocityY = Bird.velocityY + 0.9;

  if(Bird.isTouching(ground)){

    gameState = END;

}
if(obstacle1Group.isTouching(Bird)){

  gameState = END;

}

  if(obstaclesGroup.isTouching(Bird)){

    gameState = END;

}
if(Bird.isTouching(Sky)){

  gameState = END;

}



if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  ground.velocityX = 0;
  Bird.velocityY = 0
  
  obstacle1Group.setLifetimeEach(-1);
  obstacle1Group.setVelocityXEach(0);

obstaclesGroup.setLifetimeEach(-1);
 obstaclesGroup.setVelocityXEach(0);
 
}

if(mousePressedOver(restart)) {
 restart1();
 
}









  drawSprites();
  
  
}
function spawnObstacles(){
  if (frameCount % 110 === 0){
   obstacle = createSprite(700,500,10,10);
    obstacle.addImage(Pipe1Img);
     obstacle.scale = 0.4;
     obstacle.lifetime = 130;
obstaclesGroup.add(obstacle);
obstacle.velocityX = -6 
if(obstacle.x>120)
score+=1
  }
 }

 function spawnObstacle1() {
  
  if (frameCount % 120 === 0) {
     obstacle1 = createSprite(700,100,10,10);
    obstacle1.y = Math.round(random(80,120));
    obstacle1.addImage(Pipe2Img);
    obstacle1.scale = 0.4;
    obstacle1.velocityX = -6;
    obstacle1.lifetime = 130;
    
    score.depth = obstacle1.depth;
    score.depth = score.depth + 1;
    
    
    obstacle1Group.add(obstacle1);
  }
}
 function restart1(){
  gameState=PLAY;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
  obstacle1Group.destroyEach();
  obstaclesGroup.destroyEach();
  Position();
 }

 function Position(){
  Bird.destroy();
  Bird=createSprite(120,200,25,25);
  Bird.addAnimation("BirdFlying",BirdImg)
  Bird.scale=0.2;
  Bird.setCollider("circle",0,0,60);
 }