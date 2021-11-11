import powerUp from './PowerUp.js';
import scene from './Scene.js';
import chrono from './Chrono.js';

export default class redTimer extends powerUp {


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

   this.collideRedTimer();

  }

  /**
   * Makes the power up dissapear and adds more time of the run using timer Object Reference
   * 
   */
  collideRedTimer()
  {
        this.destroy();
        this.timer.addTime(30,1);
       
  }
  

}