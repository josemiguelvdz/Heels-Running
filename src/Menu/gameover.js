
export default class GameOver extends Phaser.Scene {
    /**
     * Constructor del menu
     */
    constructor() {
      super({ key: 'gameover' });
    }
  
    
    create() {


      this.lose=this.add.sprite(600, 300, 'loseBackGround').setScale(2.3,2); 
      const configSound = {
        mute: false,
        volume: 0.3,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0,
      };
      this.loseEfect= this.sound.add("loseEfect",configSound);
      this.loseEfect.play();

      const configSound_2 = {
        mute: false,
        volume: 0.5,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0,
      };

      this.loseSong= this.sound.add("loseSound",configSound_2);
      this.loseSong.play();

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



        this.playButton = this.add.image(this.scale.width*0.5, 400, 'playButton').setInteractive().setScale(0.9, 0.9);
        this.playButton.x=425;
        this.playButton.y= 90;
        this.playButton.on('pointerdown', () => {
          
          this.loseSong.stop();
          this.loseEfect.stop();
          this.scene.start('level');
       
        });

        this.exitButton = this.add.image(this.scale.width*0.5, 500, 'exitButton_V2').setInteractive().setScale(0.9, 0.9);
        this.exitButton.x=800;
        this.exitButton.y=90;
        this.exitButton.on('pointerdown', () => {
          
          this.loseSong.stop();
          this.loseEfect.stop();
          this.scene.start('menu');
          
        })
    }
}

