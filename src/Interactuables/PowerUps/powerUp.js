
export default class PowerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,moving) {
   
    super(scene, x, y, nombreImg);
    console.log(nombreImg);
    
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
    this.debuffsound= this.scene.sound.add("debuffSound",configSound);
    this.body.moves=false;
    this.stopMovement=false;
    this.tweenMovement;
    this.movesbyTween=moving;
    
    //Referencias al jugador la escena y el sprite que tengan 
    this.player=player;
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
    if(this.movesbyTween)
    {
      this.tweenMovement= this.scene.tweens.add({
      targets: this,
      y: 400, //Cantidad de desplazamiento
      duration: 1500,
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
   this.debuffsound.setVolume(this.scene.ChangeVolume());
  }
}