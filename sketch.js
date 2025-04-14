let spacing = 61
let lvl;
let p;
let selected_tile;
let last_tile;
let m_x;
let m_y;
let m_dy= 0;
let m_sy= 0;
let lvldata;
let turns=0;
let offs = 20
let offsY = 30

p5.disableFriendlyErrors = true; // disables FES

function preload(){
  lvldata = loadJSON("words/words.json")
}
function setup() {
  pixelDensity(1)
  spacing = floor(min(100*windowHeight/windowWidth*1920/676,100));
  sizeX = 4 * spacing+200;
  cnv  = createCanvas(sizeX, sizeX+300);
  rectMode(CENTER)
  lvl = new level()
  lvl.loadLevel()

}


function mousePressed(){
  if(lvl.solved) return
  lvl.selTile(mouseX-offs-spacing/2,mouseY-offsY-spacing/2)
  return false
}

function mouseReleased(){
  if(selected_tile){
    lvl.swapTiles()
    selected_tile = undefined;
    turns++;
  }
  return false
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
  textAlign(LEFT)
  background(255);
  push()
  rectMode(CORNER)
  stroke(0)
  beginClip(true)
  rect(offs-1,offsY-1,lvl.w*spacing+2,lvl.h*spacing+2)
  endClip()

  translate(offs+spacing/2,offsY+spacing/2)
  rectMode(CENTER)
  lvl.draw()
  pop()
  noFill()
  stroke(0)
  strokeWeight(4)
  rectMode(CORNER)
  rect(offs-1,offsY-1,lvl.w*spacing+2,lvl.h*spacing+2,10)

  drawInstructions(offs,offsY*2+lvl.w*spacing)
  text("copyright Alex Mendelsberg 2025 - v0.3.0",offs,15)
  }


function dblround(x){
  return round(round(x,2))
}