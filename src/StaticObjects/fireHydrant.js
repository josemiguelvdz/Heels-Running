import StaticObject from './staticobject.js';

export default class FireHydrant extends StaticObject {
  
  constructor(scene, x, y, nameImg) {
    super(scene, x, y, nameImg);
    
    this.hasCollided=false;
  }
  
  preUpdate(t,dt) {
    super.preUpdate(t,dt);
    if(this.hasCollided)this.createWaterParticles();
  }
    
  /** 
  * Used to create water particles
  */
  createWaterParticles(){
    let deathParticles =this.scene.add.particles('waterParticle');
    this.deathEmitter = deathParticles.createEmitter({
      x: -500,
      y: 300,
      speed: { min: -800, max: 500 },
      angle: { min: -60, max: -130 },
      scale: { start: 0.250, end: 0.10 },
      blendMode: 'ADD',
      //active: true,
      lifespan: 250,
      gravityY: 800,
      loop: true
    });
    this.deathEmitter.explode(40, this.x,this.y-20);
  }
  setCollision()
  {
    this.hasCollided=true;
  }
}
  