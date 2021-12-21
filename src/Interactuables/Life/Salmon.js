import PowerUp from '../PowerUps/powerUp.js';

export default class Salmon extends PowerUp {

  constructor(scene, player, x, y, nombreImg,moving) {
    super(scene, player, x, y, nombreImg,moving); 

    this.move = moving;
    this.lifesHealed = 1;
    this.player=player;
  }

  /**
  * Handles the collision with player
  * @param {*} player - refers to the game player
  */
  handleCollision(player) {
    player.addLife(1);
    this.powerupsound.play();
    this.destroyObject();
  }

}