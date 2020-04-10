import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IDialogAction {
    title?: string
    btnConfirma?: string,
    btnCancel?: string
    msgConfirm?: string,
    type: 'danger' | 'success' | 'warnig',
    open: boolean,
    cancel(): void,
    confirm(): void,
}

const TabelaDialog: React.FC<IDialogAction> = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={() => { props.cancel(); }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title || ''}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.msgConfirm || ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.cancel(); }} color="primary">
                    {props.btnCancel || 'Não'}
                </Button>
                <Button onClick={() => { props.confirm() }} color="primary"
                    autoFocus
                >
                    {props.btnConfirma || 'Confirma'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default React.memo(TabelaDialog)