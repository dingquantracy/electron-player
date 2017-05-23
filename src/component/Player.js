import React, {Component} from 'react'
import Control from './Control'
import List from './List'
import MusicPlayer from '../MusicPlayer'
import SiriWave from '../SiriWave'

const {ipcRenderer} = window.require('electron');


export default class Player extends Component{
    constructor(props){
        super(props);
        let me = this;

        this.state = {
            musicPlayer: null,
            isPlaying: false,
            showList: false,
            list: [],
            current: 0,
            song: undefined
        };

        

        ipcRenderer.on('songs_imported', (event, files) => {
            console.log(files)

            const songs = files ? files : [];

            if(songs.length <= 0) return;

            if(me.state.musicPlayer){
                me.state.musicPlayer.stop()
                me.data.siriWave.reset()
            }

            

            let musicPlayer = new MusicPlayer(songs, me.playCallback.bind(me));
            // Create an analyser node in the Howler WebAudio context
            var analyser = Howler.ctx.createAnalyser();
            analyser.fftSize = 256;

            // Connect the masterGain -> analyser (disconnecting masterGain -> destination)
            Howler.masterGain.connect(analyser);

            // Connect the analyser -> destination
            analyser.connect(Howler.ctx.destination);


            this.setState({
                musicPlayer,
                isPlaying: false,
                showList: false,
                list: musicPlayer.getSongList(),
                current: musicPlayer.getCurrent(),
                song: musicPlayer.getPlayingSong(),
                analyser
            })

            
            
        })
        
    }

    playCallback(index, playingSong){

        const {analyser} = this.state
        const {siriWave} = this.data

        this.setState({
            isPlaying: true,
            current: index,
            song: playingSong
        })

        siriWave.reset();
        siriWave.refresh(()=>{
            let bufferLength = analyser.frequencyBinCount;
            let dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            let average = 0
            for(var i = 0; i < dataArray.length; i++) {
                average += dataArray[i]
            }
            average = average/(dataArray.length)
            average = average/256

            return average
        })

    }

    controlCallback(type){

        const {musicPlayer} = this.state;
        if(musicPlayer === null || typeof musicPlayer === 'undefined') return;

        console.log(`operation type is ${type}`)
        if(type === 'play') {
            musicPlayer.play(this.playCallback.bind(this));
            
        }else if(type === 'next') {
            musicPlayer.next(this.playCallback.bind(this));
        }else if(type === 'prev') {
            musicPlayer.prev(this.playCallback.bind(this));
        }else if(type === 'pause') {
            musicPlayer.pause();
            this.setState({
                isPlaying: false
            })
            this.data.siriWave.reset()
            
        }else if(type === 'list'){
            this.setState({
                showList: !this.state.showList
            });
        }

    }    

    chooseCallback(index){
        const {musicPlayer} = this.state;
        musicPlayer.play(index, this.playCallback.bind(this))
    }

    componentDidMount(){
        this.data = {
            siriWave: new SiriWave()
        }
        this.data.siriWave.start()
    }

    render(){

        const {list, current, song, isPlaying, siriWave, showList} = this.state;

        return(<div>
            <div className="song-info">{song && song.title}</div>
            <div className="Wave"></div>
            <Control controlCallback={this.controlCallback.bind(this)} isPlaying={isPlaying} />
            <List list={list} showList={showList} chooseCallback={this.chooseCallback.bind(this)} current={current}/>
        </div>);
    }
}