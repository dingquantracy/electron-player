import ReactDOM from 'react-dom';
import Player from './component/Player';
import List from './component/List';
import './css/main.css';

const {ipcRenderer} = window.require('electron');


var songs = null;
ipcRenderer.on('songs_imported', (event, files) => {
    console.log(files)
    songs = files ? files : [];
    ReactDOM.render(<List list={files}/>, document.getElementById('list'));
    
})


ReactDOM.render(<Player/>, document.getElementById('app'));