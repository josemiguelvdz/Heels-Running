
export default class Win extends Phaser.Scene {

    constructor() {
      super({ key: 'win' });
      this.runTime=0;
    }
    init(data)  //Data se pasa como un objeto construido cuando pasas de escena con los parametros que tu eligas
    {
        this.runTime=data.runT;
        this.volumeSong=data.volume;
        
    }

    create() {
        this.spriteTrain=this.add.sprite(600, 300, 'trainBackground').setScale(2.3,2); 

        this.anims.create({
            key: 'trainB',
            frames: this.anims.generateFrameNumbers('trainBackground', { start: 0, end: 55 }),
            frameRate: 12, // Velocidad de la animación
            repeat: -1    // Animación en bucle
          });

        this.spriteTrain.play('trainB');
        this.lose=this.add.sprite(600, 300, 'loseBackGround').setScale(2.3,2); 
        const configSound = {
          mute: false,
          volume: this.volumeSong,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0,
        };
        this.winSong= this.sound.add("winSound",configSound);
        this.winSong.play();


        //this.winBackGround = this.add.image(this.scale.width*0.5, this.scale.height*0.5-105, 'playBackGround').setScale(1.5, 1.5).setScrollFactor(0);
        
        this.text=this.add.text(470,180,"¡YOUR TIME!");
        this.text.setAlign('center');
        // Font style
        this.text.setFont('Arial Black');
        this.text.setFontSize(40);

        this.text1=this.add.text(550, 240, this.runTime);
        this.text1.setAlign('center');
        // Font style
        this.text1.setFont('Arial Black');
        this.text1.setFontSize(40);
        
        this.spriteWin = this.add.image(this.scale.width*0.5, 100, 'youWin').setScale(0.8, 0.8);

        this.playButton = this.add.image(this.scale.width*0.5, 400, 'playButton').setInteractive();
        this.playButton.on('pointerdown', () => {
          this.scene.start('level');
          this.winSong.stop();
        });

        this.exitButton = this.add.image(this.scale.width*0.5, 500, 'exitButton').setInteractive();
        this.exitButton.on('pointerdown', () => {
          this.scene.start('menu');
          this.winSong.stop();
        })
    }
    preUpdate(t,dt)
    {
      super.preUpdate(t,dt);
      this.winSong.setVolume(this.scene.ChangeVolume());
    }
}