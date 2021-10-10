import Player from './player.js';
import Platform from './platform.js';


export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.player = new Player(this, 200, 300);
    this.platform = new Platform(this, this.player, this.player.y, 400);
  }

}