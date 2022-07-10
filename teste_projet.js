const canvas = document.querySelector('canvas'); //selectionne la balise canva en html, constente
const context = canvas.getContext('2d'); //precise que le canvas sera 2d, constente

canvas.width = 1024; //largeur du canvas
canvas.height = 576; //heuteur du canvas

context.fillStyle = 'white'; //backgroud color du canvas
context.fillRect(0, 0, canvas.width, canvas.height); //coordonné de remplissage du canvas

const image = new Image(); //constente "image" pour la map
image.src = './img/Pokemon Style Game Map.png';  //source de la "new image" de type map

const playerImage = new Image (); //constente "playerImage" pour le personnage
playerImage.src = './img/playerDown.png'; //source du personnage

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
        x: -415,
        y: -520 
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

    if(keys.z.pressed) {
        background.position.y = background.position.y + 3
    }
    else if(keys.s.pressed) {
        background.position.y = background.position.y - 3
    }
    else if(keys.q.pressed) {
        background.position.x = background.position.x + 3
    }
    else if(keys.d.pressed) {
        background.position.x = background.position.x - 3
    }
};
animate(); //appele en loop d'une function pour l'animation

window.addEventListener('keydown', (e) => {
    // console.log(e.key);
    switch (e.key) {
        case 'z':
            keys.z.pressed = true;
            break;
        case 'q':
            keys.q.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }; //definition du zqsd pour le mouvement du personnage 😉
});

window.addEventListener('keyup', (e) => {
    // console.log(e.key);
    switch (e.key) {
        case 'z':
            keys.z.pressed = false;
            break;
        case 'q':
            keys.q.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }; //definition du zqsd pour le mouvement du personnage 😉
    console.log(keys)
});




