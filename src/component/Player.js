import React, {Component} from 'react';
import Control from './Control';
import List from './List';
import MusicPlayer from '../MusicPlayer'

const {ipcRenderer} = window.require('electron');


export default class Player extends Component{
    constructor(props){
        super(props);


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

            let musicPlayer = new MusicPlayer(songs);
            this.setState({
                musicPlayer: musicPlayer,
                isPlaying: false,
                showList: false,
                list: musicPlayer.getSongList(),
                current: musicPlayer.getCurrent(),
                song: musicPlayer.getPlayingSong()
            })
            
        })
        
    }

    playCallback(index, playingSong){
        this.setState({
            isPlaying: true,
            current: index,
            song: playingSong
        })

        this.state.siriWave.setAmplitude(0.8)

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
            this.state.siriWave.setAmplitude(0)
            
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

        let siriWave = new window.SiriWave({
            container: document.querySelector('.Wave'),
            width: 800,
            height: 200,
            speed: 0.1,
            color: '#999',
            frequency: 2,
            amplitude: 0
        });
        this.setState({siriWave})
        siriWave.start();
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