import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

//import { INotFoundProps } from './types';

interface INotFoundProps { }

const NotFound: React.FC<INotFoundProps> = (props) => {

    return (
        <Grid container style={{padding: 30}} alignItems="center" justify="center">
            <Paper style={{padding: 30}}><Typography variant="h3">Página não encontrada</Typography></Paper>
        </Grid>
    )

}

export default React.memo(NotFound)