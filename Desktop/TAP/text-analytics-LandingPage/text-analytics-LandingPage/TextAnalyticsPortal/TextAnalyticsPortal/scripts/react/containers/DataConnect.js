import React, { useState, useEffect } from 'react';
import '../../styles/DataConnect.css';
import PublishIcon from '@material-ui/icons/Publish';
import XLSX from 'xlsx';
import config from '../../react/config.js';
import sampleData from '../constants/sampleData.js';
import { Redirect } from 'react-router-dom';
import { useVisualData } from '../hooks/useVisualData';
import PopupComponent from '../components/PopupComponent.js';

function resolveColdStart() {
    var dummyRequest = {
        typeofdata: "Events Data",
        data: [{
            review: "",
        }]
    }
    useVisualData(dummyRequest);
}
function DataConnect(props) {
    document.getElementById("item-topicmodelling") !== null
        ?
        document.getElementById("item-topicmodelling").getElementsByTagName("a")[0].classList.remove("nav-item-active")

        : null;
    document.getElementById("item-topicmodelling") !== null
        ?
        document.getElementById("item-topicmodelling").classList.remove("nav-item-visible")

        : null;
    document.getElementById("export-container") !== null ? document.getElementById("export-container").style.display = "none" : null;
    const [excelData, setExcelData] = useState('a');
    const [requestJSON, setRequestJSON] = useState('');
    const [open, setOpen] = React.useState(false);
    const [sample, setSample] = React.useState(false);
    const [generateButton, setgenerateButton] = React.useState(true);
    const closePopup = (value) => {
        if (value === "ok") {
            setOpen(false);
        }
        else {
            document.getElementById("dataconnect-textarea").disabled = false;
            document.getElementById('sample-dataset').classList.remove("selected-text-border");
            document.getElementById('upload-file').classList.remove("selected-text-border");
            setgenerateButton(true);
            setOpen(false);
        }
    }
    document.getElementById("item-topicmodelling") !== null ? document.getElementById("item-topicmodelling").className = 'nav-disabled' : null;
    function handleSelectedInput() {
        document.getElementById('dataset-type').value === "Events Data" ? document.getElementById('dataconnect-input-width').disabled = true : document.getElementById('dataconnect-input-width').disabled = false;
        document.getElementById('dataset-type').value === "Events Data" && (document.getElementById("dataconnect-textarea").disabled === true || document.getElementById('dataconnect-textarea').value.length > 0) ? setgenerateButton(false) : setgenerateButton(true);

    }
    function preprocess(jsonData) {
        if (jsonData.length > 0) {
            var key = Object.keys(jsonData[0])[0];
            for (var i = 0; i < jsonData.length; i++) {
                if (typeof (jsonData[i][key]) !== "undefined" && jsonData[i][key] !== null) {
                    if (isNaN(jsonData[i][key])) {
                        jsonData[i][key] = jsonData[i][key].replace(/[\u0080-\uFFFF\U+0022\U+0027\U+0060\U+00B4\U+2018\U+2019\U+201C\U+201D]+/g, "");
                    }
                    else {
                        jsonData[i][key] = jsonData[i][key].toString();
                        jsonData[i][key] = jsonData[i][key].replace(/[\u0080-\uFFFF\U+0022\U+0027\U+0060\U+00B4\U+2018\U+2019\U+201C\U+201D]+/g, "");
                    }
                }
                else {
                    jsonData[i][key] = "";
                }
            }
            return jsonData;
        }
        return "";

    }
    function selectSampleData() {
        document.getElementById('sample-dataset').classList.add("selected-text-border");
        document.getElementById('upload-file').classList.contains("selected-text-border") ? document.getElementById('upload-file').classList.remove("selected-text-border") : null;
        document.getElementById("dataconnect-textarea").disabled = true;
        document.getElementById("excel-column").disabled = true;

        document.getElementById('dataset-type').value === "Events Data" && (document.getElementById("dataconnect-textarea").disabled === true || document.getElementById('dataconnect-textarea').value.length > 0) ? setgenerateButton(false) : setgenerateButton(true);
    }
    function changeSelection() {
        document.getElementById('sample-dataset').classList.contains("selected-text-border") ? document.getElementById('sample-dataset').classList.remove("selected-text-border") : null;
        document.getElementById('upload-file').classList.add("selected-text-border");
        document.getElementById("excel-column").disabled = false;
        setOpen(true);
        document.getElementById('dataset-type').value === "Events Data" && (document.getElementById("dataconnect-textarea").disabled === true || document.getElementById('dataconnect-textarea').value.length > 0) ? setgenerateButton(false) : setgenerateButton(true);
    }
    function createRequestJSON() {
        var formatteddata = '';
        const typeofdataset = document.getElementById('dataset-type').value;
        const selectedcolumn = document.getElementById('excel-column').value;
        const nooftopics = document.getElementById('dataconnect-input-width').value;
        if (document.getElementById('dataconnect-textarea').disabled === true) {
            if (typeofdataset === 'Events Data') {
                if (document.getElementById('upload-file').classList.contains("selected-text-border")) {
                    formatteddata = excelData.map((row) => (
                        {
                            review: row[selectedcolumn]
                        }

                    ));
                }
                else {
                    formatteddata = sampleData.data
                }
                formatteddata = preprocess(formatteddata);
            }
            else if (typeofdataset === 'Other Data') {
                if (excelData != 'a') {
                    console.log("other excel data")
                    formatteddata = {
                        Parameters: {
                            Number_of_Topics: nooftopics
                        },
                        Response: excelData.map((row) => (
                            {
                                Response: row[selectedcolumn]
                            }

                        ))
                    };
                }
                else {
                    formatteddata = {
                        Parameters: {
                            Number_of_Topics: nooftopics
                        },
                        Response: sampleData.data.map(s => ({ Response: s.review }))
                    };
                }
                formatteddata.Response = preprocess(formatteddata.Response);
            }
        }
        else {
            if (typeofdataset === 'Events Data') {
                formatteddata = document.getElementById('dataconnect-textarea').value.split("\n").map((row) => (
                    {
                        review: row
                    }

                ));
                formatteddata = preprocess(formatteddata);
            }
            else if (typeofdataset === 'Other Data') {
                formatteddata =
                {
                    Parameters: {
                        Number_of_Topics: nooftopics
                    },

                    Response: document.getElementById('dataconnect-textarea').value.split("\n").map((row) => (
                        {
                            Response: row
                        }

                    ))
                };
                formatteddata.Response = preprocess(formatteddata.Response);
            }
        }
        if (typeofdataset === "Other Data") {
            console.log("req other")
            console.log(formatteddata)
            setRequestJSON({
                typeofdata: typeofdataset,
                columnselected: selectedcolumn,
                topics: nooftopics,
                data: formatteddata
            })
        }
        else {
            console.log("req events")
            setRequestJSON({
                typeofdata: typeofdataset,
                columnselected: selectedcolumn,
                topics: nooftopics,
                data: formatteddata
            });
        }
        console.log(formatteddata)
    }

    function checkNumberOfTopics() {
        if (document.getElementById('dataconnect-input-width').value > 0 && (document.getElementById("dataconnect-textarea").disabled === true || document.getElementById('dataconnect-textarea').value.length > 0)) {
            setgenerateButton(false)
        }
        else {
            setgenerateButton(true);
        }
    }




    function handleInputFileChange(e) {
        const files = e.target.files;
        if (files && files[0]) {
            document.getElementById("dataconnect-textarea").disabled = true;
        }
        document.getElementById("excel-column").disabled = false;
        handleUploadedFile(files[0]);
    };

    function handleUploadedFile(file) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            var data = XLSX.utils.sheet_to_json(ws);
            data = JSON.parse(JSON.stringify(data, null, 2));
            setExcelData(data);
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    useEffect(() => {
        var textAreas = document.getElementsByTagName('textarea');

        Array.prototype.forEach.call(textAreas, function (elem) {
            elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
            elem.placeholder = elem.placeholder.replace(/\\t/g, '\t');
        });
        resolveColdStart();
        document.getElementById("show-topic-modelling").style.display = "none";
        document.getElementById("hide-topic-modelling").style.display = "inline-block";
        document.getElementById("show-sent-modelling").style.display = "none";
        document.getElementById("hide-sent-modelling").style.display = "inline-block";
        if (props.openDisclaimer) {
            props.acceptDisclaimer();
        }
    }, []);


    return (
        <div id='dataconnect-main' className={document.getElementById("sidenavbar-main") !== null && document.getElementById("sidenavbar-main").classList.contains("nav-mini") ? "minimization" : "maximized"}>
            <label className='dataconnect-text' >Enter or upload text</label>
            <div id='dataconnect-upload'>
                <label className='dataconnect-text text-border' id="sample-dataset" onClick={selectSampleData}>Use Sample Dataset  </label>
                <input type="file" name="file" id="dataconnect-upload-input" accept={config.SupportedFiles} onChange={handleInputFileChange} />
                <label title="Click here to upload your text data (supported format: csv, xlsx)" htmlFor="dataconnect-upload-inpu" id="upload-file" className='dataconnect-text text-border1' onClick={changeSelection}>Upload File<span className='dataconnect-upload-icon'><PublishIcon></PublishIcon></span></label>

            </div>
            {open && !sample ? <PopupComponent
                showCancelButton={"true"}
                closePopup={closePopup}
                popupContent={["Please follow steps below", " 1. Select the Dataset category.", "2. Select text column with text data.", "3. If Dataset category selected is 'other data' then provide the number of topics (keyword clusters) that you want to see in your dataset.", "4. Click on Generate Insights to generate insightful visualizations."]}
            /> : null}
            {
                open && sample ? <PopupComponent
                    showCancelButton={"true"}
                    useSample={'true'}
                    closePopup={closePopup}
                    popupContent={["Please follow steps below", " 1. Select the Dataset category.", "2. Select text column with text data.", "3. If Dataset category selected is 'other data' then provide the number of topics (keyword clusters) that you want to see in your dataset.", "4. Click on Generate Insights to generate insightful visualizations."]}
                /> : null
            }

            <textarea id='dataconnect-textarea' placeholder='Follow below instructions:

 

\n\n1. You can view the insights by providing your input in 3 different ways
    \n\ta. If you have raw text, click here and enter each comment in separate line
    \n\tb. If you have a CSV or Excel with data, use "Upload File" option above
    \n\tc. If you do not have any data, you can select "Use Sample Dataset" option to look at the features

 

\n\n2. After, you entered the data, select "Dataset Category" below that most accurately defines your dataset
\n3. Select the text column on which you want to generate insights
\n4. In case of "Other data", enter the number of topics (keyword clusters) that you want to see in the dataset
\n5. Click on Generate Insights
            '/>
            <br /><br />
            <label className='dataconnect-text' htmlFor="Datasets">Dataset category</label>
            <select className="dataconnect-dropdown" id='dataset-type' onChange={handleSelectedInput}>
                <option value="Other Data">Other data</option>
                <option value="Events Data">Events data</option>
            </select>
            <label className='dataconnect-text' htmlFor="Selectcolumn">Select column with text data</label>
            <select className="dataconnect-dropdown" disabled id='excel-column'>
                {Object.keys(excelData[0]).map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
            <label className='dataconnect-text' >Enter number of topics</label>
            <input type="number" min="0" step="1" onBlur={checkNumberOfTopics} id="dataconnect-input-width" placeholder="Enter value" />
            <div id='dataconnect-button-wrapper'>
                <button id={generateButton ? "button-disabled" : "button"} onClick={createRequestJSON} disabled={generateButton}>Generate Insights</button>
                {requestJSON != '' ? props.setJSON(requestJSON) : null}
                {requestJSON.typeofdata == 'Events Data' ?
                    <Redirect
                        to={{
                            pathname: "/TopicModelling",
                            //state: { requestJSON: requestJSON }
                        }}
                    /> : requestJSON.typeofdata == 'Other Data' ? <Redirect
                        to={{
                            pathname: "/UnknownView",
                            state: { requestJSON: requestJSON }
                        }}
                    /> : null}
            </div>

            <center><div id="footer-textanalytics-dataconnect">
                <p>
                    &#169; <span id="copyright_year">{new Date().getFullYear()}</span>
                    <a target="_blank" href="https://maqsoftware.com"><b> MAQ Software</b></a>
                      . All Rights Reserved.
                      <span className="link-privacy"><a target="_blank" href="https://maqsoftware.com/privacystatement"> Privacy Statement | </a></span>
                    <span className="link-privacy"><a target="_blank" href="https://maqsoftware.com/termsofservice">Terms of Service</a></span>
                </p>
            </div></center>
        </div>
    );
}

export default DataConnect;

