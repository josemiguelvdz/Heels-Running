
export default class PowerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,moving) {
   
    super(scene, x, y, nombreImg);
    console.log(nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this,false);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.y -= this.height;
    this.tweenMovement;
    this.movesbyTween=moving;
    if(moving)
    {
      this.tweenMovement= this.scene.tweens.add({
      targets: this,
      y: 400, //Cantidad de desplazamiento
      duration: 1500,
      ease: 'Power',
      yoyo: true,
      repeat: -1,
      delay: 200 //Tiempo que tarda en empezar
     });
    }
    //Referencias al jugador la escena y el sprite que tengan 
    this.player=player;
    this.scene=scene;
   
    this.nameImg= nombreImg;

    
   
    
  }/**
   * Used to destroy a power up after making its effect
   */
  destroyObject()
  {
    this.destroy();
  }

}