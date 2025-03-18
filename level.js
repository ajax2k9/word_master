const X = 0
const Y = 1
class level {
    constructor(w,h) {
        this.tiles = [];
        this.moveDir;
        this.chars=[];
        this.data;
        this.words = [];
        this.shuffled = [];
    }
    loadLevel(){
        this.data = lvldata
        if (this.data.width == undefined) {
            return false    
        }

        this.w = this.data.width
        this.h = this.data.height
        
        this.shuffle()
        
        for(let i =0; i<this.w*this.h; i++){
            this.chars.push(0)
        }

        for(let j = 0; j <=this.h; j++){
            for(let i = 0; i <=this.w; i++){
                let t = new tile(i,j)
                t.char = this.shuffled[i+j*lvl.w];
                t.set_color()
                this.tiles.push(t)
            }
        }

        this.tiles.forEach(t=>{
            t.set_chars()
        })

        return true
    }

    shuffle(){
        let letters = []
        this.data.words.forEach(w=>{
            this.words.push(w)
            let arr_w = Array.from(w)
            arr_w.forEach(l=>{             
                letters.push(l)
            })
        })

        for(let i = 0; i < lvl.h*lvl.w; i++){
            let idx = floor(random(0,letters.length))
            this.shuffled.push(letters[idx])
            letters.splice(idx,1)
        }
    }
    selTile(x,y){
        this.tiles.forEach(t=>{
        if(selected_tile != undefined) return
        if(abs(t.x-x/spacing) < 0.5 && abs(t.y-y/spacing) < 0.5 && t.outside == false){
            selected_tile = t;
            }
        })
    }

    setAllTiles(){
        this.moveDir = undefined;
        this.tiles.forEach(t=>{
            t.moving = false
            t.x = dblround(t.x,2)
            t.y = dblround(t.y,2)
            t.set_color()
        });
    }

    move(dx,dy){
        if(this.moveDir == undefined){
            if(abs(dx) > 0.05 || abs(dy)> 0.05){
                if(abs(dx) < abs(dy)){
                    this.moveDir = 1;
                } else {
                    this.moveDir = 0;
                }
            }
        }
        this.tiles.forEach(t=>{
            if(this.moveDir == 0){
                if(abs(t.y - selected_tile.y) < 0.5){
                    t.moving = true;
                    t.move(dx,0)
                }
            }

            if(this.moveDir == 1){
                if(abs(t.x - selected_tile.x) < 0.5){
                    t.moving = true;
                    t.move(0,dy)
                  
                }
            }
        })
    }

    checkWin(){
        let solved = true
        this.tiles.forEach(t=>{
            let x = dblround(t.x)
            let y = dblround(t.y)

            if(x >= 0 && x < lvl.w && y >= 0 && y < lvl.h ){
                solved &= t.solved
            }
        })

        return solved
    }

    
    draw(){
        textSize(20)
        this.tiles.forEach(t=>t.draw())
    }
}
