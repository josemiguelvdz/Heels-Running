import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class salmon extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp) {
    super(scene, player, x, y, nombreImg, temp); //Constructor de la clase base

    this.lifesHealed = 1;
  }

  preUpdate() {
    super.preUpdate();


  }

  //Redefin con herencia 
  handleCollision() {

    this.collideSalmon();

  }

  collideSalmon() {
    this.destroy();
    this.player.numLifes = this.player.numLifes + this.lifesHealed;
  }

}