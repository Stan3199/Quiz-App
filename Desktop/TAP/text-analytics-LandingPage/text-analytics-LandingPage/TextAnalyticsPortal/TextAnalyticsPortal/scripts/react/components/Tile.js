import React, { useState } from 'react';
import '../../styles/CardComponent.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
function CardComponent(props) {
    const { Value, Title, Image, Tooltip,Action,Prog,Color,Perc } = props
    return (
        <div className='cardcomponent-main' title={Tooltip} onClick={Action} >
             
    <h4 className='info-card-title'>{Title}</h4>
    <div style={{display:'flex',height:'100%'}}>
        <span id='info-span'>{Prog}</span>
        <CircularProgressbar  value={Perc} text={`${Perc}%`} styles={buildStyles({
         
          pathColor: Color,
       
        })}/>
         </div>       
        </div>
    );
}

export default CardComponent;
