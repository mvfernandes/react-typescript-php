import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

interface IModalFullProps {
    title: string
    open: boolean
    close(): void
}

const ModalFull: React.FC<IModalFullProps> = (props) => {
    const classes = useStyles();

    const handleClose = () => {
            props.close();
    };


    return (
        <Dialog fullScreen open={props.open} 
        // TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container style={{ padding: '24px' }} >
                {props.open ? props.children : null}
            </Grid>
        </Dialog>
    );
}

export default ModalFull;