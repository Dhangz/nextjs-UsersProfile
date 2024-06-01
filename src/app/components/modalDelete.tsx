
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import User from './User';
import { DeleteUser } from '../api';
import { useRouter } from 'next/navigation';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open : boolean) => boolean | void;
  children: React.ReactNode
}


const ModalDelete: React.FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [OpenModalDelete, setOpenModalDelete] = React.useState<boolean>(false);

  const handleClose = () => {
    setModalOpen(false);
  };



  return (
    <React.Fragment>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClick={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete these records? This process cannot be undone
          </DialogContentText>
        </DialogContent>
        {children}
      </Dialog>
    </React.Fragment>
  );
}
export default ModalDelete