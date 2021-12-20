
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.spriteTrain=this.add.sprite(600, 230, 'mainMenu').setScale(0.7, 0.7); 
      this.helicopter=this.add.sprite(this.scale.width*0.47, 225, 'helicopterAnimation');

      this.anims.create({
          key: 'mMenu',
          frames: this.anims.generateFrameNumbers('mainMenu', { start: 0, end: 18}),
          frameRate: 25, // Velocidad de la animación
          repeat: -1    // Animación en bucle
        });

      this.anims.create({
        key: 'helicopter_animation',
        frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 12 }),
        frameRate: 30, // Velocidad de la animación
        
      });

      this.spriteTrain.play('mMenu');
      
      this.playbackground= this.add.image(this.scale.width*0.5, 70, 'playBackGround_V2').setScale(1.3, 1.3);
      this.playButton = this.add.image(this.scale.width*0.5, 330, 'playButton2').setInteractive().setScale(1, 1);
      this.playButton.on('pointerdown', () => {this.scene.start('level')});

      this.speed = 1;
    }

    update(t, dt){
      super.update(t, dt);

      if(this.helicopter.x >= (350 + this.scale.width*0.5)){
        this.helicopter.setFlip(true, false);
        this.speed *= -1 * Math.round(dt); 
        this.playButton.x -= 70 * Math.round(dt);
      }

      else if(this.helicopter.x <= (-350 + this.scale.width*0.5)){
        this.helicopter.setFlip(false, false);
        this.speed *= -1 * Math.round(dt); 
        this.playButton.x += 70 * Math.round(dt);
      }

      this.playButton.x += this.speed;
      this.helicopter.x += this.speed;

      this.helicopter.play('helicopter_animation', true);
    }
}