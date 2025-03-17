class tile {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.c = color(255)
    this.solved = false;
    this.moving = false;
  }

  move(dx,dy){
    let x = dblround(this.x)
    let y = dblround(this.y)

    this.x += dx
    if(this.x < -1){
      this.x+=lvl.w+1
    }

    if(this.x > lvl.w){
      this.x-=(lvl.w+1);
    }

    this.y += dy
    if(this.y < -1){
      this.y+=lvl.h+1
    }

    if(this.y > lvl.h){
      this.y-=(lvl.h+1);
    }
  }

  set_color(){
    let x = dblround(this.x)
    let y = dblround(this.y)
    if(x >= 0 && x < lvl.w && y >= 0 && y < lvl.h ){
      this.c = color(255)   
    if(this.char == lvl.words[y][x]){
      this.c = color(0,255,0)
      this.solved = true;
    } else {
      this.solved = false
      if(lvl.words[y].indexOf(this.char) >= 0){
        this.c = color(230,200,0)
      }
    }
  }
  }


  draw(){
    let x = dblround(this.x)
    let y = dblround(this.y)

    if(x >= 0 && x < lvl.w && y >= 0 && y < lvl.h ){
      lvl.chars[x+y*lvl.w]=this.char;
    } else {
      this.c = color(200)
      if(x < 0){
        this.char = lvl.chars[lvl.w-1+y*lvl.w]
      }
      if(x >= lvl.w){
         this.char = lvl.chars[y*lvl.w]
      }
      if(y < 0){
        this.char = lvl.chars[x+(lvl.h-1)*lvl.w]
      }
      if(y >= lvl.w){
         this.char = lvl.chars[x]
      }
    }

    fill(this.c)
    stroke(50)
    rect(this.x*spacing,this.y*spacing,spacing,spacing)
    fill(0)
    noStroke()
    textAlign(CENTER,CENTER)
    textSize(20)
    text(this.char,this.x*spacing,this.y*spacing)            
  }
}
