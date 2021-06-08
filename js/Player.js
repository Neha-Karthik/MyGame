class Player {
  constructor(){
    this.index = null;
    this.state = "start";
    this.name = null;
    this.distance = 0
    this.score = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      state:this.state,
      score:this.score
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  /*
  getCarsAtEnd(){
    var CarsAtEndRef = database.ref('CarsAtEnd');
    CarsAtEndRef.on("value",(data)=>{
      this.rank = data.val();
    })
  }

  updateCarsAtEnd(rank){
    database.ref('/').update({
      CarsAtEnd : rank
    });
  }
  */
}
