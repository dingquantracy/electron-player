import React, {Component} from 'react'
import '../css/List.css'

export default class List extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {list} = this.props;
        return(<div className="Play-list">
            <ul>
                {
                    list.map(function(item, i){
                        let fileName = item.split('/');
                        fileName = fileName[fileName.length -1];
                        return <li key={fileName} data-path={item}>{fileName}</li>
                    })
                }
            </ul>
        
        </div>)
    }
}