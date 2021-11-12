import powerUp from './PowerUp.js';

export default class Salmon extends powerUp {


  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

    this.move= moving;
    this.lifesHealed = 1;

  }

  preUpdate() {
    super.preUpdate();


  }

  /**
   * Handles the collision with player
   */
  handleCollision() {

    this.collideSalmon();

  }
/**
 * Makes power up dissapear and adds player lifesHealed number of lifes
 * 
 * 
 */
  collideSalmon() {
    this.player.numLifes = this.player.numLifes + this.lifesHealed;
    this.destroyObject();
  }


}