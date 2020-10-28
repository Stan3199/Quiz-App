import '../../styles/DevelopersZone.css';
import React, { useState, useEffect } from "react";

import Pop from './Pop';
import Dialogue from './Dialogue';
function DevelopersZone() {

    const [doc, setDoc] = useState(false);
    { document.getElementById('export-container') ? document.getElementById('export-container').style.display = 'none' : null }
    function handleclick(e) {
        setDoc(e);
    }
    let rootContainer = document.getElementById("root");
    console.log(rootContainer.dataset);

    if (!doc) {
        return (

            <div id='developerszone-main' className={document.getElementById("sidenavbar-main") !== null && document.getElementById("sidenavbar-main").className === "nav-mini" ? "minimization" : "maximized"}>

                <span className='page-title'><b>Sentiment Analysis</b></span>
                <span style={{ float: 'right' }}> <Dialogue title='Accept Terms & Condition' /></span>
                <span> </span>
                <div className='content'>
                    <span className='content-title'>PostAnalyzeSentiment</span>
                    <p className='content-body'> Returns the response with sentiment scores for each text in the request</p>
                    <span className='get'>POST: </span><span className='content-link' >https://azurefunctionapplinuxdev2-apim.azure-api.net/text/AnalyzeSentiment</span>
                </div>

                <div className='content'>
                    <span className='content-title'>Request Body</span>
                    <table>
                        <colgroup><col width="20%" /><col width="50%" /></colgroup>
                        <thead>

                            <tr>
                                <th>Name</th>
                                <th className='last'>Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>id</td>
                                <td className='last'>Unique id's for text</td>

                            </tr>
                            <tr>
                                <td>text</td>
                                <td className='last'>Documents for analysis</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className='content'>
                    <span className='content-title'>Responses</span>
                    <table>
                        <colgroup><col width="20%" /><col width="50%" /></colgroup>
                        <thead>

                            <tr>
                                <th>Name</th>
                                <th className='last'>Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>id</td>
                                <td className='last'>Unique id's for text</td>

                            </tr>
                            <tr>
                                <td>sentiment</td>
                                <td className='last'>Sentiment score for the text</td>

                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className='content'>
                    <span className='content-title sample'>Sample Request & Response</span>
                    <p></p>

                </div>
                <div className='content' style={{ width: '70%' }}>
                    <span className='content-title sample'>Request Body<span style={{ float: 'right' }}><div className="tooltip"></div></span></span>
                    <p></p>
                    <textarea style={{ resize: "none" }} id='txt1' readOnly={true} value='{"data": [{"id": "1", "text": "I love working on ML stuff."},{"id": "2", "text": "I hate working on stuff that is boring and repetitive."},{"id": "3", "text": "I love working from home in COVID-19."}]}'>

                    </textarea>
                </div>
                <div className='content' style={{ width: '70%' }}>
                    <span className='content-title sample'>Sample Response<span style={{ float: 'right' }}></span></span>
                    <p></p>
                    <textarea style={{ resize: "none" }} id='txt2' readOnly={true} value='[{"id": "1","sentiment": 0.9965866137},{"id": "2","sentiment": 0.0007629122},{"id": "3","sentiment": 0.9943320933}]'>

                    </textarea>
                    <br />
                    <br />
                </div>
            </div>

        );
    }
    else {
        return (
            <div id='developerszone-main' className={document.getElementById("sidenavbar-main") !== null && document.getElementById("sidenavbar-main").className === "nav-mini" ? "minimization" : "maximized"}>
                <span className='page-title'><u>Sentiment Analysis</u></span>
                <span style={{ float: 'right' }}><button className='button' onClick={(e) => handleclick(false)}>Back To Insights</button></span>
                <span> </span>
                <div className='content'>
                    <span className='content-title'>For Detailed Documentation Please visit the following link</span>
                    <p className='content-body'>Returns all the responses for which the specified topic is identified as the dominant topic</p>
                    <span className='get'>POST: </span><span className='content-link' >https://maqtopicmodeling.azurewebsites.net/api/GetResponseByTopic</span><span className='try-it'>▷Try it</span>
                </div>

            </div>
        );
    }
}

export default DevelopersZone;