import PowerUp from './powerUp.js';

export default class GreenTimer extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving,clockClass) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base
  }

  preUpdate() {
    super.preUpdate();
  }

  
  /**
   * Handles the collision with player
   */
  handleCollision(chrono){
    chrono.reduceTime(0,1);
    this.powerupsound.play();
    this.destroyObject();
  }
}