import React from 'react';
import config from '../config';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SelectInput from '@material-ui/core/Select/SelectInput';
import InfoIcon from "@material-ui/icons/Info";
import FetchData from "../commonFunctions/FetchData";
export default function ResponsiveDialog(props) {
    const [postId, setPostId] = React.useState('Loading...');
    const [apikey, setApikey] = React.useState('Loading...');
    const [messege, setMessege] = React.useState();
    const [status, SetStatus] = React.useState();
    const [maxlimit, setMaxlimit] = React.useState('Loading...');
    const [expiry, setExpiry] = React.useState('Loading..');
    const [copySuccess, setCopySuccess] = React.useState('');
    const [copySuccess1, setCopySuccess1] = React.useState('');
    const textAreaRef = React.useRef(null);
    const EndpointRef = React.useRef(null);
    const rateLimitRef = React.useRef(null);
    const expireRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    function CopyTo(text, btn, buttonref) {


        let content = document.getElementById(text).innerHTML;
        document.getElementById(buttonref).style.backgroundColor = '#3a31aa';
        document.getElementById(buttonref).style.color = 'white';
        document.getElementById('txt_area').style.display = 'block';
        document.getElementById('txt_area').value = content;
        textAreaRef.current.select();
        document.execCommand('copy');
        document.getElementById('txt_area').style.display = 'none';
        document.getElementById(btn).innerHTML = '✔️Copied';
        setTimeout(() => { document.getElementById(buttonref).style.backgroundColor = 'transparent'; document.getElementById(btn).innerHTML = '📋Copy'; document.getElementById(buttonref).style.color = 'var(--text)'; }, 3000);
    }
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

    const handleClickOpen = () => {

        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
        setOpen2(true);

        let rootContainer = document.getElementById("root");
        const requestOptions = {
            method: 'GET',
            headers: { 'Ocp-Apim-Subscription-Key': '5034038ea11d45dea6d6cd93a0bfae88' },

        };
        console.log(rootContainer.dataset)
        fetch('https://azurefunctionapplinuxdev2-apim.azure-api.net/sdk/RegisterToken', requestOptions)
            .then(response => response.json())
            .then(data => {
                setPostId(data.apikey);
                setApikey(data.apikey);
                setMaxlimit(data.maxlimit);
                setMessege(data.message)
                setExpiry(data.expiry);
                SetStatus(data.status);
                FetchData({}, 'Home/sendDevEmail');
            });
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClose0 = () => {
        setOpen(false);
    };
    return (
        <div>

            <button className='button' onClick={handleClickOpen}>
                Get Free Trial
      </button>
            <button className='button' onClick={() => { window.open('https://github.com', '_blank'); }}>
                Install Library
      </button>
            <Dialog
                fullScreen={fullScreen}
                open={open}

                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" >{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We would like to read and access your profile information. Your login info will be stored for authentication purposes.
                        Note: All the information will be encrypted and deleted within 15 days of its expiration.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} color="primary" autoFocus className='button'>
                        Agree
          </button>
                    <button autoFocus onClick={handleClose0} color="primary" className='button'>
                        Disagree
          </button>

                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={open2}

                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" >Subscription Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {status == 'success' ? <div class="alert is-success">
                            <p class="alert-title"><span class="docon docon-lightbulb" aria-hidden="true"></span>💡 ACTIVE</p>
                            <p>{messege}</p>
                        </div> : null}
                        <br />

                        {(status == 'success') ?
                            <div>
                                <div class="codeHeader" id="code-try-0" data-bi-name="code-header"><span class="language">API Endpoint</span><button type="button" class="action is-relative" data-bi-name="copy" aria-label="Copy code" onClick={() => { CopyTo('endpoint_text', 'cpy1', 'btn1') }} id='btn1'>

                                    <span id='cpy1'>📋Copy</span>
                                    <div class="successful-copy-alert is-absolute has-right-zero has-top-zero has-left-zero has-bottom-zero is-flex has-flex-align-items-center has-flex-justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">

                                    </div>
                                </button>


                                </div>
                                <pre tabindex="0" class="has-inner-focus"><code class="lang-csharp" style={{ color: 'blue' }} id='endpoint_text'>
                                    https://azurefunctionapplinuxdev2-apim.azure-api.net/sentiment/AnalyzeSentiment_auth
                  </code></pre>
                                <div class="codeHeader" id="code-try-0" data-bi-name="code-header"><span class="language">API Key</span><button type="button" class="action is-relative" data-bi-name="copy" aria-label="Copy code" onClick={() => { CopyTo('apikey_text', 'cpy2', 'btn2') }} id='btn2'>

                                    <span id='cpy2'>📋Copy</span>
                                    <div class="successful-copy-alert is-absolute has-right-zero has-top-zero has-left-zero has-bottom-zero is-flex has-flex-align-items-center has-flex-justify-content-center has-text-success-invert has-background-success is-transparent" aria-hidden="true">

                                    </div>
                                </button>


                                </div>
                                <pre tabindex="0" class="has-inner-focus" style={{ padding: '0px !important' }}>
                                    <code style={{ color: 'green' }} id='apikey_text1'>
                                        <textarea id='apikey_text' style={{ outline: 'none', border: 'none', backgroundColor: 'transparent', fontSize: '.7rem', fontFamily: 'monospace', padding: '0px', color: 'blue', marginTop: '0px', height: 'auto', width: '101%', resize: 'none' }} readOnly>{apikey}</textarea>
                                    </code>
                                </pre>
                                <textarea id='txt_area' ref={textAreaRef} value='' readOnly style={{ display: 'none' }} />
                                <div class="codeHeader" id="code-try-0" data-bi-name="code-header"><span class="language">Validity  <Tooltip title='Time until which subscription will be active' placement='right'><span ><FontAwesomeIcon icon={faInfoCircle} /></span></Tooltip></span>


                                </div>
                                <pre tabindex="0" class="has-inner-focus"><code class="lang-csharp" style={{ color: 'blue' }} id='expire_text'>
                                    {expiry}
                                </code></pre>
                                <div class="codeHeader" id="code-try-0" data-bi-name="code-header"><span class="language">Batch Rate Limit  <Tooltip title='Maximum number of batch calls that can be made using this subscription. Each batch call can have 1 to maximum 25 documents.' placement='right'><span ><FontAwesomeIcon icon={faInfoCircle} /></span></Tooltip></span>


                                </div>
                                <pre tabindex="0" class="has-inner-focus"><code class="lang-csharp" style={{ color: 'blue' }} id="limit_text">
                                    {maxlimit}
                                </code></pre>
                            </div> : <div style={{ textAlign: 'center' }}><img src={config.Spinner} /></div>
                        }
                    </DialogContentText>
                </DialogContent>
                {status == 'fail' ? <DialogActions>
                    <Button autoFocus onClick={handleClose2} color="primary">
                        Disagree
          </Button>
                    <Button onClick={handleClose2} color="primary" autoFocus>
                        Agree
          </Button>
                </DialogActions> : null}
                {status == 'success' ? <DialogActions>
                    <button autoFocus onClick={handleClose2} color="primary" className='button'>
                        Close
          </button>

                </DialogActions> : null}
            </Dialog>
        </div>
    );
}
