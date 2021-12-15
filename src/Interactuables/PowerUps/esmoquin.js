
import PowerUp from './powerUp.js';

export default class Esmoquin extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base
    this.player=player;
  }

  preUpdate() {
    super.preUpdate();
  }


  /**
   * Handles the collision with player
   */
  handleCollision(player) {
    //En la llamada al player se actualizaria visualmente el efecto del power up
    //Asi como en la interfaz con sus propios metodos 
    player.configEsmoquinShield();
    this.powerupsound.play();
    this.destroyObject();
  }
}
   

