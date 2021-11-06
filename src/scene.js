import Player from './Player.js';
import Police from './Police.js';
import Platform from './Platform.js';
import powerUp from './PowerUp.js';
import Ground from './Ground.js';
import salmon from './Salmon.js';
import coffe from './Coffe.js';
import redTimer from './RedTimer.js'

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
     this.createObjects(width, height, totalWidth);
      this.createGroups();
    
    
      this.cameras.main.setBounds(0, 0, width*5, height);
      //this.cameras.main.startFollow(this.police);


  }

  update(){
    const cam = this.cameras.main;
    const speed = 3;
    //Metodo que comprueba las colisiones 
    
    // cam.scrollX += speed;
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
  
    this.redTimers = this.physics.add.staticGroup();
    this.redTimers.add(this.redTimer);
    this.physics.add.collider(this.player,this.redTimer,onCollision);
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
    
    this.salmon= new salmon( this,this.player, 300, 300,'salmonFish',this.time);
    
    this.redTimer= new redTimer( this,this.player, width+100, 300,'redTimer',this.time);
    
    this.coffe1= new coffe( this,this.player, 600, 300,'coffe',this.time);
    
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
 * External function that is called when object collide
 * @param {*} obj1 - Player 
 * @param {*} obj2 - Police 
 */
function  onCollisionPolice (obj1,obj2) {
  obj2.catchP();
}
