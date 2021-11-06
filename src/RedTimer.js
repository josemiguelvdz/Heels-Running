import powerUp from './PowerUp.js';
import scene from './Scene.js';

export default class salmon extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp) {
    super(scene, player, x, y, nombreImg, temp); //Constructor de la clase base

    this.lifesHealed = 1;
  }

  preUpdate() {
    super.preUpdate();


  }

  
  /**
   * Handles the collision with player

   */
  handleCollision() {

   this.collideRedTimer();

  }

  /**
   * Makes the power up dissapear and adds more time of the run 
   * 
   */
  collideRedTimer()
  {
        this.destroy();
        //Aqui se llamaria al metodo que actualiza el tiempo de la run que se muestra en la interfaz
       
  }
  

}