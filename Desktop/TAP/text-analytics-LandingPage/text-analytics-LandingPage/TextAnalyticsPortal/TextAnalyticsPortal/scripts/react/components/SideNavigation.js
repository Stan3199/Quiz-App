import React, { useState } from 'react';
import '../../styles/SideNavigation.css';
import config from '../config.js';
import { NavLink } from 'react-router-dom';
import EmailIcon from '@material-ui/icons/Email';
import { borderRadius } from '@material-ui/system';

function SideNavigation(props) {

    function sendMailToSupport() {
        window.open('mailto:Support@MAQSoftware.com');
    }
    function handleMinimization() {
        var dataconnectElement = document.getElementById("dataconnect-main");
        var topicmodellingElement = document.getElementById("topicmodelling-main");
        var sentimentAnaysisElement = document.getElementById("sentimentanalysis-main");
        var developerZoneElement = document.getElementById("developerszone-main");
        if (document.getElementById("sidenavbar-main").className === "nav-max") {
            document.getElementById("sidenavbar-main").className = "nav-mini";
            document.getElementById("navbar-main").className = "navbar-mini";
            document.getElementById("support-email").style.display = "none";
            dataconnectElement !== null ? dataconnectElement.className = "minimization " : null;
            topicmodellingElement !== null ? topicmodellingElement.className = "minimization " : null;
            sentimentAnaysisElement !== null ? sentimentAnaysisElement.className = "minimization " : null;
            developerZoneElement !== null ? developerZoneElement.className = "minimization " : null;
        }
        else {
            document.getElementById("sidenavbar-main").className = "nav-max";
            document.getElementById("navbar-main").className = "navbar-max";
            document.getElementById("support-email").style.display = "block";
            dataconnectElement !== null ? dataconnectElement.className = "maximized " : null;
            topicmodellingElement !== null ? topicmodellingElement.className = "maximized " : null;
            sentimentAnaysisElement !== null ? sentimentAnaysisElement.className = "maximized " : null;
            developerZoneElement !== null ? developerZoneElement.className = "maximized " : null;
        }
    }
    return (
        <div id="sidenavbar-main" className="nav-max">
            <div id="logo-main">
                <img id="hamburger-logo" src={config.hamburgerdark} alt="MAQ logo" onClick={handleMinimization} />
                <img id="logo" src={config.MAQLogo} alt="MAQ logo" />

            </div>
            <ul>
                <li >
                    <NavLink exact to={'/'} activeClassName='nav-item-active'>
                        <img src={config.dataconnect} className='item-logo' alt='navigation-search-icon' />
                        <span>Data Connect</span>
                    </NavLink>
                </li>
                <li id="item-topicmodelling" className={document.getElementById("topicmodelling-main") === null ? null : null}
                    title={"Topic Modelling"}
                >
                    <NavLink exact to={'/TopicModelling'} activeClassName='nav-item-active'>
                        <img id="show-topic-modelling" src={config.topicmodelling} className='item-logo' alt='navigation-search-icon' />
                        <img id="hide-topic-modelling" src={config.topicmodellingdisabled} className='item-logo' alt='navigation-search-icon' />
                        <span>Topic Modeling</span>
                    </NavLink>
                </li>
                <span title="">
                    <li id="sent" className="nav-disabled">
                        <NavLink exact to={'/SentimentAnalysis'} activeClassName='nav-item-active'>
                            <img id="show-sent-modelling" src={config.sentimentanalysis} className='item-logo' alt='navigation-search-icon' />
                            <img id="hide-sent-modelling" src={config.sentimentanalysisdisabled} className='item-logo' alt='navigation-search-icon' />
                            <span>Sentiment Analysis</span>
                        </NavLink>
                    </li>
                    <li className="" title={""}>

                        <NavLink exact to={'/DevelopersZone'} activeClassName='nav-item-active'>
                            <img src={config.developerzone} className='item-logo' alt='navigation-search-icon' />
                            <span>Developer Zone</span>
                        </NavLink>
                    </li>
                </span>
            </ul>
            <div id='help-support'>
                <span id="contact-icon" title={"Support@MAQSoftware.com"} onClick={sendMailToSupport}> <EmailIcon style={{ fontSize: '1.8em' }}></EmailIcon> </span>
                <span id='support-email' title={"Support@MAQSoftware.com"} onClick={sendMailToSupport}>Contact Us</span>
            </div>
        </div>
    );
}

export default SideNavigation;
