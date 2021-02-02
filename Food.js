class Food{
    constructor(){
        this.foodStock = 10;
        this.foodImg = loadImage("Milk.png");
    }

    display(){
        var x=80;
        var y=100;

        imageMode(CENTER);
        image(this.foodImg,660,220,70,70);

        if(this.foodStock!==0){
            for(var i=0; i<this.foodStock; i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
                x = x+30;
                imageMode(CENTER);
                image(this.foodImg,x,y,70,70);
            }
        }
    }

    food_finished(){
        if(this.foodStock === 0){
            dog.x = 800;
            dog.y = 200;
            dog.addImage(sadDog);
        }
    }

   deductFood(value){
       database.ref('/').set({
           'foods' : this.foodStock - value,
           'feedTime' : hour()
       })
       this.foodStock -= 1;
   }

   addFood(value){
    database.ref('foods').set({
        'foods' : this.foodStock + value
    })
    this.foodStock += 1;
   }

    getFoodStock(){
        var foodsRef = database.ref('foods');
        foodsRef.on("value",function(data){
            foodData = data.val();
        })  
        if(foodData<=0){
            database.ref('/').set({
                'foods' : 0,
                'feedTime' : hour()
            }) 
            this.foodStock = 0;
        }
    }
    
}
