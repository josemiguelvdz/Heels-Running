import Boot from "./boot.js";
import Level from "./scene.js";
import Menu from "./Menu/menu.js";

let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById('myCanvas'),
    width: 1000,
    height: 600,
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Level, Menu],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 850 }, 
            debug: true 
        } 
    }
};

new Phaser.Game(config);


