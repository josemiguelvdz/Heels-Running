import Player from './player.js';
import Platform from './platform.js';
import Star from './star.js';
import Background from './background.js';


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
    this.background = new Background(this, 'background1');

    this.player = new Player(this, 200, 300);
    this.platform = new Platform(this, this.player, this.player.y, 400);
    this.star = new Star(this, 300, 200);
  }

  spawnStar() {
    this.star_x = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    this.star_y = Math.floor(Math.random() * (300 - 200 + 1) + 200);

    this.star = new Star(this, this.star_x, this.star_y);
  }

}