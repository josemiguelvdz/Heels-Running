
import PowerUp from './powerUp.js';

export default class Esmoquin extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

     this.durationEffect=5;
    
  }

  preUpdate() {
    super.preUpdate();
    
   
   
  }
  /**
   * Handles the collision with player
   */
  handleCollision() {

    this.collideEsmoquin();

  }
/**
 * Makes power up dissapear and activates a boolean in player for not recieving damage
 * 
 * 
 */
 collideEsmoquin() {
   //En la llamada al player se actualizaria visualmente el efecto del power up
   //Asi como en la interfaz con sus propios metodos 
  this.player.configEsmoquinShield(this.durationEffect);
  this.destroyObject();
}

}