
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
        this.spriteTrain.play('trainB');

        this.timeBar = this.add.sprite(this.scale.width*0.5, 240, 'timeBar', 'timeBar.png').setScale(1.5, 1.5);

        this.text1=this.add.text((this.scale.width*0.5) -10, 225, this.runTime);
        this.text1.setAlign('center');
        // Font style
        this.text1.setFont('Arial Black');
        this.text1.setFontSize(40);
        
        this.spriteWin = this.add.image(this.scale.width*0.5, 100, 'youScape').setScale(1.3, 1.3);

        this.playButton = this.add.image(this.scale.width*0.5, 400, 'playButton_').setInteractive();
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