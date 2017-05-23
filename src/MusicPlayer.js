export default class MusicPlayer {
    constructor (songs) {
        this.songs = songs;
        this.index = 0;
        this.isPaused = false;
        this.list = [];
        this.producePlayList();
    }

    producePlayList (){
        for(let [index, item] of this.songs.entries()){
            let path = item
            let tmp = item.split('/')
            let title = tmp[tmp.length - 1]
            let howl = new Howl({
                src: [path],
                onend: (() => {
                    this.next()
                }).bind(this)
            })

            this.list.push({
                path,
                title,
                howl
            })
        }
    }

    getSongList(){
        return this.songs
    }

    getCurrent(){
        return this.index
    }

    getPlayingSong(){
        return this.list[this.index]
    }

    play(index, cb){

        if(typeof index === 'function') {
            cb = index;
            index = this.index;
        }

        if (!this.isPaused){
            this.list[this.index].howl.stop(); 
        }
        
        index = typeof index !== 'undefined' ? index : this.index;
        this.list[index].howl.play();
        this.index = index
        this.isPaused = false
        cb && cb(this.index, this.getPlayingSong())

        setInterval((function(){
            // console.log(this.list[index].howl.pos3d())
        }).bind(this), 1000)
    }

    next(cb){
        let index = this.index;
        if(index + 1 >= this.list.length){
            index = 0;
        }else {
            index++;
        }  
        this.play(index, cb); 
    }

    prev(cb){
        let index = this.index;
        if(index - 1 < 0){
            index = this.list.length - 1;
        }else{
            index--;
        }
        this.play(index, cb);
    }

    pause() {
        let song = this.list[this.index];
        song.howl.pause();
        this.isPaused = true;
    }


    stop() {
        let song = this.list[this.index];
        song.howl.stop();
    }
}