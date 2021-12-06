import Player from './Player/player.js';
import Police from './Police/police.js';
import Salmon from './Interactuables/Life/Salmon.js';
import Coffe from './Interactuables/PowerUps/Coffe.js';
import RedTimer from './Interactuables/Debuffs/RedTimer.js';
import GreenTimer from './Interactuables/PowerUps/GreenTimer.js';
import Box from './StaticObjects/Box.js';
import Chrono from './Timer/Chrono.js';
import Esmoquin from './Interactuables/PowerUps/esmoquin.js';
import Gangster from './Mafioso/gangster.js';
import Alcohol from './Interactuables/Debuffs/alcohol.js';
import FallingObject from './FallingObjects/fallingObject.js';
import HealthBar from './Interfaz/healthBar.js';
import PowerUpBar from './Interfaz/powerUpBar.js';
import FireHydrant from './StaticObjects/fireHydrant.js';
import StaticObject from './StaticObjects/staticobject.js';

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
    
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width*10;

    this.add.image(width*0.5, height*0.5, 'sky')
      .setScale(1.2, 1)
      .setScrollFactor(0);

    this.createAligned(this, totalWidth, 'backhouse', 0.25);
    this.createAligned(this, totalWidth, 'houses2', 0.5);
    this.createAligned(this, totalWidth, 'houses1', 0.5);
    this.createAligned(this, totalWidth, 'road', 1);
    this.createAligned(this, totalWidth, 'crosswalk', 1);
    
    //creamos los distintos elementos del juego
    //Los asociamos al grupo para las colisiones 
    this.activetePause = false;
    this.inSettings = false

    this.powerUpsArray=[];
    const configSound = {
      mute: false,
      volume: 0.3,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };
    this.mainSong= this.sound.add("gameSong",configSound);
    this.mainSong.play();
    this.createObjects(width, height, totalWidth);
    this.createGroups();
    
    
    this.cameras.main.setBounds(0, 0, width*5, height);
    this.cameras.main.startFollow(this.player);

    this.scape = this.input.keyboard.addKey('ESC');
    this.scape.on('down', () => {
     
    });
      

    this.kick = this.input.keyboard.addKey('K');
    this.kick.on('down', () => {});


    // Barra de vida   
    this.healthBar = new HealthBar(this, 100, 100, this.player);
    this.powerUpBar = new PowerUpBar(this, 180, 100, this.player);
    //this.pauseMenu = new PauseMenu(this);


    // CAMBIAR BOUDING BOX DE TAMAÑO
    this.time.addEvent({delay: 500, callback: this.delayDone, callbackScope: this, loop: false})

    this.pointer = this.input.activePointer;

    this.pointerDown = false;
    this.volumeValue = 0.5;

    this.maxVolumeValue = 1.0;
    this.minVolumeValue = 0.0;

  }

  update(){
    const cam = this.cameras.main;
    const speed = 1;

     
    cam.scrollX += speed;

    if(this.police.isHelicopter()){

      if(this.police.body.x>=this.player.body.x){
        this.player.arrestado();
        this.player.getActualScene().chrono.finish();
        this.police.catchP(this.player);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
      if(!this.activetePause){
        this.scene.pause();
        this.scene.launch("pauseMenu",this.mainSong);
      }
    } 

    // Comprueba si el jugador ha pulsado la tecla para dar una patada
    if(Phaser.Input.Keyboard.JustDown(this.kick)){
      this.kickZone = this.add.zone(this.player.x+this.player.width*1.3, this.player.y, this.player.width, this.player.height);
      this.physics.world.enable(this.kickZone);
      this.kickZone.body.setAllowGravity(false);
      this.kickZone.body.setImmovable(true);

      this.physics.add.collider(this.kickZone, this.fallObjs,(o1,o2)=> {
     
        o2.handleCollisionFallObj(false,true);
     }); 

      this.delete_zone = this.time.addEvent({ 
        delay: 300, 
        callback: this.destroyZone, 
        args: [this.kickZone], 
        loop: false });
            
    }

  }

  isPaused(){
    return this.activetePause;
  }


  lose(){
    this.mainSong.stop();
    this.scene.start('gameover');
  }

  win(){
    this.mainSong.stop();
    this.runTime= this.chrono.getTimeElapsed();
    this.scene.start('win', { runT: this.runTime});
  }

  iconAdvice(){
    this.icon =  this.add.image(this.scale.width*0.9, this.gangster.y, 'advice').setScrollFactor(0);
  }

  destroyIconAdvice(){
    this.icon.destroy();
  }

/**
 * Creates collision groups and adds colliders between them
 * 
 * 
 */
  createGroups()
  {
    //GRUPO DE LAS PLATAFORMAS
     this.platforms = this.physics.add.staticGroup();
     this.platforms.add(this.platform);
     this.physics.add.collider(this.player,this.platforms);    // COLISION ENTRE PLAYER Y PLATAFORMAS
    
     // GRUPO DE LOS EDIFICIOS
     this.buildings = this.physics.add.staticGroup();
     this.buildings.add(this.building);
     this.buildings.add(this.building2);
     this.buildings.add(this.building3);
     this.buildings.add(this.building4);
     this.buildings.add(this.building5);
     this.physics.add.collider(this.player,this.buildings);

    
     this.salmons = this.physics.add.group();
     this.salmons.add(this.salmon);
     this.physics.add.overlap(this.player,this.salmons,(o1,o2)=> {
      onCollision(o1,o2);
   })
    this.esmoquins = this.physics.add.group();
    this.esmoquins.add(this.esmoquin);
    this.esmoquins.add(this.esmoquin2);
    this.physics.add.overlap(this.player,this.esmoquins,(o1,o2)=> {
      onCollision(o1,o2);
    })

     //Para crear la colision entre grupos usamos grupos estaticos por que si no no funciona

    //GRUPO DE LOS TIMERS
    this.timers = this.physics.add.group();
    this.timers.add(this.redTimer);
    this.timers.add(this.greenTimer)
    this.physics.add.overlap(this.player,this.timers,(o1,o2)=> {
      onCollision(o1,o2);
    });

    //GRUPO DE LOS CAFÉS
     
    this.coffes = this.physics.add.group();
    this.coffes.add(this.coffe1);
    this.physics.add.overlap(this.player,this.coffes,(o1,o2)=> {
      onCollision(o1,o2);
    });
    //GRUPO DE LOS OBJETOS CAYENTES CON EL SUELO Y EL PLAYER
    this.fallObjs= this.physics.add.group();
    this.fallObjs.add(this.fallObjEx);
    this.fallObjs.add(this.fallObjEx2);
    this.fallObjs.add(this.fallObjEx3);
    this.physics.add.overlap(this.player,this.fallObjs,(o1,o2)=> {
     
      o2.handleCollisionFallObj(true,false);
    });
    this.physics.add.collider(this.groundZone,this.fallObjs,(o1,o2)=> {
      o2.handleCollisionFallObj(false,false);
    });

    this.alcohols = this.physics.add.group();
    this.alcohols.add(this.alcoholEx);
    this.physics.add.overlap(this.player,this.alcohols,(o1,o2)=> {
      onCollision(o1,o2);
    });
    // VICTORY
    this.physics.add.collider(this.winZone,this.player,(o1,o2)=>{
      this.win();
    });

    //GRUPO DE LAS PLATAFORMAS Y EL POLICIA

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.platform);


    //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.collider(this.player,this.police,(o1,o2)=>{
      o1.arrestado();
      o1.getActualScene().chrono.finish();
      o2.catchP(o1);
    });
  

    this.boxes = this.physics.add.staticGroup();
    this.boxes.add(this.box);
    this.physics.add.collider(this.player, this.box,(o1,o2)=> {
      onCollision(o1,o2);
    });

  }
  
/**
 * Create GameObjects and adjust its size
 * @param {*} width -specifies individual ground width for its creation
 * @param {*} height -specifies ground height for its creation
 * @param {*} totalWidth -specifies total  ground width for its creation
 */
  createObjects(width, height, totalWidth)
  {
    this.player = new Player(this, 250, 300, 3);
    this.police= new Police(this,70,400);
    this.gangster = new Gangster(this, this.player, 3700, 450);
    this.box = new Box(this, 350, 535);

    // VICTORY
    this.winZone=this.add.zone(4500,600,40,totalWidth);
    this.physics.world.enable(this.winZone);
    this.winZone.body.setAllowGravity(false);
    this.winZone.body.setImmovable(true);

    // POLICE ZONE
    this.helicopterZone=this.add.zone(3300,600,40,totalWidth);
    this.physics.world.enable(this.helicopterZone);
    this.helicopterZone.body.setAllowGravity(false);
    this.helicopterZone.body.setImmovable(true);
    this.physics.add.collider(this.helicopterZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.policeAgain();
    });

    // HELICOPTER ZONE
    this.policeZone=this.add.zone(1850,600,40,totalWidth);
    this.physics.world.enable(this.policeZone);
    this.policeZone.body.setAllowGravity(false);
    this.policeZone.body.setImmovable(true);
    this.physics.add.collider(this.policeZone,this.police,(o1,o2)=>{
      o1.destroy();
      o2.intoHelicopter();
    });


    // SUELO
    this.groundZone = this.add.zone(0, 600, totalWidth, this.player.height/2);
    this.physics.world.enable(this.groundZone);
    this.groundZone.body.setAllowGravity(false);
    this.groundZone.body.setImmovable(true);

    this.physics.add.collider(this.groundZone, this.player);
    this.physics.add.collider(this.groundZone, this.police);
    this.physics.add.collider(this.groundZone, this.gangster);


    // AÑADIR TODOS LOS GRUPOS
    
    
    

    this.salmon= new Salmon(this, this.player, 2800, 50,'salmonFish',true);
    this.powerUpsArray.push(this.salmon);

    this.esmoquin= new Esmoquin( this,this.player, 1300, 100,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin);
    this.esmoquin2= new Esmoquin( this,this.player, 3500, 70,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin2);
    
    
    this.alcoholEx= new Alcohol( this,this.player, 800, 70,'vino',true);
    this.powerUpsArray.push(this.alcoholEx);

    this.coffe1= new Coffe( this,this.player, 1000, 100,'coffe',true);
    this.powerUpsArray.push(this.coffe1);

    this.fallObjEx = new FallingObject(this,this.player, 1500, 100,'maceta');
    console.log(this.fallObjEx);
    this.fallObjEx2 = new FallingObject(this,this.player, 1800, 100,'maceta');
    console.log(this.fallObjEx2);
    this.fallObjEx3 = new FallingObject(this,this.player, 2750, 100,'maceta');
    console.log(this.fallObjEx3);
    
    this.platform = new StaticObject(this, this.player.y, 400, 'platform'); 
    this.fireHydrant = new FireHydrant(this, 700, 535);
    this.car = new StaticObject(this, 1100, 500, 'car');

    this.building = new StaticObject(this, width*2, height, 'platform');
    this.scaleBuilding(this.building, this.building.width, this.building.height, 5);
    
    this.building2 = new StaticObject(this, width*2+this.building.width, height, 'platform');
    this.scaleBuilding(this.building2, this.building2.width, this.building2.height, 8);

    this.building3 = new StaticObject(this, width*2+this.building2.width*2, height, 'platform');
    this.scaleBuilding(this.building3, this.building3.width, this.building3.height, 6);

    this.building4 = new StaticObject(this, width*2+this.building3.width*3, height, 'platform');
    this.scaleBuilding(this.building4, this.building4.width, this.building4.height, 3);

    this.building5 = new StaticObject(this, width*2+this.building4.width*4, height, 'platform');
    this.scaleBuilding(this.building5, this.building5.width, this.building5.height, 8);

    this.timeBar = this.add.sprite(920, 50, 'timeBar', 'timeBar.png').setScrollFactor(0);
    this.chrono= new Chrono(this,true);
    

    this.redTimer= new RedTimer( this,this.player, 2200, 100,'redTimer',true,this.chrono);
    this.powerUpsArray.push(this.redTimer);
    this.greenTimer= new GreenTimer( this,this.player, 2400, 100,'greenTimer',true,this.chrono);
    this.powerUpsArray.push(this.greenTimer);
    
  }

  destroyZone(args){
    args.destroy();
  }

  // Cambiar tamaño sprites
  delayDone(){
    this.player.body.setSize(this.player.width/2, this.player.height/1.5, true);
  }
  /**
 * External function that is called to generate the parallax objects
 * @param {*} scene - Scene
 * @param {*} totalWidth - Total Width of the Game
 * @param {*} texture - Image/Sprite to be generated
 * @param {*} scrollFactor - Scroll factor of the image
 */
  createAligned(scene, totalWidth, texture, scrollFactor) {

    const w = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / w) * scrollFactor;
  
    let x = 0;
  
    for(let i = 0; i < count; ++i){
      const b = scene.add.image(x, scene.scale.height, texture)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor);  
  
      x += b.width; 
    }
    
  }
  /**
 * External function that is called to scalate the height of the buildings.
 * This is used to generate buildings of different heights.
 * @param {*} platform - Building
 * @param {*} width - Width of the building
 * @param {*} height - Height of the building
 * @param {*} buildingScaleFactor - Scale factor of the building (only affects height)
 */
  scaleBuilding(platform, width, height,  buildingScaleFactor) {
    platform.setSize(width, height*(buildingScaleFactor*2-1));
    platform.setScale(1, buildingScaleFactor);
    platform.body.setSize(platform.width, platform.height, true);
  }
}

/**
 * External function that is called when object collide
 * @param {*} obj1 - Player or Kick zone
 * @param {*} obj2 - Object that player collides with
 */
function onCollision(obj1,obj2) {
  obj2.handleCollision(); 
}


 

