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
    this.chomps = 0;
    this.set_color()
    this.set_chars()

    this.chips = []
    let sp = spacing/2;
    let chip_num = floor(random(4,7))
    for(let i = 0; i < chip_num; i++){
      let ang = i/chip_num*2*PI+radians(2)
      this.chips.push(
        {
          x:random(sp/2,sp/1.5) * cos(ang),
          y:random(sp/2,sp/1.5) * sin(ang)
        })
    }

  }

  set_color(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    this.c = color(0,0,80)
    if(this.char == lvl.words[y][x]){
      this.solved = true;
      this.c = color(120,100,100)
    } else {
      this.solved = false
      if(lvl.words[y].indexOf(this.char) >= 0){
        this.c = color(60,100,100)
        
      }
    }
  }

  swap(){
    this.set_chars();
    this.set_color();
    if(!this.solved && !this.firstpass && selected_tile == this){
      this.chomps++;
      if(this.chomps >=5) lvl.lost = true;
    }
  }

  set_chars(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    lvl.chars[x+y*lvl.w]=this.char;
  }

  drawTile(){
    let offs = 2;
    let x = this.posX
    let y = this.posY
    noStroke()
    fill(this.c)
    if(this.chomps<1)this.draw_arc(x,y,offs,0)
    if(this.chomps<2)this.draw_arc(x,y,offs,PI/2)
    if(this.chomps<3)this.draw_arc(x,y,offs,PI)
    if(this.chomps<4)this.draw_arc(x,y,offs,PI*1.5)
    fill(200,50,50)
    circle(this.posX,this.posY,spacing/2)
    fill(255)
  
    text(this.char,this.posX,this.posY)
  }


  draw_arc(x,y,offs,ang){
    push()
      translate(x,y)
      rotate(ang)
      translate(offs,offs)
      
      let w = spacing/1.2

      beginClip({invert: false})
        arc(0,0,w/1.1,w/1.1,0,PI/2)
      endClip()
      rectMode(CORNER)
      square(0,0,w/2.2,8)
    pop()
  }

  draw(){
   
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

    this.index = this.x + this.y*lvl.w
    
    if(selected_tile == this){
      this.posX = mouseX - offs - spacing/2
      this.posY = mouseY - offsY - spacing/2
    }
    this.drawTile()
  }
}
