import React, {Component} from 'react'
import '../css/List.css'

export default class List extends Component{
    constructor(props){
        super(props)
    }

    chooseSong(i){
        console.log(`选择了第${i}首歌曲`)
        this.props.chooseCallback(i)
    }

    render(){
        const {list, showList, current} = this.props
        const style = showList ? {display: 'block'} : {display: 'none'}
        return(<div className="Play-list" style={style}>
            <ul>
                {
                    list.map(((item, i) => {
                        let activeClass = current === i ? 'active' : '';
                        let fileName = item.split('/');
                        fileName = fileName[fileName.length -1];
                        return <li className={activeClass} key={fileName} data-path={item} onClick={this.chooseSong.bind(this, i)}>{fileName}</li>
                    }).bind(this))
                }
            </ul>
        
        </div>)
    }
}