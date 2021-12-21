import PowerUp from './powerUp.js';

export default class Coffe extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); 
  }

  preUpdate(time,delta) {
    super.preUpdate(time,delta);
  }
 
  /**
  * Handles the collision with player
  * @param {*} player - refers to the game player
  */
  handleCollision(player){
    player.controlSpeed("Increase"); 
    this.powerupsound.play();
    this.destroy();
  }
}
