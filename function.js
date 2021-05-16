//get state function
getState(){
    var gameStateRef  = database.ref('______');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

//update function
update(state){
    database.ref('/').update({                                           // "/" refers to whole database
      gameState: state                                         
    });
  }

//fly() 
fly(){
    this.sling.bodyA = null;
}

//display()
display(){
    image(this.sling1,200,20);
    image(this.sling2,170,20);
    if(this.sling.bodyA){
        var pointA = this.sling.bodyA.position;
        var pointB = this.pointB;
        push();                                                 //push function is for pushing the code
        
        stroke(48,22,8);
        if(pointA.x < 220) {
            strokeWeight(7);
            line(pointA.x - 20, pointA.y, pointB.x -10, pointB.y);
            line(pointA.x - 20, pointA.y, pointB.x + 30, pointB.y - 3);
            image(this.sling3,pointA.x -30, pointA.y -10,15,30);
        }
        else{
            strokeWeight(3);
            line(pointA.x + 25, pointA.y, pointB.x -10, pointB.y);
            line(pointA.x + 25, pointA.y, pointB.x + 30, pointB.y - 3);
            image(this.sling3,pointA.x + 25, pointA.y -10,15,30);
        }
       
        
        pop();                                          //pop function is for stopping code 
    }
}
}

//score()
score(){
    if (this.Visiblity < 0 && this.Visiblity > -1005){
      score++;
    }
  }

//World.add()
World.add(world, this.body);

//crontrols
if(keyIsDown(UP_ARROW) && player.index !== null){
    player.distance +=10
    player.update();
  }

//gamestate = 2
if(player.distance > 3860){
    gameState = 2;
  }

  //end()
  end(){
      console.log("_______")
  }

//hide()
hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

//constructor for elements
constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');

//update count
updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

//get Count
getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

 //update()
 update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

//static getPLayerInfo()
static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}

//game state changes with function draw()
function draw(){
    if(playerCount === 4){
      game.update(1);
    }
    if(gameState === 1){
      clear();
      game.play();
    }
    if(gameState === 2){
      game.end();
    }
  }
  