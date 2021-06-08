var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var runner1,runner2,runners;
var runnerImg1,runnerImg2;

var fruits,fruitsGroup;
var fruitImg1,fruitImg2,fruitImg3;
var obstacles,obstacle1,obstacle2,obstacleGroup;
var obstacleImg1,obstacleImg2;
var tree,treeImg,road,roadImg;
var flag,flagImg;

var runner1score = 0;
var runner2score = 0;

function preload(){
  runnerImg1 = loadImage("images/running man 2.jpg");
  runnerImg2 = loadImage("images/running-man.jpg");
  fruitImg1 = loadImage("images/apple.png");
  fruitImg2 = loadImage("images/banana.png");
  fruitImg3 = loadImage("images/melon.png");
  obstacleImg1 = loadImage("images/spike - 1.png");
  obstacleImg2 = loadImage("images/spike - 2.png");
  treeImg = loadImage("images/tree.png");
  roadImg = loadImage("images/track.jpg");
  flagImg = loadImage("images/flag.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  console.log(displayWidth);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  fruitsGroup = new Group();
  obstacleGroup = new Group();
}


function draw(){
  background("lightblue");

  if(playerCount === 2){
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
