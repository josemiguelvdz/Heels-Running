import scene from './Scene.js'

export default class timeelapsed extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene, 0, 0)
        data.scene.add.existing(this);
        this.internalTimer = 0;
    }

    getTimeInSeconds() {
        return this.internalTimer;
    }

    getTimeInMinutes() { //Como solo devuelve minutos, los segundos extras se pierden, por ejemplo, si tenemos 2 minutos y 12 segundos, solo devuelve 2 minutos
        return this.internalTimer / 60;
    }

    getTime()
    {
        return {minutos: this.internalTimer/60, segundos: this.internalTimer%60}; //Devuelve un objeto cuya primera componente son minutos y la segunda, segundos
    }

    destroyTimer() { //Si se llama destroy da error por cosas de Phaser
        this.destroy(true) //Se destruye al final del frame
    }

    preUpdate(time, delta) {
        this.internalTimer += Math.round(delta)
        this.writeTime();
    }

    
     writeTime(){
        let text = this.add.text(850,10,this.timeElapsed.getTimeInMinutes() + ' : ' + this.timeElapsed.getTimeInSeconds()/60);

        // alineación del texto
        text.setAlign('center');

        // Font style
        text.setFont('Arial Black');
        text.setFontSize(50);
    }
}