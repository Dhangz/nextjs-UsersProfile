
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open : boolean) => boolean | void;
  children: React.ReactNode
}


const ModalView: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children}) => {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className='font-bold'>
          Personal Information
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
           {children}
          </Typography>
      
      
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  )
}

export default ModalView



