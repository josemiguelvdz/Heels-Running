import Player from './Player.js';
import Police from './Police.js';
import Platform from './Platform.js';
import powerUp from './PowerUp.js';
import Ground from './Ground.js';
import salmon from './Salmon.js';
import coffe from './Coffe.js';
import redTimer from './RedTimer.js'
import greenTimer from './GreenTimer.js';
import box from './Box.js';
import timer from './Chrono.js';
import chrono from './Chrono.js';

const createAligned = (scene, totalWidth, texture, scrollFactor) => {

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

const scaleBuilding = (platform, width, height,  buildingScaleFactor) => {
  platform.setSize(width, height*(buildingScaleFactor*2-1));
  platform.setScale(1, buildingScaleFactor);
  platform.body.setSize(platform.width, platform.height, true);
}



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
     this.powerUpsArray=[];
     this.createObjects(width, height, totalWidth);
      this.createGroups();
    
    
      this.cameras.main.setBounds(0, 0, width*5, height);
      //this.cameras.main.startFollow(this.police);

      this.activetePause = false;

      this.scape = this.input.keyboard.addKey('ESC');
      this.scape.on('down', () => {
      for(let i=0;i<this.powerUpsArray.length;i++)
      {
          this.powerUpsArray[i].tweenMovement.pause();
      }});

      this.kick = this.input.keyboard.addKey('K');
      this.kick.on('down', () => {});

      // // Crear zona de collider de patada
      // let zone = this.add.zone(this.player.x+this.player.width, this.player.y, this.player.width, this.player.height).setRectangleDropZone(this.player.width, this.player.height);

      // // visual zone
      // //  Just a visual display of the drop zone
      // let graphics = this.add.graphics();
      // graphics.lineStyle(2, 0xffff00);
      // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

  }

  update(){
    const cam = this.cameras.main;
    const speed = 3;


    // cam.scrollX += speed;

    if (Phaser.Input.Keyboard.JustDown(this.scape)) { 
      this.stop(this.activetePause);
    } 

    // Comprueba si el jugador ha pulsado la tecla para dar una patada
    if(Phaser.Input.Keyboard.JustDown(this.kick)){
      this.player.Kick();
    }

  }


  stop(activetePause){

    this.physics.pause();

    if(!this.activetePause){

       this.pauseBackGround = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'pauseBackGround').setScale(1.2, 1).setScrollFactor(0);
       this.pauseBackGround.alpha = 0.5;
       
       this.activetePause = true;

       this.resumeButton = this.add.image(this.scale.width*0.5, this.scale.height*0.3, 'resumeButton').setInteractive();

       this.resumeButton.on('pointerdown', () => {
         this.activetePause = false;
         this.pauseBackGround.destroy();
         this.exitButton.destroy();
         this.resumeButton.destroy();
         this.settingsButton.destroy();
         this.physics.resume();

         for(let i=0;i<this.powerUpsArray.length;i++)
         {
             this.powerUpsArray[i].tweenMovement.resume();
         }
        });

        this.settingsButton = this.add.image(this.scale.width*0.5, this.scale.height*0.5, 'settingsButton').setInteractive();
        this.settingsButton.on('pointerdown', () => {this.settings()});

       this.exitButton = this.add.image(this.scale.width*0.5, this.scale.height*0.7, 'exitButton').setInteractive();

       this.exitButton.on('pointerdown', () => {this.scene.start('menu'), this.activetePause = false});
  
     }
  }

  settings(){
    
    this.controls = this.add.image(this.scale.width*0.5, this.scale.height*0.4, 'controls').setScale(0.6, 0.7);
    this.backButton = this.add.image(100, 70, 'backButton').setInteractive();

    this.backButton.on('pointerdown', () => {this.controls.destroy(), this.backButton.destroy()});
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
     this.physics.add.collider(this.salmon,this.platforms);    //COLISION ENTRE SALMON Y PLATAFORMAS

     // GRUPO DE LOS EDIFICIOS
     this.buildings = this.physics.add.staticGroup();
     this.buildings.add(this.building);
     this.buildings.add(this.building2);
     this.buildings.add(this.building3);
     this.buildings.add(this.building4);
     this.buildings.add(this.building5);
     this.physics.add.collider(this.player,this.buildings);

    
     this.salmons = this.physics.add.staticGroup();
     this.salmons.add(this.salmon);
     this.physics.add.collider(this.player,this.salmon,onCollision)

     //Para crear la colision entre grupos usamos grupos estaticos por que si no no funciona

    //GRUPO DE LOS TIMERS
  
    this.timers = this.physics.add.staticGroup();
    this.timers.add(this.redTimer);
    this.timers.add(this.greenTimer)
    this.physics.add.collider(this.player,this.redTimer,onCollision);
    this.physics.add.collider(this.player,this.greenTimer,onCollision);
     //GRUPO DE LOS CAFÉS
     
     this.coffes = this.physics.add.staticGroup();
     this.coffes.add(this.coffe1);
     this.physics.add.collider(this.player,this.coffe1,onCollision);
    //GRUPO DE LAS PLATAFORMAS Y EL POLICIA

    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.platform);
    this.physics.add.collider(this.police,this.platforms);    // COLISION ENTRE PLAYER Y PLATAFORMAS


    // GRUPO DE LOS EDIFICIOS Y EL POLICIA
    this.buildings = this.physics.add.staticGroup();
    this.buildings.add(this.building);
    this.buildings.add(this.building2);
    this.buildings.add(this.building3);
    this.buildings.add(this.building4);
    this.buildings.add(this.building5);
    this.physics.add.collider(this.police,this.buildings);

    //GRUPO DEL POLICIA Y EL PLAYER
    this.physics.add.collider(this.player,this.police,onCollisionPolice);
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

    for(let i = 0; i < totalWidth; i+=200){
      this.ground = new Ground(this, this.player,this.police, i, height);
    }
    
     
    this.albertoContador= new chrono(this);
    this.salmon= new salmon( this,this.player, 300, 300,'salmonFish',this.time,true);
    this.powerUpsArray.push(this.salmon);
    
    this.redTimer= new redTimer( this,this.player, width+100, 300,'redTimer',this.time,true,this.albertoContador);
    this.powerUpsArray.push(this.redTimer);
    this.greenTimer= new greenTimer( this,this.player, 50, 200,'greenTimer',this.time,false,this.albertoContador);
    this.powerUpsArray.push(this.greenTimer);
    
    this.coffe1= new coffe( this,this.player, 600, 300,'coffe',this.time,false);
    this.powerUpsArray.push(this.coffe1);
    
    this.platform = new Platform(this, this.player.y, 400); 

    this.box = new box(this, this.player, 350, 300);

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
  

}

/**
 * External function that is called when object collide
 * @param {*} obj1 - Player 
 * @param {*} obj2 - Object that player collides with
 */
function onCollision(obj1,obj2) {
  obj2.handleCollision(); 
}
/**
 * External function that is called when pollice and player collide
 * @param {*} obj1 - Player
 * @param {*} obj2 - Police
 */
function  onCollisionPolice (obj1,obj2) {
  obj1.Arrestado();
  obj2.catchP(obj1);
}
