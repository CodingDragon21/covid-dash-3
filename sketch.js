var playerRunner, player
var edges;
var ground, movingGround;
var ground2;
var cloud, movingCloud;
var cloud2, movingCloud2;
var negative, negativeImg, positive
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var negativeGroup;
var cloudGroup;
var playerCollide;
var gameOver, gameOverText;
var restartButton, button;
var jumpSound;
var collideSound;
var checkPointSound;
var maskImg, mask
var bgImg
var bg
var change = true, time = 20
var gameState = "positive";

//var highScore = 0
localStorage['HighScore'] = 0
function preload() {
  playerRunner = loadAnimation(
    "./assets/costume1.svg",
    "./assets/costume2 (1).svg",
    "./assets/costume3.svg",
    "./assets/costume4.svg",
    "./assets/costume5.svg",
    "./assets/costume6.svg"
  );

  movingGround = loadImage("./assets/ground2.png");
  movingCloud = loadImage("./assets/cloud1.png");
  movingCloud2 = loadImage("./assets/cloud2.png");
  negativeImg = loadAnimation("./assets/negative.svg");
  // gameOver = loadImage("./assets/gameover.svg");
  restartButton = loadImage("./assets/restart.svg");
  collideSound = loadSound("collided.wav");
  checkPointSound = loadSound("checkPoint.mp3");
  jumpSound = loadSound("jump.wav");
  maskImg = loadImage("./assets/mask.svg")
  bgImg = loadImage("./assets/bg.png")
  positive = loadAnimation("./assets/costume2 (1).svg")
}
function setup() {
  createCanvas(4500, windowHeight - 30);

  bg = createSprite(width / 2, height / 2, 4500, height)
  bg.addImage("background", bgImg)
  bg.scale = 0.86

  //create a trex sprite
  player = createSprite(50, height - 200, 20, 50);
  player.addAnimation("running", playerRunner);
  player.scale = .89;
  //player.debug = true;
  player.setCollider("rectangle", 0, 0, 30, 100);


  ground2 = createSprite(width / 2, height, width, 125);
  ground2.visible = false;



  /*gameOverText = createSprite(width/2, height/2);
  gameOverText.addImage("gameOver", gameOver);
  gameOverText.visible = false;
  
  button = createSprite(width/2, height/2 + 60);
  button.addImage("restart", restartButton);
  button.visible = false;
  
  var anynumber = Math.round(random(20, 100));
  console.log(anynumber);*/

  negativeGroup = createGroup();
  cloudGroup = createGroup();
  maskGroup = createGroup()
}

function draw() {
  background("white");
  console.log(camera.position.x)
  if (keyIsDown(UP_ARROW) && player.y >= 520) {
    player.velocityY = -9;
    // jumpSound.play();
    //touches = []  
  }


  player.velocityY = player.velocityY + 0.3;

  player.x = camera.position.x - 2100
  bg.setVelocity(-6, 0)
  if (gameState === "positive") {
 
    for (var i = 0; i < negativeGroup.length; i++) {
      if (negativeGroup.get(i).isTouching(player)) {
        // change = true
  
        negativeGroup.get(i).changeAnimation("red")
        score = score + 1;
      }
    }
    for (var i = 0; i < maskGroup.length; i++) {
      if (maskGroup.get(i).isTouching(player)) {
  
        gameState = "protected"
        
        
      }
      
    }
  
  }

  if(gameState === "protected"){
    negative.changeAnimation("blue")
    setTimeout(function(){ gameState = "positive"}, 5000);
    console.log(gameState)
  }
  


  //player.setVelocity(5,0)
  //increase the speed of ground


  /*edges = createEdgeSprites();
  
  if (gameState === PLAY) {
   

    if (score % 100 === 0 && score > 0) {
      checkPointSound.play();
    }

    
    score = score + Math.round(getFrameRate() / 60);

    spawnCactus();
    spawnClouds();

    if (trex.isTouching(obstacleGroup)) {
      gameState = END;
      collideSound.play();
    }
  } else if (gameState === END) {
    ground.velocityX = 0;
    cloudGroup.setVelocityEach(0, 0);
    obstacleGroup.setVelocityEach(0, 0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    trex.changeAnimation("stillMotion", trexCollide);
    trex.velocityY = 0;
    gameOverText.visible = true;
    button.visible = true;
    
    if(mousePressedOver(button)||touches.length>0){
      button.visible = false
      gameOverText.visible = false
      reset();
    }
  }

   

  text("Score: " + score, width-170, 40);
  text("High Score: " + localStorage['HighScore'],width-100,40)
 */

  spawnNegative();
  spawnMask();

 
  
  //spawnClouds();
  player.collide(ground2);
  drawSprites();

}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(width + 20, height - 300, 40, 10);
    cloud.y = Math.round(random(10, 100));
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        cloud.addImage("movingCloud", movingCloud);
        break;
      case 2:
        cloud.addImage("movingCloud2", movingCloud2);
        break;
      default:
        break;
    }

    cloud.scale = 0.25;
    cloud.velocityX = -(4 + (3 * score) / 100);
    cloud.lifetime = width / (4 + (3 * score) / 100);
    cloudGroup.add(cloud);
  }
}

function spawnNegative() {
  if (frameCount % 80 === 0) {


    negative = createSprite(width - 3100, height - 100);
    console.log(negative)
    negative.velocityX = -6

    negative.addAnimation("blue", negativeImg)
    negative.addAnimation("red", positive)
    negative.changeAnimation("blue")

    negative.depth = bg.depth
    negative.depth += 1
    negative.scale = 0.89;
    negative.lifetime = width / 5
    negativeGroup.add(negative);
  }
}

function spawnMask() {
  if (frameCount % 120 === 0) {

    mask = createSprite(width - 3100, height - 200);
    mask.velocityX = -6
    mask.addImage("mask2", maskImg)

    mask.depth = bg.depth
    mask.depth += 1
    mask.scale = 0.3;
    mask.lifetime = width / 5
    maskGroup.add(mask);
  }


}
function reset() {
  //score to 0
  gameState = PLAY


  obstacleGroup.destroyEach()
  cloudGroup.destroyEach()

  trex.changeAnimation("running", trex_running);
  if (score > localStorage['HighScore']) {
    localStorage['HighScore'] = score
  }
  score = 0
  //obstacles and clouds has to go back

  //gameState has to be play


}

