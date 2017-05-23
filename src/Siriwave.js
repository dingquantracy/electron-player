export default class SiriWave {
    constructor(){

        this.siriWave = new window.SiriWave({
            container: document.querySelector('.Wave'),
            width: 800,
            height: 200,
            speed: 0.1,
            color: '#999',
            frequency: 2,
            amplitude: 0
        })
    }

    start(){
        this.siriWave.start()
    }

    stop(){
        this.siriWave.stop()
    }

    refresh(cb){
        let me = this;
        this.timeId = setInterval(function(){
            let average = cb();
            me.siriWave.setAmplitude(average)
        }, 17)
    }

    reset(){
        clearInterval(this.timeId);
        this.siriWave.setAmplitude(0);
    }

}