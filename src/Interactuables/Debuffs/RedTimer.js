
import PowerUp from '../PowerUps/powerUp.js';

export default class RedTimer extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving,clockClass) {
    super(scene, player, x, y, nombreImg,moving,); //Constructor de la clase base

    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.config=configSound;
    this.debuffsound= this.scene.sound.add("debuffSound",configSound);

  }

  preUpdate() {
    super.preUpdate();
  }

  
  /**
   * Handles the collision with player

   */
  handleCollision(chrono){
    chrono.addTime(30000,0);
    this.debuffsound.play();
    this.destroyObject();
  }
}