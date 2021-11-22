
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
      this.load.image('houses2', 'houses2.png');
      this.load.image('pauseBackGround', 'fondoNegro.png');

      //Police Sprites
      this.load.setPath('./assets/Sprites/Police');
      this.load.spritesheet('policeIdle','idlepolicespritesheet.png',{frameWidth:64,frameHeight:64})
      this.load.spritesheet('smokeAnimation','humoSpriteSheet.png',{frameWidth:64,frameHeight:64});
      this.load.spritesheet('helicopterAnimation','helicopterSpritesheet.png',{frameWidth:64,frameHeight:64});

      //Player Sprites
      this.load.setPath('./assets/Sprites/Player');
      this.load.spritesheet('idle','idlespritesheet.png',{frameWidth:64, frameHeight:64})
      this.load.spritesheet('run','runspritesheet.png',{frameWidth:64, frameHeight:64})
      this.load.spritesheet('smokingRun','smokingrunspritesheet.png',{frameWidth:64,frameHeight:64})
     
      //StaticObjects Sprites
      this.load.setPath('./assets/Sprites/StaticObjects');
      this.load.image('platform', 'platform.png');
      this.load.image('box', 'box.png');
      this.load.spritesheet('boxDestruction', 'boxAnimation.png', {frameWidth:64, frameHeight:64});

      //Interfaz Sprites
      this.load.setPath('./assets/Sprites/Interfaz');
      this.load.atlas("healthBar","healthBar.png","healthBar.json"); // barra de vida
      this.load.atlas("powerUpBar", "powerUpBar.png", "powerUpBar.json"); // circulo de power ups
      this.load.image("hudTest", "hud.png");
      this.load.image('timeBar', 'timeBar.png');

      //PowerUp Sprites
      this.load.setPath('./assets/Sprites/Interactuables/PowerUps');
      this.load.image('coffe', 'coffe.png');
      this.load.image('esmoquin', 'esmoquin.png');
      this.load.image('greenTimer', 'greentimer.png');

      //Debuffs Sprites
      this.load.setPath('./assets/Sprites/Interactuables/Debuffs');
      this.load.image('redTimer', 'redtimer.png');
      this.load.image('vino', 'vino.png');

      //Vida Sprites
      this.load.setPath('./assets/Sprites/Interactuables/Life');
      this.load.image('salmonFish', 'salmonFish.png');

      //Mafioso Sprites
      this.load.setPath('./assets/Sprites/Mafioso');
      this.load.image('bullet', 'bala.png');
      this.load.image('gangster', 'mafioso.png');

      //FallObjects Sprites
      this.load.setPath('./assets/Sprites/FallObjects');
      this.load.image('maceta', 'maceta.png');

      //Menu Sprites
      this.load.setPath('./assets/Sprites/Menu');
      this.load.image('playButton' , 'PlayButton.png');
      this.load.image('exitButton', 'ExitButton.png');
      this.load.image('resumeButton', 'resumeButton.png');
      this.load.image('settingsButton', 'settingsButton.png');
      this.load.image('backButton', 'backButton.png');
      this.load.image('controls', 'controls.png');
    }
    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      this.scene.start('menu');
      
    }
  }