
export default class Boot extends Phaser.Scene {
    constructor() {
      super({ key: 'boot' });
    }
  
    /**
     * Loading of game assets
     */
    preload() {

      this.load.setPath('./assets/backgrounds');
      this.load.image('sky', 'sky.png');
      this.load.image('backhouse', 'backhouses.png');
      this.load.image('road', 'road.png');
      this.load.image('crosswalk', 'crosswalk.png');
      this.load.image('houses1', 'houses1.png');
      this.load.image('houses2', 'houses2.png');
      this.load.image('pauseBackGround', 'blackBackground.png');   
      this.load.image('playBackGround', 'playBackGround.png');
      this.load.image('playBackGround_V2', 'playBackGround_V2.png');

      //Police Sprites
      this.load.setPath('./assets/Sprites/Police');
      this.load.spritesheet('policeRun','policeRun.png',{frameWidth:128,frameHeight:128})
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
      this.load.image('streetlight', 'streetLight.png');
      this.load.image('seat', 'seat.png');
      this.load.image('bin', 'bin.png');


      //Buildings Sprites
      this.load.setPath('./assets/Sprites/Buildings');
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
      this.load.setPath('./assets/Sprites/Interface');
      this.load.atlas("healthBar","healthBar.png","healthBar.json"); 
      this.load.atlas("powerUpBar", "powerUpBar.png", "powerUpBar.json");
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
      this.load.image('vino', 'beer.png');

      //Life Sprites
      this.load.setPath('./assets/Sprites/Interactuables/Life');
      this.load.image('salmonFish', 'salmonFish.png');

      //Gangster Sprites
      this.load.setPath('./assets/Sprites/Gangster');
      this.load.image('bullet', 'bullet.png');
      this.load.image('gangster', 'gangster.png');
      this.load.image('advice', 'GangsterAdvice.png');

      //FallObjects Sprites
      this.load.setPath('./assets/Sprites/FallObjects');
      this.load.image('maceta', 'flowerPot.png');
      this.load.image('ladrillo', 'brick.png');

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
      this.load.image('cartelBusted', 'lose.png');
      this.load.image('youScape','youScape.png');
      this.load.image('volumeBar', 'VolumeBar.png');
      this.load.image('volumeIcon', 'Volume.png');
      this.load.image('rain', 'rain.png');
      this.load.image('roadSign', 'trainSignal2.png');


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
      this.load.audio('fallingobjectSound', 'brokenVase.mp3');
      this.load.audio('damageSound', 'DamageSound.mp3');
      this.load.audio('gunSound', 'GunShotSound.mp3');
      this.load.audio('deathsound', 'DeathSound.mp3');
      this.load.audio('gameSong', 'GameSong.mp3');
      this.load.audio('gameSong2', 'GameSong2.mp3');
      this.load.audio('gameSong3', 'GameSong3.mp3');
      this.load.audio('loseEfect', 'LoseSound.mp3');
      this.load.audio('winSound', 'Win.mp3');
      this.load.audio('startSound', 'A Hearty Fellow (LOOP).wav');
      this.load.audio('loseSound', 'changes.mp3');
    }
    /**
     * Creation of the scene. In this case, we only switch to the scene representing the
     */
    create() {
      this.scene.start('menu');
    }
  }