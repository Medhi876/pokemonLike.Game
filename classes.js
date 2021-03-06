class Sprite {
    constructor({ position, image, frames = {max: 1, hold: 10 }, sprites, animate = false }) {
        this.position = position
        this.image = image
        this.frames = {...frames, value:0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
        }
        this.animate = animate
        this.sprites = sprites
    }
    draw() { //draw plains de truc
        context.drawImage( //draw la player image correctement
            this.image, //
            this.frames.value * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,                    //
            this.image.width / this.frames.max, //player image avec frame divisé
            this.image.height
        )
        
        if (!this.animate) return
        
        if (this.frames.max > 1) {
        this.frames.elapsed++
        }
            
        if (this.frames.elapsed % this.frames.hold === 0)
            {if (this.frames.value < this.frames.max - 1)
                this.frames.value++
            else this.frames.value = 0
        }
    }
}

class Boundary { // construit les bondary : batle zone et collision zone
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() { // "dessine" les bordure de zone
        context.fillStyle = 'rgba(255, 0, 0, 0.2'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}