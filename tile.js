class tile {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.c = color(255)
    this.solved = true;
    this.index = 0;
    this.posX = x*spacing
    this.posY = y*spacing
    this.moving = false
  }

  set_color(){
    let x = dblround(this.x)
    let y = dblround(this.y)
      this.c = color(255)   
    if(this.char == lvl.words[y][x]){
      this.c = color(0,255,0)
      this.solved = true;
    } else {
      this.solved = false
      if(lvl.words[y].indexOf(this.char) >= 0){
        this.c = color(250,250,0)
      }
    }
  }

  set_chars(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    lvl.chars[x+y*lvl.w]=this.char;
  }


  draw(){
    fill(this.c)
    let desX = this.x*spacing
    let desY = this.y*spacing  
    
    if(abs(desX - this.posX)>0.2 || abs(desY - this.posY)>0.2){
      this.posX +=(desX - this.posX)/5
      this.posY +=(desY - this.posY)/5
      this.moving = true
    } else {
      this.moving = false
      this.posX = desX
      this.posY = desY
    }

    if(!this.moving &&!lvl.solved){
      this.set_chars()
      this.set_color()
    }
    
    this.index = this.x + this.y*lvl.w
    
    if(selected_tile == this){
      this.posX = mouseX - offs - spacing/2
      this.posY = mouseY - offsY - spacing/2
    }
    stroke(50)
    strokeWeight(2)
    rect(this.posX,this.posY,spacing,spacing,10)
    fill(0)
    noStroke()
    textAlign(CENTER,CENTER)
    textStyle(BOLD)
    text(this.char,this.posX,this.posY)            
  }
}
