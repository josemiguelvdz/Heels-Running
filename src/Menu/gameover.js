
export default class GameOver extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'gameover' });
    }
  
    
    create() {


      this.lose=this.add.sprite(600, 300, 'loseBackGround').setScale(2.3,2); 

      this.anims.create({
          key: 'loseB',
          frames: this.anims.generateFrameNumbers('loseBackGround', { start: 0, end: 47}),
          frameRate: 20, // Velocidad de la animación
          repeat: -1    // Animación en bucle
        });

        this.lose.play('loseB');
          
      this.bustedBackGround=  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'cartelBusted').setScale(0.7,0.7);
       this.bustedBackGround.y-=15;
       this.bustedBackGround.x-=390;



        this.playButton = this.add.image(this.scale.width*0.5, 400, 'playButton').setInteractive();
        this.playButton.x=500;
        this.playButton.y-=215;
        this.playButton.on('pointerdown', () => {this.scene.start('level')});

        this.exitButton = this.add.image(this.scale.width*0.5, 500, 'exitButton').setInteractive();
        this.exitButton.x=750;
        this.exitButton.y-=315;
        this.exitButton.on('pointerdown', () => {this.scene.start('menu')})
    }
}

