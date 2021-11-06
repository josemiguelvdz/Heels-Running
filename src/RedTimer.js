import powerUp from './powerUp.js';
import scene from './scene.js';

export default class salmon extends powerUp {


  constructor(scene, player, x, y, nombreImg, temp) {
    super(scene, player, x, y, nombreImg, temp); //Constructor de la clase base

    this.lifesHealed = 1;
  }

  preUpdate() {
    super.preUpdate();


  }

  //Redefin con herencia 
  handleCollision() {

   this.collideRedTimer();

  }
  collideRedTimer()
  {
        this.destroy();
        //Aqui se llamaria al metodo que actualiza el tiempo de la run que se muestra en la interfaz
       
  }
  

}