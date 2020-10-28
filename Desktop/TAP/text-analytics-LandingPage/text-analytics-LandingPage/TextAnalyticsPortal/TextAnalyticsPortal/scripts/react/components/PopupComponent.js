import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import {MuiThemeProvider, createMuiTheme }  from "@material-ui/core/styles";


const theme = createMuiTheme({
    palette: {
        primary: { main: '#534e9b', tonalOffset: 0.1 }
    }
});

const style = {
    margin: 5,
};
function PopupComponent(props) {
  
    const [open, setOpen] = React.useState(true);
    const handleClose = (value) => {
        if(value=='ok2')
        document.getElementById('dataconnect-upload-input').click();
        props.closePopup(value);
        setOpen(false);
    };
    return (
              <div>
            <Dialog disableBackdropClick={true} disableEscapeKeyDown={true} onClose={() => handleClose("cancel")} aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"  open={open}>
                <DialogContent>
                    {props.popupContent.map((content, index) => (
                        <DialogContentText key={index}>
                            {content}
                    </DialogContentText>
                    ))
                    }
                        <DialogContentText>
                            Press <b>OK</b> to continue
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <MuiThemeProvider theme={theme}>
                        {props.showCancelButton === "true" ?
                            <span>
                                <Button variant="contained" onClick={() => handleClose("ok2")} color="primary" style={style}>
                                    OK
                        </Button>
                                <Button variant="contained" onClick={() => handleClose("cancel")} color="primary" style={style}>
                                Cancel
                        </Button>
                               
                            </span>
                            : <Button variant="contained" onClick={() => handleClose("ok")} color="primary" style={style}>
                                OK
                        </Button>}
                      
                        </MuiThemeProvider>
                    </DialogActions>
                </Dialog>
            </div>
    );
}

export default PopupComponent;
