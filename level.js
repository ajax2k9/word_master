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

        for(let j = 0; j <this.h; j++){
            for(let i = 0; i <this.w; i++){
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

    showWin(){
        let winStr = "YOU WIN "
        let numStr = turns.toString()
        numStr = numStr.padStart(4," ")

        this.tiles.forEach(t=>{
            let counter = t.index
            if(counter <winStr.length){
                t.char =winStr[counter]
                if(t.char != " "){
                    t.c = color(0,255,0)
                } else {
                    t.c = color(255)
                }
            }
            else if(counter > 11 && counter <16){
                t.char = numStr[counter-12]
                t.c = color(250,250,0)
            } else {
                t.char = ' '
                t.c = color(255)
            }
            })
    }
    shuffle(){
        let letters = []
        for(let i = 0; i <lvl.h;i++){
            
            let idx = floor(random(0,this.data.words.length))            
            let word = this.data.words[idx].toUpperCase()
            this.data.words.splice(idx,1)

            this.words.push(word)
            let arr_w = Array.from(word)
            arr_w.forEach(l=>{             
                letters.push(l)
            })
        }
        

        for(let i = 0; i < lvl.h*lvl.w; i++){
            let idx = floor(random(0,letters.length))
            this.shuffled.push(letters[idx])
            letters.splice(idx,1)
        }
    }
    selTile(x,y){
        this.tiles.forEach(t=>{
        if(selected_tile != undefined) return
        if(abs(t.x-x/spacing) < 0.5 && abs(t.y-y/spacing) < 0.5){
            selected_tile = t;
            last_tile = t
            }
        })
    }

    setAllTiles(){
        this.tiles.forEach(t=>{
            t.set_color()
        });
    }
    swapTiles(){

        let posX = mouseX - offs - spacing/2
        let posY = mouseY - offsY - spacing/2
        let x = dblround(posX/spacing)
        let y = dblround(posY/spacing)
        let swap_tile;
        let idx = x +y*lvl.w
        this.tiles.forEach(t=>{
            if(t != selected_tile && t.index == idx){
                swap_tile = t
            }
        })

        if(swap_tile != undefined){
            let px1 = selected_tile.x;
            let py1 = selected_tile.y;
            let px2 = swap_tile.x;
            let py2 = swap_tile.y;

            selected_tile.x = px2
            selected_tile.y = py2

            swap_tile.x = px1
            swap_tile.y = py1
        }
        
    }
   
    checkWin(){
        this.solved = true
        this.tiles.forEach(t=>{
            let x = dblround(t.x)
            let y = dblround(t.y)

            if(x >= 0 && x < lvl.w && y >= 0 && y < lvl.h ){
                this.solved &= t.solved
            }
        })
    }

    
    draw(){
        textSize(24 * scale_ratio)
        let moving = false
        this.moving = false
        this.tiles.forEach(t=>{
            if(last_tile != t)
                t.draw()
                moving |=t.moving
            }
        )
        if(last_tile){
            last_tile.draw()
            moving |=last_tile.moving
        }

        if(!this.solved && !moving){
            console.log
            this.checkWin()
            if(this.solved){
                lvl.showWin()
            }
        }

    }
}
