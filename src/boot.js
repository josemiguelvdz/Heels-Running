
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
      this.load.image('playBackGround', 'playBackGround.png');

      //Police Sprites
      this.load.setPath('./assets/Sprites/Police');
      this.load.spritesheet('policeIdle','testRun.png',{frameWidth:128,frameHeight:128})
      this.load.spritesheet('smokeAnimation','humoSpriteSheet.png',{frameWidth:64,frameHeight:64});
      this.load.spritesheet('helicopterAnimation','helicopterSpritesheet.png',{frameWidth:192,frameHeight:96});

      //Player Sprites
      this.load.setPath('./assets/Sprites/Player');
      this.load.spritesheet('idle','idlespritesheet.png',{frameWidth:64, frameHeight:64})
      this.load.spritesheet('run','testRun.png',{frameWidth:128, frameHeight:128});
      this.load.spritesheet('jump', 'testJump.png',{frameWidth:128, frameHeight:128});
      this.load.spritesheet('jump_kick', 'testKick.png', {frameWidth:128, frameHeight: 128});
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
      this.load.image('advice', 'GangsterAdvice.png');

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
      this.load.image('menuLayout', 'menuLayout.png');
      this.load.image('gameover', 'gameover.png');
      this.load.image('gameoverbackground', 'gameoverbackground.png');
      this.load.image('youWin','youWin.png');

      this.load.setPath('./assets/Sprites/Particles');
      this.load.image('breakingParticle' , 'BreakingParticle.png');

    //Sounds
    this.load.setPath('./assets/Sounds/SoundEffects');
    this.load.audio('powerupSound', 'PowerUpSound.mp3');
    this.load.audio('fallingobjectSound', 'JarronRotoSound.mp3');
    this.load.audio('damageSound', 'DamageSound.mp3');
    this.load.audio('gunSound', 'GunShotSound.mp3');
    this.load.audio('deathsound', 'DeathSound.mp3');
   
   



    }
    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      this.scene.start('menu');
      
    }
  }