var dog,sadDog,happyDog;
var food,foodImg;
var feed; 
var addFood;
var database;
var fedTime,lastFed;
var dog_name,enter_button,greeting;
var foodData;

function preload(){
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
  foodImg = loadImage("Milk.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  console.log(database);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  food = new Food();

  feed = createButton("Feed The Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food!");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog_name = createInput("Pet_name");
  dog_name.position(850,350);

  enter_button = createButton("Enter");
  enter_button.position(850,380);

  greeting = createElement('h2');

}

function draw() {
  background(46,139,87);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  //display lastFed time
  fill(255,255,254);
  textSize(15);
  if(lastFed>12){
    text("Last Feed : " + lastFed%12 + " PM",350,30);
  }
  else if(lastFed===12){
    text("Last Feed : 12 PM",350,30);
  }
  else if(lastFed===0){
    text("Last Feed : 12 AM",350,30);
  }
  else if(lastFed>0 && lastFed<12){
    text("Last Feed : " + lastFed + " AM",350,30);
  }

  enter_button.mousePressed(function(){
    dog_name.hide();
    enter_button.hide();
    var name = dog_name.value();
    greeting.html("Hey"+name+"!");
    greeting.position(900,350);
  })

  food.food_finished();

  food.display();

  drawSprites();
  
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  food.deductFood(1);
  food.getFoodStock();
  dog.x = 700;
}

//function to add food in stock
function addFoods(){
  food.addFood(1);
}
