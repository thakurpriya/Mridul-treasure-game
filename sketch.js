var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState = PLAY;
var gameOver,gameOverImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  
  gameOverImg = loadImage("gameOver.png");
  
}

function setup(){
  
createCanvas(1000,600);


// Moving background
path = createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityY = 4;

gameOver = createSprite(200,245);
gameOver.visible= false;
gameOver.addImage(gameOverImg);
      
//creating boy running
boy = createSprite(width/2,height-40,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

cashG = new Group();
diamondsG = new Group();
jwelleryG = new Group();
swordGroup = new Group();

}

function draw() {
  background(0);

  if(gameState === PLAY){

    if(path.y > height ){
      path.y = height/2;
    }

    boy.x = World.mouseX;

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      treasureCollection = treasureCollection + 50;
      console.log("cash");
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      console.log("daimond");
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 10;  
    }
    else if(jwelleryG.isTouching(boy)) {
       jwelleryG.destroyEach();
       treasureCollection = treasureCollection + 20;
     }
    else if(swordGroup.isTouching(boy)){
      gameState = END;
    }
  }

  if(gameState === END){    
    gameOver.visible = true;
    boy.addAnimation("SahilRunning",endImg);
    boy.x=200;
    boy.y=300;
    cashG.destroyEach();
    cashG.setVelocityEach(0);
    diamondsG.destroyEach();
    diamondsG.setVelocityEach(0);
    jwelleryG.destroyEach();
    jwelleryG.setVelocityEach(0);
    swordGroup.destroyEach();
    swordGroup.setVelocityEach(0);
    path.velocityY = 0;
  }
  
  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 300;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 300;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 300;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 300;
  swordGroup.add(sword);
  }
}