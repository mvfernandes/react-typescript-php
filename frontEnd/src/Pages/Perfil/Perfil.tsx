import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, Paper, Typography } from '@material-ui/core';
import { validateEmail } from 'Utils';
import { PerfilService } from 'Services/PerfilService';
import { AppContext } from 'Appcontext/AppContext';
import { showToastModel } from 'Appcontext/Reducers/ToastReducer';
import { UsuarioDTO } from 'Models/UsuarioDTO';
// import CircularProgress from '@material-ui/core/CircularProgress';

//import { IPerfilProps, IPerfilState } from './types';

interface IPerfilProps { }
interface IPerfilState extends UsuarioDTO {
    nome: string,
    empresa: string,
    email: string,
    password: string,
    newpassword: string,
    inputError: boolean
}

class Perfil extends React.PureComponent<IPerfilProps, IPerfilState> {

    static contextType = AppContext;

    private service = new PerfilService();

    constructor(props: IPerfilProps) {
        super(props);
        this.state = {
            nome: '',
            empresa: '',
            email: '',
            password: '',
            newpassword: '',
            inputError: false
        }
    }

    private submitValues = async () => {
        const { nome, empresa, email,
            // password, newpassword
        } = this.state;


        if (!validateEmail(email) ||
            // (password.trim() && !newpassword.trim()) ||
            !nome.trim() || !empresa.trim()) {
            this.setState({ inputError: true })
            return;
        }

        try {

            const Result = await this.service.updatePerfil(this.state);

            this.context.dispatch(showToastModel('success', Result.Message));


        } catch (error) {
            this.context.dispatch(showToastModel('danger', error));
        }
    }

    private setField = (field: string) => (event: React.ChangeEvent<{ value: string }>) => {
        this.setState({ ...this.state, [field]: event.target.value });
    }

    componentDidMount = async () => {
        try {
            const Result = await this.service.getPerfil();
            this.setState({ ...this.state, ...Result.Data });

        } catch (error) { }
    }

    render() {
        const { nome, empresa, email,
            // password, 
            inputError,
            //  newpassword 
        } = this.state;

        return (
            <Paper style={{ padding: 20, width: '100%' }}>
                <Grid container direction="row" alignItems="center">
                    <Typography variant="h6" >Atualizar dados</Typography>
                    {/* &nbsp;&nbsp;<CircularProgress size={20} /> */}
                </Grid>
                <br /><br />
                <form noValidate autoComplete="off" style={{ width: '100%' }} onSubmit={this.submitValues}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={inputError && !nome.trim()}
                                required={true}
                                helperText={(inputError && !nome.trim()) && "Nome é obrigatório"}
                                fullWidth label="Nome" value={this.state.nome} onChange={this.setField('nome')} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField fullWidth
                                error={inputError && !empresa.trim()}
                                required={true}
                                helperText={(inputError && !empresa.trim()) && "Empresa é obrigatório"}
                                label="Empresa" value={this.state.empresa} onChange={this.setField('empresa')} />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField fullWidth label="Email"
                                error={inputError && !validateEmail(email)}
                                required={true}
                                helperText={(inputError && !validateEmail(email)) && "Insira um e-mail válido"}
                                value={this.state.email} onChange={this.setField('email')} />
                        </Grid>
                        {/* {
                            password.trim() && (
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        error={(inputError && !newpassword.trim())}
                                        required={true}
                                        helperText={((inputError && !newpassword.trim()) && "Senha antiga é obrigatório")}
                                        fullWidth
                                        label="Senha antiga"
                                        value={this.state.newpassword} onChange={this.setField('newpassword')} />
                                </Grid>
                            )
                        } */}
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                fullWidth
                                label="Nova Senha"
                                value={this.state.password} onChange={this.setField('password')} />
                        </Grid>
                    </Grid>
                    <Button size="large" style={{ marginTop: 20 }} variant="contained" color="primary"
                        onClick={this.submitValues}>
                        Atualizar
                    </Button>
                </form>
            </Paper>
        )

    }
}

export default Perfil