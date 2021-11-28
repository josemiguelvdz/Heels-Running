
import PowerUp from '../PowerUps/powerUp.js';

export default class RedTimer extends PowerUp {


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

   this.collideRedTimer();

  }

  /**
   * Makes the power up dissapear and adds more time of the run using timer Object Reference
   * 
   */
  collideRedTimer()
  {
        this.timer.addTime(30,1);
        this.debuffsound.play();
        this.destroyObject();
  }
  

}