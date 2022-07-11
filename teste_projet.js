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

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2049)
        boundaries.push(
            new Boundary({
                position: {
                x: j * Boundary.width,
                y: i * Boundary.height
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
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({ //spawn point du background
    position: { 
        x: -160,
        y: -290 
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

function animate() {
    window.requestAnimationFrame(animate)//appele de animate pour loop
    background.draw()//draw le background
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    context.drawImage( //draw la player image correctement
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

    if(keys.z.pressed && lastKey === 'z') {
        background.position.y = background.position.y + 3
    }
    else if(keys.s.pressed && lastKey === 's') {
        background.position.y = background.position.y - 3
    }
    else if(keys.q.pressed && lastKey === 'q') {
        background.position.x = background.position.x + 3
    }
    else if(keys.d.pressed && lastKey === 'd') {
        background.position.x = background.position.x - 3
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

    console.log(keys)
})




