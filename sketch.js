let spacing = 61
let lvl;
let p;
let selected_tile;
let m_x;
let m_y;
let m_dy= 0;
let m_sy= 0;
let lvldata;
let turns=0;
let solved = false
function preload(){
  lvldata = loadJSON("levels/1.json")
}
function setup() {
  createCanvas(500, 300);
  rectMode(CENTER)
  lvl = new level()
  lvl.loadLevel()
}


function mousePressed(){
  if(solved) return
  lvl.selTile(mouseX-spacing,mouseY-spacing)
  m_x=mouseX
  m_y=mouseY
  m_sy = mouseY;
}

function mouseDragged(){
  if(selected_tile != undefined){
    let dx = constrain((mouseX-m_x)/spacing,-0.5,0.5)
    let dy = constrain((mouseY-m_y)/spacing,-0.5,0.5)
    lvl.move(dx,dy)
    m_x=mouseX
    m_y=mouseY

    m_dy = mouseY- m_sy;
  }
}

function mouseReleased(){
  if(solved) return
  selected_tile = undefined;
  lvl.setAllTiles()
  turns++;
  solved = lvl.checkWin()
}
function drawWin(x,y){
  text("you win!",x,y);
  text("Turns : "+ turns,x,y+30)
}

function draw() {
  background(220);
  push()
  rectMode(CORNER)
  beginClip(true)
  rect(spacing/2,spacing/2,lvl.w*spacing,lvl.h*spacing)
  endClip()

  translate(spacing,spacing)
  rectMode(CENTER)
  lvl.draw()
  pop()
    if(solved){
      textSize(20)
      noStroke()
      drawWin(300,100)
    }
  }


function dblround(x){
  return round(round(x,2))
}