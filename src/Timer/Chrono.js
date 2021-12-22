export default class Chrono extends Phaser.GameObjects.GameObject {
  constructor(scene,writeText) {
    super(scene, 0, 0)
    this.scene.add.existing(this);
    this.internalTimer = 0;
    this.minutes=0;
    this.seconds=0;
    this.write= writeText;


    if(this.write){
      this.timeElapsed=this.minutes + ' : '+ this.seconds;
      this.realSeconds=0;
      this.text = this.scene.add.text(this.scene.scale.width-105,35,this.timeElapsed);
      this.text.setScrollFactor(0);
      this.writeTime();
    }
    this.end=false;
  }


  /**
  * Destroy object at the end of the program
  */
  destroyTimer() { 
      this.destroy(true) 
  }


  preUpdate(time, delta) {
    if(!this.end){ // If game is not paused add time
      if(this.write)this.text.setText( this.timeElapsed);
      this.seconds+=Math.round(delta);
      if((this.seconds)/600 >100) // If it has reached 60 seconds, it restarts them and adds the minutes
      {
        this.seconds=0;
        this.minutes+=1;
      }
      if(this.seconds<10000){ // if the seconds have less than two digits
        if(this.seconds<1000){
          this.timeElapsed =  this.minutes + ' : 00'; // If it has not reached 1 second yet, write 00
        }
        else {
          this.realSeconds=this.seconds.toString().substring(0,1);
          this.timeElapsed =  this.minutes + ' : 0' + this.realSeconds.toString().substring(0,1); // If it has not reached 10 seconds yet, write 0
        }
      }
      else {
        this.realSeconds=this.seconds.toString().substring(0,2);
        this.timeElapsed =  this.minutes + ' : ' + this.realSeconds.toString().substring(0,2);
      }
    }
  }


  /**
  * Write time with specific properties
  */
  writeTime(){
    this.text.setAlign('center');

    this.text.setFont('Arial Black');
    this.text.setFontSize(26);
  }


  /**
   * @param {*} secsExtra seconds extra added to the time of the run
   * @param {*} minsExtra minutes extra added to the time of the run
   * Used to add Time when the player collides with a redTimer Power Up
   */
  addTime( secsExtra ,minsExtra){
    this.seconds+=secsExtra;
    this.minutes+=minsExtra;
  }
  /** 
  * @param {*} secsExtra seconds extra reduced to the time of the run
  * @param {*} minsExtra minutes extra reduces to the time of the run 
  * Used to reduce Time when the player collides with a greenTimer Power Up
  */
  reduceTime( secsExtra ,minsExtra){
    if(this.minutes-minsExtra>= 0)  this.minutes-=minsExtra;
    if(this.seconds-secsExtra>= 0) this.seconds-=secsExtra;
  }

  /** 
  * Used to finish adding time
  */
  finish(){
    this.end=true;
  }
  /** 
  * Return total time
  */
  getTimeElapsed(){
    return this.timeElapsed;
  }
}