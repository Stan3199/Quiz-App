
import Popup from 'reactjs-popup';
import '../../styles/Modal.css';

import React, { useState, useRef} from 'react';
let rootContainer = document.getElementById("root");
function Pop (props) { 
    const [postId, setPostId] = useState('Loading...');
    const [apikey, setApikey]=useState('Loading...');
    const [messege,setMessege]=useState('Validating Email ID: '+rootContainer.dataset.email );
    const [status,SetStatus]=useState();
    const [maxlimit, setMaxlimit]=useState('Loading...');
    const [expiry,setExpiry]=useState('Loading..');
    const [copySuccess, setCopySuccess] = useState('');
    const [copySuccess1, setCopySuccess1] = useState('');
    const textAreaRef = useRef(null);
    const EndpointRef =useRef(null);
    const rateLimitRef =useRef(null);
    const expireRef=useRef(null);
  
    function copyToClipboard(e) {
     
      textAreaRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the the whole text area selected.
      e.target.focus();
      setCopySuccess('Copied!');
    };
    function copyToClipboard1(e) {

      EndpointRef.current.select();
      document.execCommand('copy');
      // This is just personal preference.
      // I prefer to not show the the whole text area selected.
      e.target.focus();
      setCopySuccess1('Copied!');
    };
    function Getdetails()
    {
      let rootContainer = document.getElementById("root");
        const requestOptions = {
            method: 'POST',
            headers: { 'Ocp-Apim-Subscription-Key': '5034038ea11d45dea6d6cd93a0bfae88' },
            body: JSON.stringify({ emailid: rootContainer.dataset.email })
        };
        fetch('https://azurefunctionapplinuxdev2-apim.azure-api.net/azurefunctionapplinuxdev2/RegisterToken', requestOptions)
            .then(response => response.json())
            .then(data => {setPostId(data.apikey );
              setApikey(data.apikey);
              setMaxlimit(data.maxlimit);
              setMessege(data.message);
              setExpiry(data.expiry);
              SetStatus(data.status)

            });
    
    }
    return (
  <Popup
    trigger={<button className="button" > Get FREE Trial </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Policy and User Consent</div>
        <div className="content">
          {' '}
          Please Accept the Terms & Condition below
<br/>
1. Select the Dataset category.
<br/>
2. Select text column with text data.
<br/>
3. If Dataset category selected is 'other data' then provide the number of topics (keyword clusters) that you want to see in your dataset.
<br/>
4. Click on Generate Insights to generate insightful visualizations.
<br/>

        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"  > Accept & Continue</button>}
            modal
            nested
          >
   
           {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
           <div className="header"> Subscription Details</div>
        <div className="content">
{
  Getdetails()
}
          {' '}
       {messege}
          <br />
          { (status!='fail')?
          <table style={{width:'99%'}} id='out-table'>
          <colgroup><col width="10%"/><col width="50%"/></colgroup>
            <tbody>
            
              <tr>
                <td><b>API Endpoint</b></td>
               <td><textarea ref={EndpointRef} value={'https://azurefunctionapplinuxdev2-apim.azure-api.net/sentiment/AnalyzeSentiment_auth'} style={{width:'100%',height:'auto'}} readOnly={true}></textarea>
   
              
                {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard1}>Copy</button> 
          {copySuccess1}
        </div>
      }
                </td>
              </tr>
              <tr>
                <td><b>API Key</b></td>
                <td><textarea ref={textAreaRef} value={apikey} style={{width:'100%'}} readOnly={true}></textarea>
               
                {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard}>Copy</button> 
          {copySuccess}
        </div>
      }
                </td>
               
              </tr>
              <tr>
                <td><b>Exprire On</b></td>
                <td>{expiry}</td>
              </tr>
              <tr>
                <td><b> Batch Rate Limit</b></td>
                <td>{maxlimit}</td>
              </tr>
            </tbody>
    </table>:<p></p>
           }
        </div>
        <div className="actions">
        {status=='fail'?<button
            className="button"
            onClick={() => {
             window.open('https://maqsoftware.com/contact','_blank');
            }}
          >
           Contact US
          </button>:null}
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
           Close
          </button>
        </div>
      </div>
    )}
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
           Cancel
          </button>
        </div>
      </div>
    )}
  </Popup>
);}
export default Pop;