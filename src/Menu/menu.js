
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.spriteTrain=this.add.sprite(600, 230, 'mainMenu').setScale(0.7, 0.7); 
      this.helicopter=this.add.sprite(-40, 125, 'helicopterAnimation');

      this.anims.create({
          key: 'mMEnu',
          frames: this.anims.generateFrameNumbers('mainMenu', { start: 0, end: 18}),
          frameRate: 25, // Velocidad de la animación
          repeat: -1    // Animación en bucle
        });

      this.anims.create({
        key: 'helicopter_animation',
        frames: this.anims.generateFrameNumbers('helicopterAnimation', { start: 0, end: 12 }),
        frameRate: 30, // Velocidad de la animación
        
      });

      this.spriteTrain.play('mMEnu');
      
      //this.playbackground= this.add.image(this.scale.width*0.5, 300, 'playBackGround');
      this.playButton = this.add.image(0, 210, 'playButton').setInteractive().setScale(0.7, 0.7);
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
    }

    update(){
      this.playButton.x += 5;
      this.helicopter.x += 5;

      if(this.scale.width +(this.helicopter.width/2) < this.helicopter.x){
        this.playButton.x = 0;
        this.helicopter.x = 0;
      }

      this.helicopter.play('helicopter_animation', true);
    }
}