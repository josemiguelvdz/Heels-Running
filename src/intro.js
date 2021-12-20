export default class intro extends Phaser.Scene 
{
  constructor() {
    super({ key: 'intro' });
  }


  preload() {
    this.load.video('intro','./assets/video/hitchcorp.mp4');
  }

  create()
  {
    this.video = this.add.video(600,300,'intro');
    this.video.setScale(1);
    this.video.play(true);
  }
  update() {
    if(this.video.getProgress() >= 0.99)
    {
      this.scene.start('menu');
    }
  };

}
      