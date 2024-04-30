import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import instructionsImg from './Instructions.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide1({open,setOpen,handleClickOpen,handleClose}) {


  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use this simple graph as reference"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <img src={instructionsImg} alt='instructions'></img>
           <p>
            Please enter the starting node of the graph in 'Enter Initial Node'. There can be only 1 initial node 
            </p>
            <p>
            Please enter the final node of the graph in 'Enter Final Node'. There can be only 1 final node.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
