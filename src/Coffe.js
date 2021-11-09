import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class coffe extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp,moving) {
    super(scene, player, x, y, nombreImg, temp,moving); //Constructor de la clase base

        this.speedAux= 120; //Incremento de velocidad que tiene el jugador 
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
       
       this.destroy();
     
       this.player.speed=this.player.speed+this.speedAux;

       //Timer para reestablecer la velocidad del jugador a los 4 segundos
       let timer = escena.time.addEvent( {
       delay: 4000, 
       callback: this.adjustSpeed, //No es la escena , se especifica segun donde este el metodo 
       callbackScope: escena 
                            }); 
   }   
   /**
    * Called after the 4 delay of the created event,its function is to reduce player velocity up to its initial state
    * 
    */
 adjustSpeed()
 {  
 
  this.player.speed=this.player.speed-120;  //Hay que solucionar que la variable este cableada

 }

}