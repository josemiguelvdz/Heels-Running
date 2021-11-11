export default class timer extends Phaser.GameObjects.GameObject {
  constructor(scene) {
      super(scene, 0, 0)
      this.scene.add.existing(this);
      this.internalTimer = 0;
      this.minutos=0;
      this.segundos=0;
      this.timeElapsed=this.minutos + ' : '+ this.segundos;
      this.text = this.scene.add.text(830,10,this.timeElapsed);
      this.writeTime();
  }

  destroyTimer() { //Si se llama destroy da error por cosas de Phaser
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
        this.timeElapsed =  this.minutos + ' : 0' + this.segundos.toString().substring(0,1);
      }
      else this.timeElapsed =  this.minutos + ' : ' + this.segundos.toString().substring(0,2);
      

  }

  writeTime(){
   
    // alineación del texto
    this.text.setAlign('center');

    // Font style
    this.text.setFont('Arial Black');
    this.text.setFontSize(30);
  }
}