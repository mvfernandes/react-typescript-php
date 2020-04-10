import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, Paper } from '@material-ui/core';
import { UsuarioDTO } from 'Models/UsuarioDTO';
import { UsuarioService } from 'Services/UsuarioService';
import { validateEmail } from 'Utils';
import { AppContext } from 'Appcontext/AppContext';
import { showToastModel } from 'Appcontext/Reducers/ToastReducer';
import { BaseResponse } from 'Services/types';

interface IFormProps {
    UsuarioSelecionado: UsuarioDTO | undefined,
    success(u: UsuarioDTO): void
}

interface IFormState {
    nome: string,
    empresa: string,
    email: string,
    password: string,
    inputError: boolean
}

class Form extends React.PureComponent<IFormProps, IFormState> {

    static contextType = AppContext;

    private service = new UsuarioService();

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            nome: '',
            empresa: '',
            email: '',
            password: '',
            inputError: false
        }
    }

    private submitValues = async () => {
        const { nome, empresa, email, password } = this.state;

        if (!validateEmail(email)) {
            this.setState({ inputError: true })
            return;
        }
        if (!nome) return;
        if (!empresa) return;
        if (!this.props.UsuarioSelecionado && !password) return;
        try {
            let Result: BaseResponse<unknown>;
            if (this.props.UsuarioSelecionado) {
                Result = await this.service.updateUser({ ...this.state, id: this.props.UsuarioSelecionado.id });
            } else {
                Result = await this.service.newUser(this.state);
            }
            this.context.dispatch(showToastModel('success', Result.Message));
            this.props.success({
                id: '',
                email,
                nivel: '',
                empresa,
                nome,
            });

        } catch (error) {
            this.context.dispatch(showToastModel('danger', error));
        }
    }

    private setField = (field: string) => (event: React.ChangeEvent<{ value: string }>) => {
        this.setState({ ...this.state, [field]: event.target.value });
    }

    componentDidMount = () => {
        if (this.props.UsuarioSelecionado) {
            const { email, empresa, nome } = this.props.UsuarioSelecionado;
            this.setState({
                nome: nome,
                empresa: empresa,
                email: email,
            });
        }
    }

    render() {

        const { nome, empresa, email, password, inputError } = this.state;

        return (
            <Paper style={{ padding: 20, width: '100%' }}>
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
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                error={!this.props.UsuarioSelecionado && (inputError && !password.trim())}
                                required={!this.props.UsuarioSelecionado && true}
                                helperText={!this.props.UsuarioSelecionado && ((inputError && !password.trim()) && "Senha é obrigatório")}
                                fullWidth
                                label="Senha"
                                value={this.state.password} onChange={this.setField('password')} />
                        </Grid>
                    </Grid>
                    <Button size="large" style={{ marginTop: 20 }} variant="contained" color="primary"
                        onClick={this.submitValues}>
                        {this.props.UsuarioSelecionado ? 'Atualizar' : 'Registrar'}
                    </Button>
                </form>
            </Paper>
        )
    }
}

export default Form