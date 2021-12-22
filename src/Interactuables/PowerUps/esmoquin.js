
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
  * @param {*} player - refers to the game player
  */
  handleCollision(player) {
    //In the call to  player the effect of the power up would be visually updated
    //As well as in the interface with its own methods
    player.configEsmoquinShield();
    this.powerupsound.play();
    this.destroyObject();
  }
}
   

