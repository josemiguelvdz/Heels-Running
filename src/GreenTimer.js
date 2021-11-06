import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class greenTimer extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp) {
    super(scene, player, x, y, nombreImg, temp); //Constructor de la clase base

    
  }

  preUpdate() {
    super.preUpdate();


  }

  
  /**
   * Handles the collision with player

   */
  handleCollision() {

   this.collideGreenTimer();

  }

  /**
   * Makes the power up dissapear and reduces  time of the run 
   * 
   */
  collideGreenTimer()
  {
        this.destroy();
        //Aqui se llamaria al metodo que actualiza el tiempo de la run que se muestra en la interfaz
       
  }
  

}