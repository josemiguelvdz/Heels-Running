
export default class Menu extends Phaser.Scene {

    constructor() {
      super({ key: 'menu' });
    }
  
    create() {
      this.spriteTrain=this.add.sprite(1233, 123, 'trainBackground'); 

      this.anims.create({
          key: 'trainBackground',
          frames: this.anims.generateFrameNumbers('trainBackground', { start: 0, end: 56 }),
          frameRate: 1, // Velocidad de la animación
          repeat: 0    // Animación en bucle
        });
        this.spriteTrain.x=0;
        this.spriteTrain.y=0;
      this.spriteTrain.play('trainBackground');
      this.playbackground= this.add.image(this.scale.width*0.5, 300, 'playBackGround');
      this.playButton = this.add.image(this.scale.width*0.5, 450, 'playButton').setInteractive();
      this.playButton.on('pointerdown', () => {this.scene.start('level')});
    }
}