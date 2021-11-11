export default class chrono extends Phaser.GameObjects.GameObject {
  constructor(scene) {
      super(scene, 0, 0)
      this.scene.add.existing(this);
      this.internalTimer = 0;
      this.minutos=0;
      this.segundos=0;
      this.timeElapsed=this.minutos + ' : '+ this.segundos;
      this.text = this.scene.add.text(905,15,this.timeElapsed);
      this.writeTime();




  }
 /**
  * destroy object at the end of the program
  */
  destroyTimer() { 
      this.destroy(true) //Se destruye al final del frame
  }
  preUpdate(time, delta) {
      this.text.setText( this.timeElapsed);
      this.segundos+=Math.round(delta);
      if((this.segundos)/600 >100)
      {
          this.segundos=0;
          this.minutos+=1;
      }
      if(this.segundos<10000){
        if(this.segundos<1000)this.timeElapsed =  this.minutos + ' : 00';
        else this.timeElapsed =  this.minutos + ' : 0' + this.segundos.toString().substring(0,1);
      }
      else this.timeElapsed =  this.minutos + ' : ' + this.segundos.toString().substring(0,2);
      

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
    this.text.setFontSize(30);
  }
  /**
   * 
   * @param {*} secsExtra seconds extra added to the time of the run
   * @param {*} minsExtra minutes extra added to the time of the run
   * 
   * Used to add Time when the player collides with a redTimer Power Up
   */
  addTime( secsExtra ,minsExtra)
  {
    this.segundos+=secsExtra;
    this.minutos+=minsExtra;
  }
    /**
   * 
   * @param {*} secsExtra seconds extra reduced to the time of the run
   * @param {*} minsExtra minutes extra reduces to the time of the run
   * 
   * Used to reduce Time when the player collides with a greenTimer Power Up
   */
  reduceTime( secsExtra ,minsExtra)
  {
    if(this.minutos>= minsExtra)  this.minutos-=minsExtra;
  
  }
}