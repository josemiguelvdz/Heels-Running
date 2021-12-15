
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.spriteTrain=this.add.sprite(600, 300, 'mainMenu'); 

      this.anims.create({
          key: 'mMEnu',
          frames: this.anims.generateFrameNumbers('mainMenu', { start: 0, end: 20 }),
          frameRate: 1, // Velocidad de la animación
          repeat: 0    // Animación en bucle
        });

      this.spriteTrain.play('mMEnu');
      
      //this.playbackground= this.add.image(this.scale.width*0.5, 300, 'playBackGround');
      this.playButton = this.add.image(this.scale.width*0.5, 450, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
    }
}