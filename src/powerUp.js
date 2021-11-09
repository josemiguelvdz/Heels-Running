import scene from './Scene.js'




export default class powerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,temp,moving) {
   
    super(scene, x, y, nombreImg);
    console.log(nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.y -= this.height;
    this.tweenMovement;

    if(moving)
    {
      this.tweenMovement= this.scene.tweens.add({
      targets: this,
      y: 700, //Cantidad de desplazamiento
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

    
   
    
  }
}