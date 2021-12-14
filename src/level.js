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
import FireHydrant from './StaticObjects/fireHydrant.js';
import StaticObject from './StaticObjects/staticobject.js';
import Interface from './Interfaz/interface.js';

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

    // CAMBIAR BOUDING BOX DE TAMAÑO
    this.time.addEvent({delay: 500, callback: this.delayDone, callbackScope: this, loop: false})

    this.volume = 0.5;
    this.slideX = 0;

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
        this.lose();
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
      this.scene.pause();
      this.scene.launch("pauseMenu", this);
    } 

    this.mainSong.setVolume(this.ChangeVolume());
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

  ChangeVolume(){
    return this.volume;
  }

  SaveSlidePos(posX){
      this.slideX = posX;
  }

  SlidePos(){
    return this.slideX;
  }


/**
 * Creates collision groups and adds colliders between them
 */
  createGroups()
  {

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

    this.alcohols = this.physics.add.group();
    this.alcohols.add(this.alcoholEx);
    this.physics.add.overlap(this.player,this.alcohols,(o1,o2)=> {
      onCollision(o1,o2);
    });

    // VICTORY
    this.physics.add.collider(this.winZone,this.player,(o1,o2)=>{
      this.win();
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
    this.createObjectGroups();

    this.police = new Police(this,-500, 300);
    this.createZones(totalWidth);

    // MAPA DEL JUEGO

    this.createAllBoxes();
    this.createAllFireHydrants();
    this.createAllCars();
    this.createAllBuildings();
    
    this.player = new Player(this, -400, 300, 3);
    this.createAllFallObjects();

    this.createAllGangsters();

   
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
   

    this.timeBar = this.add.sprite(this.scale.width-100, 50, 'timeBar', 'timeBar.png').setScrollFactor(0);
    this.chrono= new Chrono(this, true);
    

    this.redTimer= new RedTimer( this,this.player, 2200, 100,'redTimer',true,this.chrono);
    this.powerUpsArray.push(this.redTimer);
    this.greenTimer= new GreenTimer( this,this.player, 2400, 100,'greenTimer',true,this.chrono);
    this.powerUpsArray.push(this.greenTimer);


    // SUELO
    this.createGroundZone(totalWidth);

    // INTERFAZ - Barra de vida y tiempo
    this.interface = new Interface(this, this.player);


    // Handle colliders
    this.handleColliders();
    
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


  createBoxPowerUp(number,x,y){
    if(number===0)this.powerE=new Coffe( this,this.player, x, y,'coffe',false);
    else if(number==1)this.powerE=new Salmon(this, this.player, x, y,'salmonFish',false);
    else if(number==2)this.powerE=new Esmoquin(this,this.player, x, y,'esmoquin',false);
    this.powerE.setScale(.5,.5);
    this.physics.add.collider(this.player,this.powerE,onCollision);
  }



  createAllBoxes()
  {
    this.createBox(1800, 535);
    this.createBox(1864, 535);
    this.createBox(1928, 535);
    this.createBox(2700, 535);
    this.createBox(2700, 535);
    this.createBox(2764, 535);
    this.createBox(2700, 471);
    this.createBox(3800, 535);
    this.createBox(3864, 535)
    this.createBox(3928, 535);
    this.createBox(3864, 471);
    this.createBox(3800, 471);
  }
  createAllFireHydrants()
  {
    this.createFireHydrant(1500, 535);
    this.createFireHydrant(4300, 535);
  }
  createAllCars()
  {
    this.createCar(1000, 520);
    this.createCar(4900, 520);
  }
  createAllBuildings()
  {
    this.createBuilding(2400, 460, 'phoneCenter', true);
    this.createBuilding(3300, 100, 'whiteBuilding', false);
    this.createBuilding(5600, 460, 'candyBuilding', true);
  }
  createAllFallObjects()
  {
    this.createFallObj(3300, 100);
  }
  createAllGangsters()
  {
    this.createGangster(3700, 450);
  }

  createObjectGroups()
  {
    this.boxes = this.physics.add.staticGroup();
    this.policeCars = this.physics.add.staticGroup();
    this.fallObjs = this.physics.add.group();
    this.fireHydrants = this.physics.add.staticGroup();
    this.buildings = this.physics.add.staticGroup();
  }

  createBox(x,y)
  {
    this.box = new Box(this,x,y,'boxDestruction');
    this.boxes.add(this.box);
  }
  createFireHydrant(x,y)
  {
    this.fireHydrant = new FireHydrant(this, x, y, 'fireHydrant');
    this.fireHydrants.add(this.fireHydrant);
  }
  createCar(x, y)
  {
    this.policeCar = new StaticObject (this, x, y, 'policeCar');
    this.policeCars.add(this.policeCar);
  }
  createBuilding(x, y, spriteName, colliderActive)
  {
    this.building = new StaticObject(this, x, y, spriteName);
    if(colliderActive)  this.buildings.add(this.building);
  }
  createFallObj(x, y)
  {
    this.fallObj = new FallingObject(this, this.player, x, y, 'maceta');
    this.fallObjs.add(this.fallObj);
  }
  createGangster(x, y)
  {
    this.gangster = new Gangster(this, this.player, x, y);
  }

  handleColliders()
  {
    this.physics.add.collider(this.player,this.policeCars,(o1,o2)=>{
      });

    this.physics.add.collider(this.player,this.buildings,(o1,o2)=>{
      });

    this.physics.add.collider(this.player, this.boxes,(o1,o2)=> {
        o2.handleCollision();
      });    
    this.physics.add.overlap(this.player,this.fallObjs,(o1,o2)=> {
        o2.handleCollisionFallObj(true,false);
      });
    this.physics.add.collider(this.groundZone,this.fallObjs,(o1,o2)=> {
      o2.handleCollisionFallObj(false,false);
    });
    this.physics.add.collider(this.player, this.fireHydrants,(o1,o2)=> {
        o2.setCollision();
      });
      //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.collider(this.player,this.police,(o1,o2)=>{
        o1.arrestado();
        o1.getActualScene().chrono.finish();
        o2.catchP(o1);
          });
        
   }

   createGroundZone(totalWidth)
   {
    this.groundZone = this.add.zone(0, 600, totalWidth, 64);
    this.physics.world.enable(this.groundZone);
    this.groundZone.body.setAllowGravity(false);
    this.groundZone.body.setImmovable(true);
  
    this.physics.add.collider(this.groundZone, this.player);
    this.physics.add.collider(this.groundZone, this.police);
    this.physics.add.collider(this.groundZone, this.gangster);
    this.physics.add.collider(this.groundZone,this.fallObjs,(o1,o2)=> {
      o2.handleCollisionFallObj(false,false);
    });   
   }

   createZones(totalWidth)
   {
    // VICTORY ZONE
    this.winZone=this.add.zone(totalWidth,600,40,totalWidth);
    this.physics.world.enable(this.winZone);
    this.winZone.body.setAllowGravity(false);
    this.winZone.body.setImmovable(true);
        // VICTORY
        this.physics.add.collider(this.winZone,this.player,(o1,o2)=>{
          this.win();
        });

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


 

