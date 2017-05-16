import React, {Component} from 'react';
import Control from './Control'

export default class Player extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(<div>
            <Control />
        </div>);
    }
}