import PowerUp from './powerUp.js';

export default class Coffe extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

        
        this.duration=4000;
        this.seconds=-1;
        this.hasEntered=false;
       
      
      }

  preUpdate(time,delta) {
    super.preUpdate(time,delta);
//Miramos a ver si se puede empezar a contar por que ha chocado con el jugador
//Si ha chocado con el jugador miramos si no estamos en pausa 
//Si no estamos en pausa ya vemos si ha pasado el tiempo , para hacer o no el efecto si todavia no ha pasado el tiempo 
   if(this.seconds >= 0) 
   {   
  console.log(this.seconds);
  if(!this.stopMovement) 
  {
  this.seconds+=Math.round(delta);
  if(this.seconds>this.duration)
  {
   
    this.seconds=0;
    this.adjustSpeed();
    this.destroyObject();
   
  }
   }
    }
  }
 
handleCollision()
{

  this.collideCoffe();
  this.seconds=0;
  this.setVisible(false);
}
  /**
   * Creates an Event before the collision with player that acts after a 4 second delay
   * @param  escena - used for creating an Event
   * 
   */
    collideCoffe()
   {    
     //Para que solo entre 1 vez
       if(!this.hasEntered)
       {
        this.player.controlSpeed("Increase"); 
        this.hasEntered=true;
        this.powerupsound.play();
       } 
      
   }   
   /**
    * Called after the duration of the power up effect ,its function is to reduce player velocity up to its initial state
    * 
    */
 adjustSpeed()
 {  
  this.player.restoreSpeed("Increase");

 }
}
