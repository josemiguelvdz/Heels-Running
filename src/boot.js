
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
      this.load.image('sky', 'sky.png');
      this.load.image('backhouse', 'backhouses.png');
      this.load.image('road', 'road.png');
      this.load.image('crosswalk', 'crosswalk.png');
      this.load.image('houses1', 'houses1.png');



      this.load.setPath('./assets/sprites');
      this.load.spritesheet('idle','idlespritesheet.png',{frameWidth:64, frameHeight:64})
      this.load.spritesheet('run','runspritesheet.png',{frameWidth:64, frameHeight:64})
     
      this.load.image('salmonFish', 'salmonFish.png');
      this.load.image('coffe', 'coffe.png');
      this.load.image('redTimer', 'redTimer.png');
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