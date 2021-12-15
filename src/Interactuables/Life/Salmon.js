import PowerUp from '../PowerUps/powerUp.js';

export default class Salmon extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

    this.move = moving;
    this.lifesHealed = 1;
    this.player=player;
  }

  /*preUpdate() {
    super.preUpdate();
  }*/


  /**
   * Handles the collision with player
   */
  handleCollision(player) {
    this.collideSalmon(player);
  }


/**
 * Makes power up dissapear and adds player lifesHealed number of lifes
 */
  collideSalmon(player) {
    player.addLife(1);
    this.powerupsound.play();
    this.destroyObject();
  }
}