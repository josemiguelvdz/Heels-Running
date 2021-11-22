import PowerUp from './powerUp.js';

export default class Coffe extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

        
        this.duration=4000;
  }

  preUpdate() {
    super.preUpdate();


  }

  
  /**
   * Handles the collision with player
   */
  handleCollision() {

    this.collideCoffe(this.scene);

  }

  /**
   * Creates an Event before the collision with player that acts after a 4 second delay
   * @param  escena - used for creating an Event
   * 
   */
  collideCoffe(escena)
  {
       
       
     
       this.player.controlSpeed("Increase");
       //Timer para reestablecer la velocidad del jugador a los 4 segundos
       let timer = escena.time.addEvent( {
       delay: this.duration, 
       callback: this.adjustSpeed, //No es la escena , se especifica segun donde este el metodo 
       arguments: this.speedAux,
       callbackScope: escena 
                            }); 
      this.destroyObject();
   }   
   /**
    * Called after the 4 delay of the created event,its function is to reduce player velocity up to its initial state
    * 
    */
 adjustSpeed(speed)
 {  
 
  this.player.restoreSpeed("Increase");

 }

}