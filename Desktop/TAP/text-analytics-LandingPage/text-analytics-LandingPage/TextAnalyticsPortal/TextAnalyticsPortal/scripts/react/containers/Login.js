import React from 'react';
import '../../styles/Login.css';
import config from '../config.js';

function Login() {
    return (
        <div id="login-main">
            <div id="navbar-login-main"> 
                <img id="logo-login" src={config.MAQLogo} alt="MAQ logo" />
            </div>
            <div id="login-input">
                <img id="logo-textanalysis" src={config.CardLogo} alt="text analysis logo" />
                <div id="login-heading">Welcome to Text Analytics Playground</div>
                <br /><br />
                <div id="login-content">Text Analytics Playground would like to sign you in and read your profile.<br /><br />
                    We do not store or retain any information that will be uploaded by you.</div>
                        <div id="microsoft-sign-in" onClick={() => {
                            var address = location.href.split("#")[0] + "Home/Login";
                            location.href = address; }}>
                            <span>OK</span>
                        </div>
            </div>
            <div id="footer-login">
            <div id="social-label">Follow us on:</div>
                <div id="social-icons"><a target="_blank" href="https://www.facebook.com/maqsoftware">
                    <i id="FacebookLinkImage" className="iconLink fa fa-facebook" style={{ color: "#3b569d" }}></i>
                </a>
                    <a target="_blank" href="https://www.linkedin.com/company/maq-software">
                        <i id="LinkedInLinkImage" className="iconLink fa fa-linkedin" style={{color: "#0274b3"}}></i>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/user/maqsoftware">
                        <i id="YouTubeLinkImage" className="iconLink fa fa-youtube-play" style={{ color: "#ff0000" }}></i>
                    </a>
                    <a target="_blank" href="https://twitter.com/MAQSoftware">
                        <i id="TwitterLinkImage" className="iconLink fa fa-twitter" style={{ color: "#00aced" }}></i>
                    </a>
                    <a target="_blank" href="https://plus.google.com/104615735701576694043">
                        <i id="GooglePlusLinkImage" className="iconLink fa fa-google-plus" style={{ color: "#dd4d42" }}></i>
                    </a>
                    <a target="_blank" href="https://github.com/maqsoftware">
                        <i id="GitHubLinkImage" className="iconLink fa fa-github" style={{ color: "#1B1F23" }}></i>
                    </a>
                    <a target="_blank" href="https://instagram.com/maqsoftware">
                        <i id="InstagramLinkImage" className="iconLink fa fa-instagram" style={{ color: "#8941a7" }}></i>
                    </a></div>
                <div id="social-support">
                    <img id="supportMailIcon" src={config.support} alt="Mail Icon" class="mailIcon" />
                    <div id="support-text">Support@MAQSoftware.com</div>
                </div>
            </div>
        </div>
    );
}

export default Login;
