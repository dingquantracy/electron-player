import React, {Component} from 'react';
import '../css/Control.css'
import Button from './Button'

import { Slider } from 'antd';
import 'antd/dist/antd.min.css'; 


export default class Control extends Component{
    constructor(props){
        super(props)

    }

    onControlClick(type){
        this.props.controlCallback(type);
    }

    render(){

        const status = this.props.isPlaying ? 'pause' : 'play';
        const visibleStyle = this.props.isPlaying ? {visibility: 'visible'} : {visibility: 'hidden'};
        const sliderStyle = {
            position: 'absolute',
            top: '-70px',
            left: '50%',
            transform: 'translateX(-50%)',
            margin: '0 auto',
            display: this.props.showVolume ? 'block' : 'none'
        };


        return(<div className="Control">
            
            <div className="area left">
                <span className="play-button list" onClick={this.onControlClick.bind(this, 'list')}><Button type="list"/></span>
            </div>
            <div className="area center">
                <span className="play-button prev" onClick={this.onControlClick.bind(this, 'prev')} style={visibleStyle}><Button type="prev"/></span>
                <span className="play-button {status}" onClick={this.onControlClick.bind(this, status)}><Button type={status}/></span>
                <span className="play-button next" onClick={this.onControlClick.bind(this, 'next')} style={visibleStyle}><Button type="next"/></span>
            </div>
            <div className="area right">
                <span className="play-button volume" onClick={this.onControlClick.bind(this, 'volume')}>
                    <Button type="volume"/>
                    <Slider className="mySlider" vertical defaultValue={50} style={sliderStyle} onChange={this.props.adjustVolumeCallback}/>                
                </span>
            </div>
            
        </div>);
    }
}