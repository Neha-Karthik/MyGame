class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      console.log(player.index);
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        console.log("start function, playerCount"+ playerCount);
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    runner1 = createSprite(100,100,30,30);
    runner1.scale = 0.6;
    runner2 = createSprite(100,200,30,30);
    runner2.scale = 0.8;
    runners = [runner1,runner2];
    runner1.addImage(runnerImg1);
    runner2.addImage(runnerImg2);

    //tree = createSprite(2500,100,20,20);
    //tree.addImage(treeImg);
    //tree.scale = 0.2;

    //road = createSprite(900,500,50,displayHeight);
    //road.addImage(roadImg);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    //player.getCarsAtEnd();

    image(roadImg,100,400,displayWidth,50);
    image(roadImg,1650,400,displayWidth,50);
    image(roadImg,3200,400,displayWidth,50);

    image(treeImg,900,100,80,140);
    image(treeImg,1800,100,80,140);
    image(treeImg,2700,100,80,140);

    image(flagImg,0,displayHeight/2 - 200,120,120);
    image(flagImg,0,displayHeight/2 + 100,120,120);
    image(flagImg,4500,displayHeight/2 - 200,120,120);
    image(flagImg,4500,displayHeight/2 + 100,120,120);


    
    if(allPlayers !== undefined){

      //image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 50;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 250;
        //use data form the database to display the cars in y direction
        x = displayWidth + allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;

        if (index === player.index){
          ellipse(x,y,80,100);
          fill("black");
          runners[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = runners[index-1].x;
        }
      }
    }

    if(frameCount%80 === 0){
      fruits = createSprite(100,0,20,20);
      fruits.velocityY = 12;
      fruits.scale = 0.8;
      fruits.x = Math.round(random(200,3000));
      var rand = Math.round(random(1,3));
      switch(rand){
        case 1 : fruits.addImage("fruit1",fruitImg1);
        break;
        case 2 : fruits.addImage("fruit1",fruitImg2);
        break;
        case 3 : fruits.addImage("fruit1",fruitImg3);
        break;
      }
      fruitsGroup.add(fruits);

    }

    if(frameCount%100 === 0){
      obstacles = createSprite(100,0,20,20);
      obstacles.scale = 0.09;
      obstacles.x = Math.round(random(200,3000));
      obstacles.addImage("obstacle1",obstacleImg1);
      obstacles.velocityY = 12;

      obstacleGroup.add(obstacles);
    }

    if(frameCount%100 === 0){
      obstacles = createSprite(100,displayHeight,20,20);
      obstacles.scale = 0.09;
      obstacles.x = Math.round(random(200,3000));
      obstacles.addImage("obstacle1",obstacleImg2);
      obstacles.velocityY = -12;
      
      obstacleGroup.add(obstacles);
    }

    if(player.index !== null){
      for(var i=0;i<fruitsGroup.length;i++){
        if(fruitsGroup.get(i).isTouching(runners)){
          fruitsGroup.get(i).destroy();
          player.score = player.score+1;
          player.update();
        }
      }
    }

    if(player.index !== null){
      for(var i=0;i<obstacleGroup.length;i++){
        if(obstacleGroup.get(i).isTouching(runners)){
          obstacleGroup.get(i).destroy();
          player.score = player.score - 1;
          player.update();
          console.log(player.score);
        }
      }
    }

    //text(allPlayers.player1.name + allPlayers.player1.score,allPlayers.player1.distance,50);
    //text(allPlayers.player2.name + allPlayers.player2.score,allPlayers.player2.distance,100);

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.state = "running";
      player.distance +=10;
      player.update();
      //console.log(player.distance);
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    }

    if(player.score === 0){
      //player.distance +=
    }

    if(player.distance>3000){
      gameState = 2;
      player.rank = player.rank + 1;
      //player.updateCarsAtEnd(player.rank);
      text(player.name + " : "+ player.rank,displayWidth - 50,player.distance);
    }

    drawSprites();
  }

  end(){
    console.log("game is over");
    console.log(player.rank);
  }
}
