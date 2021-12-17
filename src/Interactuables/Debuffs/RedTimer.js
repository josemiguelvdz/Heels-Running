
import PowerUp from '../PowerUps/powerUp.js';

export default class RedTimer extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving,clockClass) {
    super(scene, player, x, y, nombreImg,moving,); //Constructor de la clase base
  }

  preUpdate() {
    super.preUpdate();
  }

  
  /**
   * Handles the collision with player

   */
  handleCollision(chrono) {
   this.collideRedTimer(chrono);
  }


  /**
   * Makes the power up dissapear and adds more time of the run using timer Object Reference
   * 
   */
  collideRedTimer(chrono){
    chrono.addTime(30000,0);
    this.debuffsound.play();
    this.destroyObject();
  }
}