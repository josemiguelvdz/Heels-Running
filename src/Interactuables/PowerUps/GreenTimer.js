import PowerUp from './powerUp.js';

export default class GreenTimer extends PowerUp {


  constructor(scene, player, x, y, nombreImg,moving,clockClass) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base

    this.timer=clockClass;
  }

  preUpdate() {
    super.preUpdate();
  }

  
  /**
   * Handles the collision with player
   */
  handleCollision() {

    this.timer.reduceTime(0,1);
        this.powerupsound.play();
        this.destroyObject();
    
  }

  /**
   *  Reduces  time of the run using timer Object Reference and makes the power up dissapear 
   * 
   */


}