import React, { useState } from 'react';
import '../../styles/CardComponent.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

function CardComponent(props) {
    const { Value, Title, Image, Tooltip,Action,Prog } = props
    return (
        <div className='cardcomponent-main' title={Tooltip} onClick={Action} >
            <div id='card-value-holder'>
                <div className='card-value'>{Value}</div>
                {Image}
               
            </div>
            
            <div id='card-title-holder'>
                <div className='card-title'>{Title}</div>
            </div>
        </div>
    );
}

export default CardComponent;
