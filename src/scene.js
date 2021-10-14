import Player from './player.js';
import Platform from './platform.js';
import Star from './star.js';

const createAligned = (scene, totalWidth, texture, scrollFactor) => {

  const w = scene.textures.get(texture).getSourceImage().width
  const count = Math.ceil(totalWidth / w) * scrollFactor;

  let x = 0;

  for(let i = 0; i < count; ++i){
    const b = scene.add.image(x, scene.scale.height, texture)
    .setOrigin(0, 1)
    .setScrollFactor(scrollFactor);  

    x += b.width; 
  }
  
}

export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width*10;

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0);

    createAligned(this, totalWidth, 'backhouse', 0.25);
    createAligned(this, totalWidth, 'houses2', 0.5);
    createAligned(this, totalWidth, 'houses1', 0.5);
    createAligned(this, totalWidth, 'road', 1);
    createAligned(this, totalWidth, 'crosswalk', 1);

    this.cameras.main.setBounds(0, 0, width*5, height);


    this.player = new Player(this, 200, 300);
    this.platform = new Platform(this, this.player, this.player.y, 400);
    this.star = new Star(this, 300, 200);
    //LAS ANIMACIONES SE CREAN EN LA ESCENA 
    
    this.anims.create({
        key: 'idle_anim',
        frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
        frameRate: 8, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      });
      this.anims.create({
        key: 'run_anim',
        frames: this.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
        frameRate: 8, // Velocidad de la animación
        repeat: -1    // Animación en bucle
      });
    
      
      


  }

  update(){
    const cam = this.cameras.main;
    const speed = 3;

    // cam.scrollX += speed;
  }

  spawnStar() {
    this.star_x = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    this.star_y = Math.floor(Math.random() * (300 - 200 + 1) + 200);

    this.star = new Star(this, this.star_x, this.star_y);
  }

}