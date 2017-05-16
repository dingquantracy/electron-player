import React, {Component} from 'react';
import '../css/Control.css'
// import '../css/List.css'
import Button from './Button'


export default class Control extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<div className="Control">
            <div className="area left">
                <span className="play-button list"><Button type="list"/></span>
            </div>
            <div className="area center">
                <span className="play-button prev"><Button type="prev"/></span>
                <span className="play-button play"><Button type="play"/></span>
                <span className="play-button next"><Button type="next"/></span>
                {/*<span className="play-button pause"><Button type="pause"/></span>*/}
            </div>
            <div className="area right">
                
            </div>
        </div>);
    }
}