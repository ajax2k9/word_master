class tile {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.hue = 240;
    this.b = 10;
    this.c = color(255)
    this.c2 = color(255)
    this.c3 = color(255)
    this.solved = true;
    this.index = 0;
    this.posX = x*spacing
    this.posY = y*spacing
    this.moving = false
    this.chomps = 0;
    this.firstpass = true
  }

  set_color(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    this.h = 240;
    this.b = 20
    if(this.char == lvl.words[y][x]){
      this.h = 120
      this.b = 30
      this.solved = true;
    } else {
      this.solved = false
      if(lvl.words[y].indexOf(this.char) >= 0){
        this.h = 50
        this.b = 40
      }
    }

    if(!this.solved && !this.firstpass){
      this.chomps++;
      if(this.chomps >=5) lvl.lost = true;
    }
    this.firstpass = false
  }

  set_chars(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    lvl.chars[x+y*lvl.w]=this.char;
  }

  drawTile(){
    push()
    this.mask()
    noStroke()

    this.c = color(this.h,this.b,100)
    this.c2 = color(this.h,this.b/2,100)   
    this.c3 = color(this.h,this.b/3,100)   

    fill(this.c)
    rect(this.posX,this.posY,spacing-4,spacing-4,30)
    noFill()
    stroke(this.c2)
    strokeWeight(10)
    rect(this.posX,this.posY,spacing-30,spacing-30,20)
    noStroke()
    fill(this.c3)
    rect(this.posX,this.posY,spacing-60,spacing-60,10)
    fill(0)
    textAlign(CENTER,CENTER)
    textStyle(BOLD)
    text(this.char,this.posX,this.posY)    
    pop()
  }

  mask(){
    beginClip({invert: true})
    if(this.chomps > 0) circle(this.posX-spacing/2.5,this.posY-spacing/2.5,spacing/2);
    if(this.chomps > 1) circle(this.posX+spacing/2.5,this.posY-spacing/2.5,spacing/2);
    if(this.chomps > 2) circle(this.posX-spacing/2.5,this.posY+spacing/2.5,spacing/2);
    if(this.chomps > 3) circle(this.posX+spacing/2.5,this.posY+spacing/2.5,spacing/2);
    endClip()
  }

  draw(){
   
    let desX = this.x*spacing
    let desY = this.y*spacing  
    
    if(abs(desX - this.posX)>0.2 || abs(desY - this.posY)>0.2){
      this.posX +=(desX - this.posX)/5
      this.posY +=(desY - this.posY)/5
      this.moving = true
    } else {
      if(this.moving&&!lvl.solved &&!lvl.lost){
        this.set_chars()
        this.set_color()
      }
      this.moving = false
      this.posX = desX
      this.posY = desY
    }

    this.index = this.x + this.y*lvl.w
    
    if(selected_tile == this){
      this.posX = mouseX - offs - spacing/2
      this.posY = mouseY - offsY - spacing/2
    }
    this.drawTile()
  }
}
