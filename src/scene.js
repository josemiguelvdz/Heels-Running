import Player from './Player/player.js';
import Police from './Police/police.js';
import Platform from './StaticObjects/platform.js';
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

    createAligned(this, totalWidth, 'backhouse', 0.25);
    createAligned(this, totalWidth, 'houses2', 0.5);
    createAligned(this, totalWidth, 'houses1', 0.5);
    createAligned(this, totalWidth, 'road', 1);
    createAligned(this, totalWidth, 'crosswalk', 1);
    
     //creamos los distintos elementos del juego
     //Los asociamos al grupo para las colisiones 
     this.activetePause = false;

     this.powerUpsArray=[];
     this.createObjects(width, height, totalWidth);
     this.createGroups();
    
    
      this.cameras.main.setBounds(0, 0, width*5, height);
      this.cameras.main.startFollow(this.player);

      

      this.scape = this.input.keyboard.addKey('ESC');
      this.scape.on('down', () => {
      this.chrono.changeTime();
      for(let i=0;i<this.powerUpsArray.length;i++)
      {
        if(this.powerUpsArray[i].movesbyTween)this.powerUpsArray[i].tweenMovement.pause();
      }
      this.player.deactivePowerUpTimes();
      this.player.contador.changeTime();
      
     });
      

      this.kick = this.input.keyboard.addKey('K');
      this.kick.on('down', () => {});


      // Barra de vida   
      this.healthBar = new HealthBar(this, 100, 100, this.player);
      this.powerUpBar = new PowerUpBar(this, 180, 100, this.player);


      // CAMBIAR BOUDING BOX DE TAMAÑO
      //this.time.addEvent({delay: 1000, callback: this.delayDone, callbackScope: this, loop: false})

  }

  update(){
    const cam = this.cameras.main;
    const speed = 1;

     
    cam.scrollX += speed;

    if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
      this.stop(this.activetePause);
    } 

    // Comprueba si el jugador ha pulsado la tecla para dar una patada
    if(Phaser.Input.Keyboard.JustDown(this.kick)){
      this.zone = this.add.zone(this.player.x+this.player.width*1.3, this.player.y, this.player.width, this.player.height);
      this.physics.world.enable(this.zone);
      this.zone.body.setAllowGravity(false);
      this.zone.body.setImmovable(false);

      this.physics.add.collider(this.zone, this.redTimer, onCollision);

      this.delete_zone = this.time.addEvent({ 
        delay: 300, 
        callback: this.DestroyZone, 
        args: [this.zone], 
        loop: false });
            
    }

  }


  stop(activetePause){

    this.physics.pause();

    if(!this.activetePause){

       this.pauseBackGround = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'pauseBackGround').setScale(1.2, 1).setScrollFactor(0);
       this.pauseBackGround.alpha = 0.5;

       this.menuLayout =  this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'menuLayout').setScale(0.7, 0.5).setScrollFactor(0);
       
       this.activetePause = true;
       this.fallObjEx.handleMovement();
       this.fallObjEx2.handleMovement();
       this.fallObjEx3.handleMovement();

       this.resumeButton = this.add.image(this.scale.width*0.5, this.scale.height*0.3, 'resumeButton').setInteractive().setScrollFactor(0);

       this.resumeButton.on('pointerdown', () => {
         this.activetePause = false;
         this.pauseBackGround.destroy();
         this.exitButton.destroy();
         this.resumeButton.destroy();
         this.settingsButton.destroy();
         this.menuLayout.destroy();
         this.physics.resume();

         this.chrono.changeTime();
         this.player.contador.changeTime();
         for(let i=0;i<this.powerUpsArray.length;i++)
         {
             if(this.powerUpsArray[i].movesbyTween)this.powerUpsArray[i].tweenMovement.resume();
         }
         this.player.activatePowerUpTimes();

        });

        this.settingsButton = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'settingsButton').setInteractive().setScrollFactor(0);

        this.settingsButton.on('pointerdown', () => {this.settings(), this.resumeButton.destroy(), this.settingsButton.destroy(), 
                                                            this.exitButton.destroy(),  this.menuLayout.destroy()});

       this.exitButton = this.add.image(this.scale.width*0.5, this.scale.height*0.7, 'exitButton').setInteractive().setScrollFactor(0);

       this.exitButton.on('pointerdown', () => {this.scene.start('menu'), this.activetePause = false});
  
     }
  }

  settings(){
    
    this.controls = this.add.image(this.scale.width*0.5, this.scale.height*0.4, 'controls').setScale(0.6, 0.7);
    this.backButton = this.add.image(100, 70, 'backButton').setInteractive();

    this.backButton.on('pointerdown', () => {
      this.controls.destroy(), this.backButton.destroy(), this.pauseBackGround.destroy(), this.activetePause = false, this.stop(this.activetePause)});
  }

  isPaused(){
    return this.activetePause;
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
      console.log("Huele a que entra");
      o2.handleCollisionFallObj(true);
   });

   this.alcohols = this.physics.add.group();
   this.alcohols.add(this.alcoholEx);
   this.physics.add.overlap(this.player,this.alcohols,(o1,o2)=> {
    onCollision(o1,o2);


    this.physics.add.overlap(this.groundZone,this.fallObjs,(o1,o2)=> {
    
      o2.handleCollisionFallObj(false);
   });
 });



    //GRUPO DE LAS PLATAFORMAS Y EL POLICIA

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.platform);
    this.physics.add.collider(this.police,this.platforms,helicopter);    // COLISION ENTRE PLAYER Y PLATAFORMAS


    // GRUPO DE LOS EDIFICIOS Y EL POLICIA
    this.buildings = this.physics.add.staticGroup();
    this.buildings.add(this.building);
    this.buildings.add(this.building2);
    this.buildings.add(this.building3);
    this.buildings.add(this.building4);
    this.buildings.add(this.building5);
    this.physics.add.collider(this.police,this.buildings,helicopter);

    //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.collider(this.player,this.police,onCollisionPolice);

    this.physics.add.collider(this.groundZone,this.player,onPlayerGround);

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
    this.player = new Player(this, 200, 300, 3);
    this.police= new Police(this,0,300,3);
    this.gangster = new Gangster(this, this.player, 500, 450);
    this.box = new Box(this, 350, 535);



    // SUELO
    this.groundZone = this.add.zone(0, 600, totalWidth, this.player.height);
    this.physics.world.enable(this.groundZone);
    this.groundZone.body.setAllowGravity(false);
    this.groundZone.body.setImmovable(true);

    this.physics.add.collider(this.groundZone, this.player);
    this.physics.add.collider(this.groundZone, this.police);
    this.physics.add.collider(this.groundZone, this.gangster);
    // AÑADIR TODOS LOS GRUPOS
    
    
    this.timeBar = this.add.sprite(920, 50, 'timeBar', 'timeBar.png').setScrollFactor(0);

    this.chrono= new Chrono(this,true);
    this.salmon= new Salmon(this, this.player, 1200, 100,'salmonFish',true);
    this.powerUpsArray.push(this.salmon);

    this.esmoquin= new Esmoquin( this,this.player, 300, 100,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin);
    this.esmoquin2= new Esmoquin( this,this.player, 1500, 70,'esmoquin',true);
    this.powerUpsArray.push(this.esmoquin2);
    
    this.redTimer= new RedTimer( this,this.player, 500, 100,'redTimer',true,this.chrono);
    this.powerUpsArray.push(this.redTimer);
    this.greenTimer= new GreenTimer( this,this.player, 50, 100,'greenTimer',true,this.chrono);
    this.powerUpsArray.push(this.greenTimer);
    
    this.alcoholEx= new Alcohol( this,this.player, 800, 70,'vino',true);
    this.powerUpsArray.push(this.alcoholEx);

    this.coffe1= new Coffe( this,this.player, 600, 100,'coffe',true);
    this.powerUpsArray.push(this.coffe1);

    this.fallObjEx = new FallingObject(this,this.player, 800, 300,'maceta');
    console.log(this.fallObjEx);
    this.fallObjEx2 = new FallingObject(this,this.player, 1300, 300,'maceta');
    console.log(this.fallObjEx2);
    this.fallObjEx3 = new FallingObject(this,this.player, 1700, 300,'maceta');
    console.log(this.fallObjEx3);
    
    this.platform = new Platform(this, this.player.y, 400); 

    this.building = new Platform(this, width*2, height);
    scaleBuilding(this.building, this.building.width, this.building.height, 5);
    
    this.building2 = new Platform(this, width*2+this.building.width, height);
    scaleBuilding(this.building2, this.building2.width, this.building2.height, 8);

    this.building3 = new Platform(this, width*2+this.building2.width*2, height);
    scaleBuilding(this.building3, this.building3.width, this.building3.height, 6);

    this.building4 = new Platform(this, width*2+this.building3.width*3, height);
    scaleBuilding(this.building4, this.building4.width, this.building4.height, 3);

    this.building5 = new Platform(this, width*2+this.building4.width*4, height);
    scaleBuilding(this.building5, this.building5.width, this.building5.height, 8);
    
  }

  DestroyZone(args){
    args.destroy();
  }


  // Cambiar tamaño sprites
  delayDone(){
    this.redTimer.body.setSize(this.redTimer.width/2, this.redTimer.height, true);
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
/**
 * External function that is called when pollice and player collide
 * Stop the time of the run
 * @param {*} obj1 - Player
 * @param {*} obj2 - Police
 */
function  onCollisionPolice (obj1,obj2) {
  obj1.Arrestado();
  obj1.getActualScene().chrono.finish();
  obj2.catchP(obj1);
}

/**
 * External function that is called to generate the parallax objects
 * @param {*} scene - Scene
 * @param {*} totalWidth - Total Width of the Game
 * @param {*} texture - Image/Sprite to be generated
 * @param {*} scrollFactor - Scroll factor of the image
 */
function createAligned(scene, totalWidth, texture, scrollFactor) {

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
function scaleBuilding(platform, width, height,  buildingScaleFactor) {
  platform.setSize(width, height*(buildingScaleFactor*2-1));
  platform.setScale(1, buildingScaleFactor);
  platform.body.setSize(platform.width, platform.height, true);
}
/**
 * External function that is called to transform the polico into a helicopter.
 * @param {*} obj1 - Police
 */
function helicopter(obj1){
    obj1.y=18;
    obj1.helicopter=true;
    obj1.body.setAllowGravity(false);
}

function onPlayerGround(obj2){
  
}


