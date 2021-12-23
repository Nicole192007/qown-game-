var score = 0;

var jet,earthbg,missile,asteroid1,asteroid2,coin,sound;
  
var jetImg,missileImg,earthbgImg,asteroid1Img,asteroid2Img,coinImg;
 
var asteroid1Group,asteroid2Group,coinGroup;

var gameState=1
var life =5;
var score=0;

function preload(){
 jetImg = loadImage("fighter jet.png")
 earthImg = loadImage("earth.png")
 missileImg = loadImage("missileImg.png")
 earthbgImg = loadImage("space bg2.jpg")
 asteroid1Img = loadImage("asteroid1.png")
 asteroid2Img = loadImage("asteroid2.png")
 coinImg = loadImage("coin.png")
 sound = loadSound("jet.wav")
 
}

function setup() {
  createCanvas(1500,750);
 
  earth= createSprite(700,800, 10,50 )
  earth.addImage(earthImg)
  earth.scale=1.9

  jet= createSprite(1400, 650, 50,50);
  jet.addImage(jetImg)
  jet.scale=0.4

  asteroid1Group =  new Group()
  asteroid2Group = new Group()
  coinGroup = new Group()
 
  

  heading= createElement("h1");
  scoreboard= createElement("h1");

  
}

function draw() {
  background(earthbgImg);
  
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:white'); 
  scoreboard.position(width-200,20)

  if(gameState===1){  

    jet.x= mouseX
    if (frameCount % 180 === 0) {
      asteroid1();
    }

    if (frameCount % 180 === 0) {
      asteroid2();
    }

    if (frameCount % 350 === 0){
      coin();
    }

    if(keyDown("space")){
      shootMissile();
      sound.play()
    }
    
    if(asteroid1Group.isTouching(missile)){
      asteroid1Group.destroy()
    }

    if(asteroid2Group.isTouching(missile)){
     asteroid1Group.destroyEach()
    }  

    if (asteroid1Group.isTouching(earth)){
    Gameover(asteroid1Group);
   }
    
    if (asteroid2Group.isTouching(earth)) {
    Gameover(asteroid2Group);
    }
    


  drawSprites();
}
function asteroid1(){
  asteroid1 = createSprite(random(10,500),random(10,20),40,40);
  asteroid1.addImage(asteroid1Img);
  asteroid1.scale = 0.1;
  asteroid1.velocityY = 3;
  asteroid1.lifetime = 400;
  asteroid1Group.add(asteroid1)
  }

  function asteroid2(){
    asteroid2 = createSprite(random(500,900),random(10,20),40,40);
    asteroid2.addImage(asteroid2Img);
    asteroid2.scale = 0.1;
    asteroid2.velocityY = 3;
    asteroid2.lifetime = 400;
    asteroid2Group.add(asteroid2)
    }

    function coin(){
      coin = createSprite(random(10,800),random(10,20),40,40);
      coin.addImage(coinImg);
      coin.scale = 0.2;
      coin.velocityY = 3;
      coin.lifetime = 400;  
    }

    function shootMissile(){
      missile= createSprite(1400,650, 50,50 )
      missile.x= jet.x-1
      missile.addImage(missileImg)
      missile.scale=0.12
      missile.velocityY= -16
    }

    function coincollision(coinGroup){
      if (life > 0) {
         score=score+1;
      }
  
      missileGroup.destroyEach()
      asteroidGroup.destroyEach()
  }
  function Gameover(asteroidGroup){
  
    life=life-1;
    asteroidGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}
}