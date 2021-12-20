
export default class PowerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,moving) {
   
    super(scene, x, y, nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.y -= this.height;

    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.config=configSound;

    this.powerupsound= this.scene.sound.add("powerupSound",configSound);
    this.body.moves=false;
    this.movesbyTween=moving;
    

    this.scene=scene;
   
    this.nameImg= nombreImg;
    
    this.createTweenMovement();
    
  }
  
  /**
  * Used to destroy a power up after making its effect
  */
  destroyObject(){
    this.destroy();
  }


  /**
  * handle movement boolean in order to control de effect of power ups 
  */
  createTweenMovement()
  {
    this.rndDuration= Phaser.Math.Between(1000, 2000);
    this.rndY=Phaser.Math.Between(250, 550);
    if(this.movesbyTween)
    {
      this.tweenMovement= this.scene.tweens.add({
      targets: this,
      y: this.rndY, //Cantidad de desplazamiento
      duration: this.rndDuration,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
      delay: 200 //Tiempo que tarda en empezar
      });
    }
  }
  preUpdate(t,dt)
  {
   super.preUpdate(t,dt);
   this.powerupsound.setVolume(this.scene.ChangeVolume());
  }
}