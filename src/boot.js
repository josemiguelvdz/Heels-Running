export default class Boot extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
      super({ key: 'boot' });
    }
  
    /**
     * Carga de los assets del juego
     */
    preload() {
      // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
      this.load.setPath('./assets/backgrounds');
      this.load.image('background1', 'background1.png');

      
      this.load.setPath('./assets/sprites');
      this.load.image('player', 'player.png');
      this.load.image('platform', 'platform.png');
      this.load.image('power', 'star.png');


    }
    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      this.scene.start('level');
    }
  }