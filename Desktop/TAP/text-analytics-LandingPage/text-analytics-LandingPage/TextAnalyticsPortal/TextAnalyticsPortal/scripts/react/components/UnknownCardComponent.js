import React, { useState } from 'react';
import '../../styles/UnknownCardComponent.css';
import { getData } from "../hooks/getData";

function UnknownCardComponent({ refinedData})
{
    
    const { Topic, ContributionScore } = getData(
        refinedData,
        "UnknownCardComponent",
        )
    
    return (
        <div className='unknown-card-grid-main'>
            <div id='card-topic-holder'>
                <div className='unknown-card-value'>{Topic}</div>
                <div className='unknown-card-topic'>Selected Topic</div>
            </div>
            <div id='card-score-holder'>
                <div className='unknown-card-value'>{ContributionScore}</div>
                <div className='unknown-card-topic'>Topic's Contribution Score</div>
            </div>
        </div>
    );
}

export default UnknownCardComponent;
