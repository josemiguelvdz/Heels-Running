export default class Chrono extends Phaser.GameObjects.GameObject {
  constructor(scene,writeText) {
    super(scene, 0, 0)
    this.scene.add.existing(this);
    this.internalTimer = 0;
    this.minutos=0;
    this.segundos=0;
    this.write= writeText;


    if(this.write){
      this.timeElapsed=this.minutos + ' : '+ this.segundos;
      this.segundosReales=0;
      this.text = this.scene.add.text(this.scene.scale.width-105,35,this.timeElapsed);
      this.text.setScrollFactor(0);
      this.writeTime();
    }
    this.fin=false;
  }


  /**
  * destroy object at the end of the program
  */
  destroyTimer() { 
      this.destroy(true) //Se destruye al final del frame
  }


  preUpdate(time, delta) {
    if(!this.fin){ // Si no está pausado suma el tiempo
      if(this.write)this.text.setText( this.timeElapsed);
      this.segundos+=Math.round(delta);
      if((this.segundos)/600 >100) // Si ha llegado a 60 segundos, los reinicia y suma los minutos
      {
        this.segundos=0;
        this.minutos+=1;
      }
      if(this.segundos<10000){ // si los segundos tienen menos de dos cifras
        if(this.segundos<1000){
          this.timeElapsed =  this.minutos + ' : 00'; // Si todavía no ha llegado a 1 segundo escribe 00
        }
        else {
          this.segundosReales=this.segundos.toString().substring(0,1);
          this.timeElapsed =  this.minutos + ' : 0' + this.segundosReales.toString().substring(0,1); // Si todavía no ha llegado a 10 segundos escribe 0
        }
      }
      else {
        this.segundosReales=this.segundos.toString().substring(0,2);
        this.timeElapsed =  this.minutos + ' : ' + this.segundosReales.toString().substring(0,2);
      }
    }
  }


  /**
  * Write time with specific properties
  * 
  */
  writeTime(){
    // alineación del texto
    this.text.setAlign('center');

    // Font style
    this.text.setFont('Arial Black');
    this.text.setFontSize(26);
  }


  /**
   * @param {*} secsExtra seconds extra added to the time of the run
   * @param {*} minsExtra minutes extra added to the time of the run
   * Used to add Time when the player collides with a redTimer Power Up
   */
  addTime( secsExtra ,minsExtra){
    this.segundos+=secsExtra;
    this.minutos+=minsExtra;
  }
  /** 
  * @param {*} secsExtra seconds extra reduced to the time of the run
  * @param {*} minsExtra minutes extra reduces to the time of the run 
  * Used to reduce Time when the player collides with a greenTimer Power Up
  */
  reduceTime( secsExtra ,minsExtra){
    if(this.minutos>= minsExtra)  this.minutos-=minsExtra;
  }

  finish(){
    this.fin=true;
  }

  getTimeElapsed(){
    return this.timeElapsed;
  }
}