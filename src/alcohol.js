import PowerUp from './powerUp.js';

export default class Alcohol extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

        this.duration=4000; //Dureacion del efecto del power up
  }

  preUpdate() {
    super.preUpdate();


  }

  
  /**
   * Handles the collision with player
   */
  handleCollision() {

    this.collideAlcohol(this.scene);

  }

  /**
   * Creates an Event before the collision with player that acts after a 4 second delay
   * Also decreases player velocity
   * @param  escena - used for creating an Event
   * 
   */
  collideAlcohol(escena)
  {
       
       
     
      this.player.controlSpeed("Reduce");

       //Timer para reestablecer la velocidad del jugador a los 4 segundos
       let timer = escena.time.addEvent( {
       delay: this.duration, 
       callback: this.adjustSpeed, //No es la escena , se especifica segun donde este el metodo 
       callbackScope: escena 
                            }); 
      this.destroyObject();
   }   
   /**
    * Called after the 4 delay of the created event,its function is to increase player velocity up to its initial state
    * 
    */
   adjustSpeed()
   {
     this.player.restoreSpeed("Reduce");
   }
 

}