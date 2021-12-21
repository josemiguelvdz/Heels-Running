
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
      this.load.image('playBackGround_V2', 'playBackGround_V2.png');

      //Police Sprites
      this.load.setPath('./assets/Sprites/Police');
      this.load.spritesheet('policeRun','policeRun.png',{frameWidth:128,frameHeight:128})
      this.load.spritesheet('smokeAnimation','humoSpriteSheet.png',{frameWidth:64,frameHeight:64});
      this.load.spritesheet('helicopterAnimation','helicopterAnimation.png',{frameWidth:254,frameHeight:180});
      this.load.image('policeAdvice','PoliceAdvice.png');
      this.load.image('helicopterAdvice','HelicopterAdvice.png');
     

      //Player Sprites
      this.load.setPath('./assets/Sprites/Player');
      this.load.spritesheet('idle','idlespritesheet.png',{frameWidth:64, frameHeight:64})
      this.load.spritesheet('run','playerRun.png',{frameWidth:128, frameHeight:128});
      this.load.spritesheet('jump', 'playerJump.png',{frameWidth:128, frameHeight:128});
      this.load.spritesheet('jump_kick', 'playerJumpKick.png', {frameWidth:128, frameHeight: 128});
      this.load.spritesheet('ground_kick', 'playerGroundKick.png', {frameWidth:128, frameHeight: 128});
      this.load.spritesheet('kick_particles', 'kickParticles.png', {frameWidth:128, frameHeight: 128})
      //WinBackGround
      this.load.setPath('./assets/Sprites/Menu');
      this.load.spritesheet('trainBackground','trainBackground.png',{frameWidth:540,frameHeight:331});
     
      //StaticObjects Sprites
      this.load.setPath('./assets/Sprites/StaticObjects');
      this.load.image('platform', 'platform.png');
      this.load.spritesheet('boxDestruction', 'boxAnimation.png', {frameWidth:64, frameHeight:64});
      this.load.image('fireHydrant', 'fireHydrant.png');
      this.load.image('policeCar', 'policeCar.png');
      this.load.image('streetlight', 'Farola.png');
      this.load.image('seat', 'seat.png');
      this.load.image('bin', 'bin.png');


      //Buildings Sprites
      this.load.setPath('./assets/Sprites/Edificios');
      this.load.image('phoneCenter', 'building8.png');
      this.load.image('whiteBuilding', 'building6.png');
      this.load.image('candyBuilding', 'building15.png');
      this.load.image('candyBuilding2', 'building1.png');
      this.load.image('bakery', 'building5.png');
      this.load.image('burguer', 'building3.png');
      this.load.image('stairs', 'building16.png');
      this.load.image('stairBuilding', 'building4.png');
      this.load.image('spainBuilding', 'building14.png');
      this.load.image('redLargeBuilding', 'building10.png');
      this.load.image('presidentialBuilding', 'building7.png');
      this.load.image('modernBuilding', 'building11.png');
      this.load.image('oldBuilding', 'building9.png');

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
      this.load.image('ladrillo', 'ladrillo.png');

      //Menu Sprites
      this.load.setPath('./assets/Sprites/Menu');
      this.load.spritesheet('mainMenu', 'MainMenu.png', {frameWidth:1920, frameHeight:1080});
      this.load.spritesheet('loseBackGround', 'gameoverbackground.png', {frameWidth:480, frameHeight:254});
      this.load.image('playButton_' , 'PlayButton.png');
      this.load.image('playButton' , 'PlayButton_V2.png');
      this.load.image('playButton2' , 'PlayButton_V3.png');
      this.load.image('exitButton', 'ExitButton.png');
      this.load.image('exitButton_V2', 'ExitButton_V2.png');
      this.load.image('resumeButton', 'resumeButton.png');
      this.load.image('settingsButton', 'settingsButton.png');
      this.load.image('backButton', 'backButton.png');
      this.load.image('controlsTitle', 'controlTitle.png');
      this.load.image('controls', 'controls.png');
      this.load.image('menuLayout', 'menuLayout.png');
      this.load.image('cartelBusted', 'losedefinitivo.png');
      this.load.image('youScape','youScape.png');
      this.load.image('volumeBar', 'VolumeBar.png');
      this.load.image('volumeIcon', 'Volume.png');
      this.load.image('rain', 'rain.png');
      this.load.image('roadSign', 'cartel_final_2.png');


      //Particles
      this.load.setPath('./assets/Sprites/Particles');
      this.load.image('breakingParticle' , 'BreakingParticle.png');
      this.load.image('bloodParticle' , 'BloodParticle.png');
      this.load.image('dustParticle' , 'DustParticle.png');
      this.load.image('waterParticle' , 'Water.png');
      this.load.image('shotParticle' , 'shot.png');

      //Sounds
      this.load.setPath('./assets/Sounds/SoundEffects');
      this.load.audio('powerupSound', 'PowerUpSound.mp3');
      this.load.audio('debuffSound', 'DebuffSound.mp3');
      this.load.audio('fallingobjectSound', 'JarronRotoSound.mp3');
      this.load.audio('damageSound', 'DamageSound.mp3');
      this.load.audio('gunSound', 'GunShotSound.mp3');
      this.load.audio('deathsound', 'DeathSound.mp3');
      this.load.audio('gameSong', 'GameSong.mp3');
      this.load.audio('loseSound', 'LoseSound.mp3');
      this.load.audio('winSound', 'Win.mp3');

   
    }
    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
      this.scene.start('menu');
    }
  }