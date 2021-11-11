import powerUp from './PowerUp.js';
import scene from './Scene.js';
import chrono from './Chrono.js';

export default class greenTimer extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp,moving,clockClass) {
    super(scene, player, x, y, nombreImg, temp,moving); //Constructor de la clase base

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