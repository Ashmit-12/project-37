var PLAY = 1;
var END = 0;
var reset,resetimage,gameover,gameoverimage,count;
var gameState = PLAY;
var trex,trexrunning,trexcollided;
var ground,groundimage;
var invisibleground;
var cloudimage;
var ob1,ob2,ob3,ob4,ob5,ob6;
var obstacleGroup,cloudGroup;
var jumpsound;
var diesound;
var checkpointsound;



function preload(){
trexrunning=loadAnimation("trex1.png","trex3.png","trex4.png");
trexcollided=loadAnimation("trex_collided.png");
groundimage=loadImage("ground2.png");
cloudimage=loadImage("cloud.png");
ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  resetimage=loadImage("restart.png");
  gameoverimage=loadImage("gameOver.png");
checkpointsound=loadSound("checkPoint.mp3");
  diesound=loadSound("die.mp3");
  jumpsound=loadSound("jump.mp3");
}
function setup(){
createCanvas(displayWidth,500);
trex=createSprite(50,150,20,20);
trex.addAnimation("running",trexrunning);
trex.addAnimation("cod",trexcollided);
trex.scale=0.5;
 // trex.debug=true;
  trex.setCollider("rectangle",0,0,20,20)
  
  ground=createSprite(displayWidth*10000,160,displayWidth,displayHeight*10000);
 

invisibleground=createSprite(0,160,displayWidth*10000,5);

  invisibleground.visible=true;
  obstacleGroup=new Group();
  cloudGroup=new Group();
  reset=createSprite(canvas.width/2,75,20,20);
  reset.addImage("image1",resetimage);
  reset.scale=0.5;
  gameover=createSprite(canvas.width/2,50,10,10);
  gameover.addImage("image2",gameoverimage);
  gameover.scale=0.5;
  count=0;
  
}
function draw(){
  background("lightblue");
  text("Score: "+ count, trex.position.x, 50);
trex.collide(invisibleground);
  if(gameState===1){
    var x;
    x=displayWidth;
    camera.position.x=trex.x;
   
  count = Math.round(World.frameRate/60)+count;
  trex.velocityX = +(6-(count/100));
  gameover.visible=false;
  reset.visible=false;
    
  if(keyDown("space")&&trex.y>=148){
  trex.velocityY=-15;
  jumpsound.play();
  }
  if(ground.x<0){
  ground.x=displayWidth/2;
  
  }
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds();
  spawnObstacles();
    if(count%100===0&& count>0){
    checkpointsound.play();
    }
    
    if(obstacleGroup.isTouching(trex)){
    gameState=END; 
      diesound.play();
    }
  }
 else if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY=0;
    trex.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("cod",trexcollided);
    obstacleGroup.setLifetimeEach(frameCount);
    cloudGroup.setLifetimeEach(frameCount);
    reset.visible=true;
    gameover.visible=true;
   
   if (mousePressedOver(reset)) {
      restart();
    }
  }
 
  drawSprites();
  
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(camera.position.x+800,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 600;
    //adjust the depth
    cloud.depth = trex.depth;
     trex.depth = trex.depth + 1;
    
    //add each cloud to the group
   cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.position.x+700,160,10,40);
    obstacle.velocityX = -2;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1: obstacle.addImage(ob1);
       break;
       case 2: obstacle.addImage(ob2);
       break;
       case 3: obstacle.addImage(ob3);
       break;
       case 4: obstacle.addImage(ob4);
       break;
       case 5: obstacle.addImage(ob5);
       break;
       case 6: obstacle.addImage(ob6);
       break;
       default:break;
   
   
   }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 500;
    //add each obstacle to the group
   obstacleGroup.add(obstacle);
  }
}
function restart(){
  gameState=1;

 
 trex.changeAnimation("running",trexrunning);
 obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
    count=0;
    trex.position.x=50;
}
