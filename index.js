const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;
const {dialog} = electron;
const {ipcRenderer} = electron;

var mainWindow = null;

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        resizable: true
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.webContents.openDevTools()
    
    const template = [{
       click(){
           alert('Amazing Music Player');
       } 
    },{
        label: '文件',
        submenu: [{
            label: '导入歌曲',
            click(){
                dialog.showOpenDialog({
                    title: '选取歌曲',
                    properties: ['openFile', 'multiSelections'],
                    message: '选择的歌曲',
                    filters: [{name: 'Audio', extensions: ['wav', 'avi', 'mp3']},]
                }, (files)=>{
                    console.log(files)
                    mainWindow.webContents.send('songs_imported', files);
                })
            }
        }]
    },
    {
        label: '编辑',
        submenu: [{
            label: '重新加载',
            accelerator: 'CommandOrControl+R',
            click(){
                mainWindow.reload();
            }
        }]
    }];
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

})