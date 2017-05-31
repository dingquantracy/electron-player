import React, {Component} from 'react'
import '../css/Button.css'


export default class Button extends Component{
    constructor(props){
        super(props)
    }

    render(){

        const {type} = this.props;

        const listButton = (<div className="Button Button-list">
            <span className="item"></span>
            <span className="item"></span>
            <span className="item"></span>
        </div>);


        const prevButton = (<div className="Button Button-prev">
            <span className="item"></span>
            <span className="item"></span>
        </div>);

        const nextButton = (<div className="Button Button-next">
            <span className="item"></span>
            <span className="item"></span>
        </div>);

        const playButton = (<div className="Button Button-play">
            <span className="item"></span>
        </div>);

        const pauseButton = (<div className="Button Button-pause">
            <span className="item"></span>
            <span className="item"></span>
        </div>);


        const volumeButton = (<div className="Button Button-volume">
            <span className="item item-0">
                <span className="item item-1">
                    <span className="item item-2">
                        <span className="item item-3"></span>
                    </span>
                </span>
            </span>
        </div>);


        let whichButton = null;

        if(type === 'list') {
            whichButton = listButton;
        }else if(type === 'prev') {
            whichButton = prevButton;
        }else if(type === 'next'){
            whichButton = nextButton;
        }else if(type === 'play'){
            whichButton = playButton;
        }else if(type === 'pause'){
            whichButton = pauseButton;
        }else if(type === 'volume'){
            whichButton = volumeButton;
        }

        return(whichButton);
    }
}