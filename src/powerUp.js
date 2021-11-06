import scene from './Scene.js'




//Me falta hacer herencia sobre esta clase para ahorrarme los metodos 
//No funciona la herencia de la herencia cuando se comprueban colisiones 
export default class powerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,temp) {
   
    super(scene, x, y, nombreImg);
    console.log(nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    this.y -= this.height;

  

    //Referencias al jugador la escena y el sprite que tengan 
    this.player=player;
    this.scene=scene;
   
    this.nameImg= nombreImg;

    
   
    
  }
 
}