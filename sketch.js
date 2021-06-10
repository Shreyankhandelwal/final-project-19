//creating global variables
var bg, backgroundImage;

var boy, boyImage;
var boyLeft, boyRight, boyUpDown, boyCollide;
var ghost, ghost2,ghost3, ghostImage;
var coin, coinImage;

var gameover, gameoverImage;
var reset, resetImage;

var score = 0
var maxScore = 0

var play = 1, end = 0;
var gamestate = play;

var coinsGroup, ghostsGroup;

var edges;

function preload() {

  backgroundImage = loadImage("backgrndImg.jpg");

  boyImage = loadAnimation("1.png");
  boyRight = loadAnimation("2.png", "3.png", "4.png", "5.png", "6.png");
  boyLeft = loadAnimation("boy1.png", "boy2.png", "boy3.png", "boy4.png", "boy5.png", "boy6.png");
  boyUpDown = loadAnimation("jump.png");
  boyCollide = loadAnimation("collide.png");

  ghostImage = loadImage("ghost.png");
  coinImage = loadImage("coin.png");

  gameoverImage = loadImage("gameover.png");
  resetImage = loadImage("reset.png");

}


function setup() {

  createCanvas(600, 400);

  edges = createEdgeSprites();

  bg = createSprite(300, 200, 600, 600);
  bg.addImage(backgroundImage);
  bg.scale = 1;
  bg.velocityX = -2;

  boy = createSprite(30, 300, 20, 20);
  boy.addAnimation("boy_standing", boyImage);
  boy.addAnimation("right", boyRight);
  boy.addAnimation("left", boyLeft);
  boy.addAnimation("up/down", boyUpDown);
  boy.addAnimation("collided", boyCollide);
  boy.scale = 0.6;

  gameover = createSprite(260, 150, 20, 20);
  gameover.scale = 0.8;
  gameover.addImage("gameover", gameoverImage);
  gameover.visible = false;

  reset = createSprite(250, 250, 20, 20);
  reset.scale = 0.2;
  reset.addImage("reset", resetImage);
  reset.visible = false;
  
  coinsGroup = new Group();
  ghostsGroup = new Group();

}


function draw() {

  background(0);

  if (gamestate === play) {

    createCoins();
    createGhosts();

    bg.velocityX = -(4 + 2*score/100) 

    
    if (bg.x < 0) {

      bg.x = bg.width/2;

    }

    if (keyDown("LEFT_ARROW")) {

      boy.x = boy.x - 5;
      boy.changeAnimation("left", boyLeft);

    }

    if (keyDown("RIGHT_ARROW")) {

      boy.x = boy.x + 5;
      boy.changeAnimation("right", boyRight);
      
    }

    if (keyDown("UP_ARROW")) {

      boy.y = boy.y - 5;
      boy.changeAnimation("up/down", boyUpDown);

    }

    if (keyDown("DOWN_ARROW")) {

      boy.y = boy.y + 5;
      boy.changeAnimation("up/down", boyUpDown);

    }

    if (coinsGroup.isTouching(boy)) {

      score = score + 25;
      coinsGroup.destroyEach();

    }

    if (ghostsGroup.isTouching(boy)) {

      gamestate = end;
      
    }

  }
  

  if (gamestate === end) {

    gameover.visible = true;
    reset.visible = true;

    ghostsGroup.setVelocityXEach = 0;
    ghostsGroup.setVelocityYEach = 0;
    coinsGroup.setVelocityXEach = 0;
    bg.velocityX = 0;

    ghostsGroup.destroyEach();
    coinsGroup.destroyEach();

    if(score > maxScore){
      maxScore = score;
    }

    boy.changeAnimation("collided", boyCollide);

    if (mousePressedOver(reset)) {

      resetGame();
      gamestate = play;

    }

  }

  boy.bounceOff(edges);

  drawSprites();

  fill("red");
  textSize(25);
  textFont("Ink Free");
  text("SCORE: " + score, 300, 30)
  text("Max Score: " + maxScore, 280, 60)
}


function createCoins() {

  if (frameCount % 200 === 0) {

    coin = createSprite(700, 300, 20, 20);
    coin.y = Math.round(random(150, 300));
    coin.addImage(coinImage);
    coin.velocityX = -5;
    coin.scale = 0.01;


    boy.depth = coin.depth + 1;
    coin.setLifetime = 600;
    coinsGroup.add(coin);

  }

}


function createGhosts() {

  if (frameCount % 100 === 0) {

    ghost = createSprite(700, 300, 20, 20);
    ghost.y = Math.round(random(50, 150));
    ghost.addAnimation("ghost", ghostImage);
    ghost.scale = 0.08;
    ghost.velocityX = -7;

    ghost.setCollider("circle",0,0,100)
    ghost.setLifetime = 800;
    ghostsGroup.add(ghost);

  }
    if(frameCount % 150 === 0){
    ghost2 = createSprite(700, 300, 20, 20);
    ghost2.y = Math.round(random(180, 280));
    ghost2.addAnimation("ghost2", ghostImage);
    ghost2.scale = 0.08;
    ghost2.velocityX = -9;

    ghost2.setCollider("circle",0,0,200)
    ghost2.setLifetime = 800;
    ghostsGroup.add(ghost2);

  }

  if (frameCount % 250 === 0) {

    ghost3 = createSprite(700, 300, 20, 20);
    ghost3.y = Math.round(random(300, 380));
    ghost3.addAnimation("ghost", ghostImage);
    ghost3.scale = 0.08;
    ghost3.velocityX = -5;

    ghost3.setCollider("circle",0,0,100)
    ghost3.setLifetime = 800;
    ghostsGroup.add(ghost3);
  }

}

function resetGame() {

  score = 0;

  boy.changeAnimation("boy_standing", boyImage);
  boy.x = 30;
  boy.y = 300;

  bg.velocityX = -2;

  gameover.visible = false;
  reset.visible = false;

}