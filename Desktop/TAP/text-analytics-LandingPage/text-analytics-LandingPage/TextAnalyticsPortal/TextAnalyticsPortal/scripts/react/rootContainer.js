import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import '../styles/rootContainer.css';
import FetchData from "./commonFunctions/FetchData";
import Navbar from './components/Navbar';
import SideNavigation from './components/SideNavigation';
import config from "./config.js";
import LoadingState from './constants/LoadingState';
import DataConnect from './containers/DataConnect';
import DevelopersZone from './containers/DevelopersZone';
import Login from './containers/Login';
import SentimentAnalysis from './containers/SentimentAnalysis';
import TopicModelling from './containers/TopicModelling';
import UnknownView from './containers/UnknownView';
import { useVisualData } from './hooks/useVisualData';
import { set } from 'd3';
import Landing from "./containers/Landing";



function RootContainer() {
    const [loadingState, setLoadingState] = useState(LoadingState.FINISHED);
    const [openDisclaimer, setOpenDisclaimer] = useState(true)
    const keysOfState = Object.values(LoadingState)
    const noOfStates = keysOfState.length
    const valueOfState = keysOfState.indexOf(loadingState)
    const progress = ((valueOfState + 1) * 100) / noOfStates
    const [topicmodelingst, setTopicModelingSt] = useState({});
    const [sentimentst, setSentimentst] = useState('');
    const [sentreq, setsentreq] = useState('');
    const [sentclose, setsentclose] = useState(true);
    const [landing,setLanding]=useState(true);
    const acceptDisclaimer = () => {
        setOpenDisclaimer(false)
        FetchData({}, 'Home/sendEmail')
    }

    const setModels = (requestJSON) => {
        setTopicModelingSt(requestJSON)
        //await useVisualData(requestJSON).then(response => {
        //    setTopicModelingSt(response)
        //})
        console.log(requestJSON)
        //if ((typeof requestJSON) == Object && requestJSON != sentimentst) filterResSent(requestJSON)
    }

    const filterResSent = (requestJSON) => {
        let req = []
        //console.log(requestJSON)

        Object.keys(requestJSON).map((item, index) => {
            req.push({ "id": index, "text": requestJSON[item]["Text"] })
        })
        setsentreq(req);
        console.log("goingg",req);
        requestJSON.typeofdata = "Sentiment Data";
        useVisualData({ "typeofdata": "Sentiment Data", "data": req }).then(response => {
            setSentimentst(response);
            setsentclose(false);
            console.log(response);
            //setsentnav("coming soon...");
        })
        //
        

        //setSentimentst(req)
    }

    let rootContainer = document.getElementById("root");
   //console.log('Name - '+ rootContainer.dataset.fullname, 'email - '+rootContainer.dataset.email, 'Auth -'+rootContainer.dataset.auth);
const handleAction=()=>{
    setLanding(true);
}
    return (
            <div id="app-main">
                <div id="overlay-main" className="overlay-main">
                    <div id="loadingImageContainer">
                        <img className="loadingImage" src={config.Loading} alt="Loading" />
                    <div id="overlay-text">Please wait while we process your data</div>
                    </div>
                </div>
            {rootContainer.dataset.auth==="True" ?landing?
                <HashRouter>
                    <SideNavigation  />
                    <Navbar />
                    <Route exact path='/' render={(props) => <DataConnect {...props} setJSON={(requestJSON) => setModels(requestJSON)} acceptDisclaimer={() => acceptDisclaimer()} openDisclaimer={openDisclaimer} />} />
                    <Route path='/TopicModelling' render={(props) => <TopicModelling {...props}
                        sentrequest={(requestJson) => filterResSent(requestJson)} getJSON={topicmodelingst} handleLoadingState={(loading) => setLoadingState(loading)} />} />
                    <Route path='/SentimentAnalysis' render={(props) => <SentimentAnalysis {...props} sentreq={sentreq} setclose={sentclose} sentresponse={sentimentst}
                        getJSON={sentimentst} handleLoadingState={(loading) => setLoadingState(loading)} />} />
                    <Route path='/DevelopersZone' component={DevelopersZone} />
                    <Route path='/UnknownView' render={(props) => <UnknownView{...props} sentrequest={(requestJson) => filterResSent(requestJson)} /> } />
                </HashRouter>
                :
                <Landing action={handleAction}/>
                :
                <HashRouter>
                    <Route exact path='/' component={Login} />
                    </HashRouter>
                }
            </div>
    );
}

ReactDOM.render(
    <RootContainer />,
    document.getElementById("root")
);


