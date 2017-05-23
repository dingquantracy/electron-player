import ReactDOM from 'react-dom';
import Player from './component/Player';
import List from './component/List';
import './css/main.css';
const {ipcRenderer} = window.require('electron');
ipcRenderer.on('songs_imported', (event, files) => {
    console.log('this is fired')
})

ReactDOM.render(<Player/>, document.getElementById('app'));

