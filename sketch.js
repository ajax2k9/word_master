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
  createCanvas(500, 400);
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
  return false
}

function mouseDragged(){
  let max_dm = 0.3
  if(selected_tile != undefined){
    let dx = constrain((mouseX-m_x)/spacing,-max_dm,max_dm)
   let dy = constrain((mouseY-m_y)/spacing,-max_dm,max_dm)
    lvl.move(dx,dy)
    m_x=mouseX
    m_y=mouseY

    m_dy = mouseY- m_sy;
    
  }
  return false
}

function mouseReleased(){
  if(solved) return
  selected_tile = undefined;
  lvl.setAllTiles()
  turns++;
  solved = lvl.checkWin()
  return false
}
function drawWin(x,y){
  textSize(20)
  noStroke()
  fill(0)
  text("you win!",x,y);
  text("Turns : "+ turns,x,y+30)
}
function drawInstructions(x,y){
  textSize(14)
  noStroke()
  fill(0)
  text(
    "How To Play:\n\n"+ 
    "Drag the letters around left/right or up/down. \nTry to solve the four words, with Green being a letter in \nthe right place, Yellow being in the wrong place but\nright word",x,y);
}

function draw() {
  background(255);
  push()
  rectMode(CORNER)
  stroke(0)
  // beginClip(true)
  // rect(spacing/2-1,spacing/2-1,lvl.w*spacing+2,lvl.h*spacing+2)
  // endClip()

  translate(spacing,spacing)
  rectMode(CENTER)
  lvl.draw()
  pop()
  noFill()
  stroke(0)
  strokeWeight(4)
  rectMode(CORNER)
  rect(spacing/2-1,spacing/2-1,lvl.w*spacing+2,lvl.h*spacing+2,10)

    if(solved){
      drawWin(300,100)
    }

  //drawInstructions(spacing/2,310)
  }


function dblround(x){
  return round(round(x,2))
}