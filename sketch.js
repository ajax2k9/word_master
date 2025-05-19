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
let scale_ratio =1;

p5.disableFriendlyErrors = true; // disables FES

function preload(){
  lvldata = loadJSON("words/words.json")
}
function setup() {
  pixelDensity(1)
  //spacing = floor(min(100*windowHeight/windowWidth*1920/676,200));
  spacing = 200
  scale_ratio =spacing/100
  sizeX = 4 * spacing+200;
  cnv  = createCanvas(sizeX, sizeX+300);
  rectMode(CENTER)
  colorMode(HSB)
  lvl = new level()
  lvl.loadLevel()

}


function mousePressed(){
  if(lvl.solved || lvl.lost) return
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
  textSize(14*scale_ratio)
  noStroke()
  fill(0)
  text(
    "How To Play:\n\n"+ 
    "Drag the letters to swap them. \nTry to solve the four words, with Green being a letter in \nthe right place, Yellow being in the wrong place but\nright word.\n"+
    "Letters not placed in the right place get chomped, 5 chomps and its \nGame Over!",x,y);
}

function drawContainer(){
  
  strokeWeight(4)
  rectMode(CORNER)
  fill(30,70,90)
  stroke(30,70,90)
  rect(offs-1,offsY+30,lvl.w*spacing+2,lvl.h*spacing+2,10)
  fill(30,50,50)
  stroke(30,50,100)
  rect(offs-1,offsY-1,lvl.w*spacing+2,lvl.h*spacing+2,10)
}

function drawLines(){
  strokeWeight(3)
  let px = 0;
  let py = 0;
  for(let i = 0; i< lvl.h-1; i++){
    px = 0;
    py = spacing*i+spacing/2;
    line(px-spacing/2,py,px+spacing*lvl.w-spacing/2,py)
  }
}

function draw() {
  textAlign(LEFT)
  background(255);

  drawContainer()
  push()
  translate(offs+spacing/2,offsY+spacing/2)
  drawLines()
  rectMode(CENTER)
  lvl.draw()
  pop()
    
  drawInstructions(offs,offsY*2+lvl.w*spacing+30)
  textSize(20)
  text("copyright Alex Mendelsberg 2025 - v0.4.0",offs,15)
  }


function dblround(x){
  return round(round(x,2))
}