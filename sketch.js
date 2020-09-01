//Create variables here
var dog , database , happyDog , foodS, dogImage
var foodObject
var dinner =  "";
var lunch = "";
var breakfast = ""

function preload()
{
dogImage = loadImage("images/dog.png");

happyImage = loadImage("images/happyDog.png");
}

function setup() {
  createCanvas(500, 500);
  
   database = firebase.database();
   var foodStock = database.ref('Food');
   foodStock.on("value", readPosition);

   

   dog = createSprite(250,350,10,10);
   dog.scale = 0.2;
   dog.addImage("dog" , dogImage)
  
   database = firebase.database();
  
   foodObject = new Food()


   feed = createButton("Feed the dog");
   feed.position(450,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(650,95);
   addFood.mousePressed(addFoods);
   
   
}


function draw() {  

 background(46,139,87);

 fill("white")
 text(dinner , 100,100);
 text(lunch , 100,100)
 text( breakfast, 100,100)

 getBackgroundImage();

 foodObject.display();

drawSprites();

}

function readPosition(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS)

}

function writePosition(x){
  if(x <=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').set({
    'Food' : x
  });
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food : foodS
  })

}

function feedDog(){
  dog.addImage("dog",happyImage)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref('/').update({
  Food:foodObject.getFoodStock()
 })
}

async function getBackgroundImage(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

 
  
  var dateTime = responseJSON.datetime;


  var hour = dateTime.slice(11,13);

   if(hour>=09 && hour<=12){
    breakfast = "BREAKFAST TIME !! , FEED TOTO 1 BOTTLE OF MILK"
   }
   
   if(hour>=12 && hour<=15){
    lunch = "LUNCH TIME !! , FEED TOTO 3 BOTTLES OF MILK"
   }

   if(hour>=20 && hour<=23){
     dinner = "DINNER TIME !! , FEED TOTO 2 BOTTLES OF MILK"
   }
     
   }

  




