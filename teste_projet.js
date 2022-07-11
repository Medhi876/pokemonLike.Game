const canvas = document.querySelector('canvas') //selectionne la balise canva en html, constente
const context = canvas.getContext('2d') //precise que le canvas sera 2d, constente

canvas.width = 1024 //largeur du canvas
canvas.height = 576 //heuteur du canvas

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) { //tile width de la map
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = [];
const offset = { 
    x: -160,
    y: -290
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2049)
        boundaries.push(
            new Boundary({
                position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const image = new Image() //constente "image" pour la map
image.src = './img/Pokemon Style Game Map2.png'  //source de la "new image" de type map

const playerImage = new Image () //constente "playerImage" pour le personnage
playerImage.src = './img/playerDown.png' //source du personnage

class Sprite {
    constructor({ position, velocity, image, frames = {max: 1} }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height 
            console.log(this.width)
            console.log(this.height)
        }
        
    }

    draw() {
        context.drawImage( //draw la player image correctement
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite ({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({ //spawn point du background
    position: { 
        x: offset.x,
        y: offset.y
    }, 
    image: image
});

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + player.height >= rectangle2.position.y
    )
}
function animate() {
    window.requestAnimationFrame(animate)//appele de animate pour loop
    background.draw()//draw le background
    boundaries.forEach(boundary => { 
        boundary.draw() //draw les boundary
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: boundary
            })
        ) {
        console.log('colliding')
        }
    })
    player.draw()//draw le player
    
    if (keys.z.pressed && lastKey === 'z') {
        movables.forEach(movable => {
            movable.position.y += 3
        })
    }
    else if(keys.s.pressed && lastKey === 's') {
        movables.forEach(movable => {
            movable.position.y -= 3
        })
    }
    else if(keys.q.pressed && lastKey === 'q') {
        movables.forEach(movable => {
            movable.position.x += 3
        })
    }
    else if(keys.d.pressed && lastKey === 'd') {
        movables.forEach(movable => {
            movable.position.x -= 3
        })
    }
}
animate() //appele en loop d'une function pour l'animation

let lastKey = ''
window.addEventListener('keydown', (e) => {
    // console.log(e.key);
    switch (e.key) {
        case 'z':
            keys.z.pressed = true;
            lastKey = 'z'
            break
        case 'q':
            keys.q.pressed = true;
            lastKey = 'q'
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break
    } //definition du zqsd pour le mouvement du personnage 😉 actif
})

window.addEventListener('keyup', (e) => {
    // console.log(e.key)
    switch (e.key) {
        case 'z':
            keys.z.pressed = false
            break
        case 'q':
            keys.q.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    } //definition du zqsd pour le mouvement du personnage 😉 inactif

    //console.log(keys)
})




