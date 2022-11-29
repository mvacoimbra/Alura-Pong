//ball_variables
let x_ball = 300;
let y_ball = 200;
let diameter_ball = 25;
let x_ball_speed = 7;
let y_ball_speed = x_ball_speed;
let radius_ball = diameter_ball / 2;
let hit = false;
let points_player1 = 0;
let points_player2 = 0;

//player1_variables
let x_player1 = 10;
let y_player1 = 150;
let width_player1 = 18;
let height_player1 = 100;

//player2_variables
let x_player2 = 572;
let y_player2 = 150;
let width_player2 = width_player1;
let height_player2 = height_player1;
let y_player2_speed;
let miss_chance = 0;

//sounds
let score;
let pong;
let st;

function preload(){
  score = loadSound("ponto.mp3");
  pong = loadSound("raquetada.mp3");
  st = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  st.loop();
}

function draw() {
  background(20,100,20);
  show_ball();
  ball_movement();
  ball_collision();
  show_players();
  player1_movement();
  player2_movement();
  //player1_collision();
  players_collision();
  show_grid();
  show_points();
  score_points();
  unstuck();
}

function show_ball(){
  fill(255,255,0);
  noStroke();
  circle(x_ball, y_ball, diameter_ball);
}

function ball_movement(){
  x_ball += x_ball_speed;
  y_ball += y_ball_speed;
}

function ball_collision(){
    if (x_ball > width - radius_ball || x_ball < radius_ball){
    x_ball_speed *= -1
  }
    if (y_ball > height - radius_ball || y_ball < radius_ball){
    y_ball_speed *= -1
  }
}

function show_players(){
  fill(255, 255, 255);
  noStroke();
  rect(x_player1, y_player1, width_player1, height_player1)
  rect(x_player2, y_player2, width_player2, height_player2)
}

function player1_movement(){
  if (keyIsDown(UP_ARROW)) {
    y_player1 -= 7;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y_player1 += 7;
  }
}

function player2_movement(){
  y_player2_speed = y_ball - y_player2 - width_player2 / 2 - 30;
  y_player2 += y_player2_speed + miss_chance
  miss_chance_calc()
}

function player1_collision(){
  if (x_ball - radius_ball < x_player1 + width_player1 && y_ball - radius_ball < y_player1 + height_player1 && y_ball + radius_ball > y_player1){
    x_ball_speed *= -1
  }
}

function players_collision(){
  hit = collideRectCircle(x_player1, y_player1, width_player1, height_player1, x_ball, y_ball, radius_ball);
  if (hit){
    x_ball_speed *= -1
    pong.play();
  }
  hit = collideRectCircle(x_player2, y_player2, width_player2, height_player2, x_ball, y_ball, radius_ball);
  if (hit){
    x_ball_speed *= -1
    pong.play();
  }
}

function show_grid(){
  rect(0,200,600,1)
  rect(300,0,1,400)
}

function show_points(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(points_player1, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(points_player2, 470, 26);
}

function score_points(){
  if (x_ball > 590) {
        points_player1 += 1;
    score.play();
    }
    if (x_ball < 10) {
        points_player2 += 1;
      score.play();
    }
}

function miss_chance_calc(){
  if (points_player2 >= points_player1) {
    miss_chance += 1
    if (miss_chance >= 39){
    miss_chance = 40
    }
  } else {
    miss_chance -= 1
    if (miss_chance <= 35){
    miss_chance = 35
    }
  }
}

function unstuck(){
    if (x_ball - radius_ball < 0){
    x_ball = 23
    }
}