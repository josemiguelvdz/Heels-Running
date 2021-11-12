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
   * Makes the power up dissapear and reduces  time of the run using timer Object Reference
   * 
   */
  collideGreenTimer()
  {
        this.destroy();
        this.timer.reduceTime(0,1);
       
  }
  

}