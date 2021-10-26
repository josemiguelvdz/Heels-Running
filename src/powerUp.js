import scene from './scene.js'



//Me falta hacer herencia sobre esta clase para ahorrarme los metodos 
//No funciona la herencia de la herencia cuando se comprueban colisiones 
export default class powerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg) {
    super(scene, x, y, nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
   

    this.y -= this.height;



    //Referencias al jugador la escena y el sprite que tengan 
    this.player=player;
    this.scene=scene;
    this.nameImg= nombreImg;
   
    
  }

  preUpdate() {
    super.preUpdate();
    this.handleCollision();
  
  }
  
  collideSalmon()
  { 
  
     if(this.scene.physics.collide(this.player, this))
     {
      
       this.destroy();
       this.player.numLifes=this.player.numLifes+1;
       
       //Lanzar un evento con 5 segundos de delay para volver a reajustar la velocidad
      
     } 
   }
   collideCoffe()
   { 
   
      if(this.scene.physics.collide(this.player, this))
      {
      
        this.destroy();
        this.player.speed=500;
        //Lanzar un evento con 5 segundos de delay para volver a reajustar la velocidad
       
      } 
    }
    collideRedTimer()
   { 
   
      if(this.scene.physics.collide(this.player, this))
      {
      
        this.destroy();
        this.player.destroy();
        //Lanzar un evento con 5 segundos de delay para volver a reajustar la velocidad
       
      } 
    }
  handleCollision()
  {
     if(this.nameImg==='salmonFish')this.collideSalmon();
     if(this.nameImg==='coffe')this.collideCoffe();
     if(this.nameImg==='redTimer')this.collideRedTimer();
     

  }



}

 
