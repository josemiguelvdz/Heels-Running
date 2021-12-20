import PowerUp from '../PowerUps/powerUp.js';

export default class Alcohol extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); //Constructor de la clase base
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
  
  preUpdate(time,delta) {
    super.preUpdate(time,delta);
    this.debuffsound.setVolume(this.scene.ChangeVolume());
  }
  
  /**
  * Handles collision with player
  */
  handleCollision(player){
    player.controlSpeed("Reduce"); 
    this.debuffsound.play(); 
    this.destroy();
  }
}