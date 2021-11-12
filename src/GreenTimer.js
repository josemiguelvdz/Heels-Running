import powerUp from './PowerUp.js';

export default class GreenTimer extends powerUp {


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

   this.collideGreenTimer();

  }

  /**
   *  Reduces  time of the run using timer Object Reference and makes the power up dissapear 
   * 
   */
  collideGreenTimer()
  {
        this.timer.reduceTime(0,1);
        this.destroyObject();
       
  }
  

}