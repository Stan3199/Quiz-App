import React, { useState } from 'react';
import '../../styles/Navbar.css';
import domtoimage from "dom-to-image-improved";
import { jsPDF } from "jspdf";
import config from '../config.js';

function Navbar() {

    function handlePdf(el) {
        const input = document.getElementById(el);
        domtoimage.toJpeg(input)
            .then(function (img) {
                const imgData = img;
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                pdf.setFontSize(18);
                pdf.setTextColor(83, 78, 155);
                pdf.text("Text Analytics by Topic Modelling - MAQ Software", 100, 10, null, null, "center");
                pdf.addImage(imgData, "JPEG", 0, 15, pdfWidth, pdfHeight - 30);
                pdf.setFontSize(12);
                pdf.setTextColor(83, 78, 155);
                pdf.text("MAQ Software. All Rights Reserved. Privacy Statement | Terms of Service", 100, pdfHeight-5, null, null, "center");
                pdf.save("TextAnalyticsReport.pdf");
            });
    }

    const handleSideBar = () => {
        var dataconnectElement = document.getElementById("dataconnect-main");
        var topicmodellingElement = document.getElementById("topicmodelling-main");
        var sentimentAnaysisElement = document.getElementById("sentimentanalysis-main");
        var developerZoneElement = document.getElementById("developerszone-main");
        if (document.getElementById("sidenavbar-main").className==="nav-max") {
            document.getElementById("sidenavbar-main").className = "nav-mini";
            document.getElementById("navbar-main").className = "navbar-mini";
            dataconnectElement !== null ? dataconnectElement.className = "minimization " : null;
            topicmodellingElement !== null ? topicmodellingElement.className = "minimization " : null;
            sentimentAnaysisElement !== null ? sentimentAnaysisElement.className = "minimization " : null;
            developerZoneElement !== null ? developerZoneElement.className = "minimization " : null;
        }
        else {
            document.getElementById("sidenavbar-main").className = "nav-max";
            document.getElementById("navbar-main").className = "navbar-max";
            dataconnectElement !== null ? dataconnectElement.className = "maximized " : null;
            topicmodellingElement !== null ? topicmodellingElement.className = "maximized " : null;
            sentimentAnaysisElement !== null ? sentimentAnaysisElement.className = "maximized " : null;
            developerZoneElement !== null ? developerZoneElement.className = "maximized " : null;
        }
    }
    return (
        <div id="navbar-main" className="navbar-max">
            <div id="icon-container">
                <img id="hamburger-icon" src={config.hamburgerdark} alt="hamburger icon" onClick={handleSideBar} />
            </div> 
            <span id = "navbar-heading">Text Analytics Playground</span>
            <div id="export-container">
                <div
                    id="download-icon"
                    title="Download PDF"
                    onClick={() => document.getElementById("app-main").contains(document.getElementById("topicmodelling-main"))? handlePdf("pdf-container"):handlePdf("pdf-sent-container")}
                >
                    <img src={config.download} className="icon-size" alt="download" />
                    <span className="icon-text"> Download Insights</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
