import scene from './scene.js'



//Me falta hacer herencia sobre esta clase para ahorrarme los metodos 
//No funciona la herencia de la herencia cuando se comprueban colisiones 
export default class powerUp extends Phaser.GameObjects.Sprite {

   
   constructor(scene,player,x, y,nombreImg,temp) {
    super(scene, x, y, nombreImg);
    
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(); //Colision con los limies del mundo 
    
    this.y -= this.height;



    //Referencias al jugador la escena y el sprite que tengan 
    this.player=player;
    this.scene=scene;
    this.nameImg= nombreImg;

    this.time=temp;
   this.firstposY= 568;
   this.timeLine;
   if(this.nameImg!=='salmonFish' &&this.nameImg!=='redTimer')this.createTweenMovement();
   
    
  }

  preUpdate() {
    super.preUpdate();
    
     
  }
  update()
  {
    super.update();
  
  }
  factoryPowerUp()
  {    
    //No da error al añadir las factorias pero no funciona
    //Para probarlo añadir los metodos collide a cada clase 
     class salmonF
     {
     }
     class coffeF
     {
     }
     class redTimerF
     {
     }

      if(this.nameImg==='salmonFish')Object.assign(this,salmonF); 
      else if(this.nameImg==='coffe')Object.assign(this,coffeF);
      else if(this.nameImg==='redTimer')Object.assign(this,redTimerF);



  }
   handleCollision(name)
   {
   
    if(name==='salmonFish')this.collideSalmon();
    if(name==='coffe')this.collideCoffe(this.scene);
    if(name==='redTimer')this.collideRedTimer();
   }

  collideSalmon()
  {
        this.destroy();
        this.player.numLifes=this.player.numLifes+1;
  }
  collideRedTimer()
  {
        this.destroy();
        // this.player.destroy();
 }

  collideCoffe(escena)
  {
       
       this.destroy();
       this.player.speed=500;

       //Timer para reestablecer la velocidad del jugador a los 4 segundos
       let timer = escena.time.addEvent( {
       delay: 4000, 
       callback: this.adjustSpeed, //No es la escena , se especifica segun donde este el metodo 
       callbackScope: escena 
                            }); 
   }   
 adjustSpeed()
 {  
  
  this.player.speed=this.player.speedAux;
 }


createTweenMovement()
{

  this.timeLine = this.scene.tweens.createTimeline();
  this.timeLine.add({
   targets: this,
   y: this.firstposY-20,
   ease: 'Power1',
   
   duration: 2000

});
 this.timeLine.add({
   targets: this,
   y: this.firstposY/2.3,
   ease: 'Power1',
   duration: 2000

});
this.timeLine.add({
  targets: this,
  y: this.firstposY,
  ease: 'powerUp',
  duration: 2000
 });
 this.timeLine.add({
  targets: this,
  y: this.firstposY-20,
  ease: 'Power1',
  duration: 2000
 });
 this.timeLine.add({
  targets: this,
  y: this.firstposY/2.3,
  ease: 'Power1',
  duration: 2000

});
 
console.log(this.timeLine);
this.timeLine.loop=-1;
this.timeLine.play();
}


}