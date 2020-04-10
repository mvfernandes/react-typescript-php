import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, Paper } from '@material-ui/core';
import { validateEmail } from 'Utils';
import { ClienteDTO } from 'Models/ClienteDTO';
import { ClienteService } from 'Services/ClienteService';
import { CPFMASK, CNPJ, TELMASK, CELMASK, CEPMASK, RGMASK } from 'Utils/Mask';
import { isValidCPF, isValidCNPJ } from '@brazilian-utils/brazilian-utils';
import { AppContext } from 'Appcontext/AppContext';
import { showToastModel } from 'Appcontext/Reducers/ToastReducer';
import { BaseResponse } from 'Services/types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from 'StyleApp';

interface IFormProps {
    ClienteSelecionado: ClienteDTO | undefined,
    success(u?: ClienteDTO): void
}

interface IFormState extends ClienteDTO {
    isLoading: boolean
    inputError: boolean,
}

class Form extends React.PureComponent<IFormProps, IFormState> {

    static contextType = AppContext;

    private service = new ClienteService();

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            nome: '',
            empresa: '',
            cpf: '',
            rg: '',
            cnpj: '',
            celular: '',
            telefone: '',
            endereco: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: '',
            inputError: false,

            numero: "",
          
           
            cpfCnpj: ""
        }
    }


    private validateCpfCnpj = () => {
        const { cpfCnpj } = this.state;
        if (cpfCnpj.length < 15) {
            return isValidCPF(cpfCnpj.replace(/[-,.]/g, ''));
        }
        if (cpfCnpj.length > 14) {
            return isValidCNPJ(cpfCnpj.replace(/[-,.,/]/g, ''));
        }
    }

    private submitValues = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {  email, celular, endereco, cidade, estado, numero, bairro } = this.state;

        const validation = {
            celular, endereco, cidade, estado, numero, bairro
        }

        this.setState({ inputError: true });


        if (!validateEmail(email)) return;
        if (!this.validateCpfCnpj()) return;
        if (Object.values(validation).filter(i => !i).length > 0) return;


        this.setState({ isLoading: true });

        let formObject = { ...this.state };
        delete formObject.inputError;
        delete formObject.isLoading;

        try {
            let result: BaseResponse<[]> = { Data: [], Success: true, Message: "" };
            if (this.props.ClienteSelecionado) {
                result = await this.service.updateCliente({ ...formObject, id: this.props.ClienteSelecionado.id });
                if (result.Success) {
                    this.context.dispatch(showToastModel('success', result.Message));
                    setTimeout(() => {
                        this.props.success(formObject);
                    }, 350);
                } else {
                    this.context.dispatch(showToastModel('danger', result.Message));
                }
            } else {
                result = await this.service.newCliente(formObject);
                if (result.Success) {
                    this.context.dispatch(showToastModel('success', result.Message));
                    setTimeout(() => {
                        this.props.success();
                    }, 350);
                } else {
                    this.context.dispatch(showToastModel('danger', result.Message));
                }
            }

        } catch (error) {
            alert(error)
        } finally {
            this.setState({ isLoading: false });
        }
    }

    private setFieldSelect = (field: string) => (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>, child: React.ReactNode) => {
        this.setState({ ...this.state, [field]: event.target.value });
    }

    private setField = (field: string, mask?: 'CPFMASK' | 'CNPJ' | 'TELMASK' | 'CELMASK' | 'CEPMASK' | 'RGMASK') => (event: React.ChangeEvent<{ value: string }>) => {

        const toMask = { CPFMASK, CNPJ, TELMASK, CELMASK, CEPMASK, RGMASK };

        if (mask) {
            this.setState({ ...this.state, [field]: toMask[mask](event.target.value) }, () => {
                if (mask === 'CEPMASK' && this.state.cep.length === 9) {
                    this.getViaCep();
                }
            });
        } else {
            this.setState({ ...this.state, [field]: event.target.value });
        }
    }

    private getViaCep = () => fetch(`https://viacep.com.br/ws/${this.state.cep}/json/`).then(r => r.json()).then(response => {
        if (!response.erro) {
            this.setState({
                endereco: response.logradouro,
                bairro: response.bairro,
                cidade: response.localidade,
                estado: response.uf,
            })
        }
    });


    componentDidMount = async () => {
        try {
            
            if (this.props.ClienteSelecionado) {
                this.setState({
                    ...this.state,
                    ...this.props.ClienteSelecionado,
                });
            }

        } catch (error) {
            return;
        }
    }

    render() {

        const {
            isLoading,
            cep,
            telefone,

            email,
            nome,
            celular,
            endereco,
            cidade,
            estado,
            inputError,
    
            numero,
            bairro,
   
            cpfCnpj,

        } = this.state;


        return (
            <Container>
                <Paper style={{ padding: 15, width: '100%' }}>

                    <form noValidate autoComplete="off" style={{ width: '100%' }} onSubmit={this.submitValues}>
                        <Grid container spacing={2}>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField
                                    error={inputError && !nome.trim()}
                                    required={true}
                                    helperText={(inputError && !nome.trim()) && "Nome é obrigatório"}
                                    fullWidth label="Nome" value={nome} onChange={this.setField('nome')} />
                            </Grid>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth
                                    type="tel"
                                    error={inputError && !this.validateCpfCnpj()}
                                    required={true}
                                    helperText={(inputError && !this.validateCpfCnpj()) && "Insira um CPF ou CNPJ válido"}
                                    label="CPF/CNPJ" value={cpfCnpj} onChange={this.setField('cpfCnpj', cpfCnpj.length >= 14 ? "CNPJ" : "CPFMASK")} />
                            </Grid>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth
                                    type="tel"
                                    label="Cep" value={cep} onChange={this.setField('cep', 'CEPMASK')} />
                            </Grid>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth
                                    error={inputError && !endereco.trim()}
                                    required={true}
                                    helperText={(inputError && !endereco.trim()) && "Endereço é obrigatório"}
                                    label="Rua/Avenida/Travessa" value={endereco} onChange={this.setField('endereco')} />
                            </Grid>

                            <Grid item lg={2} md={2} sm={4} xs={12}>
                                <TextField fullWidth
                                    error={inputError && !numero.trim()}
                                    required={true}
                                    helperText={(inputError && !numero.trim()) && "Número obrigatório"}
                                    label="Número" value={numero} onChange={this.setField('numero')} />
                            </Grid>

                            <Grid item lg={4} md={4} sm={8} xs={12}>
                                <TextField fullWidth
                                    error={inputError && !bairro.trim()}
                                    required={true}
                                    helperText={(inputError && !bairro.trim()) && "Bairro obrigatório"}
                                    label="Bairro" value={bairro} onChange={this.setField('bairro')} />
                            </Grid>


                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField fullWidth
                                    error={inputError && !cidade.trim()}
                                    required={true}
                                    helperText={(inputError && !cidade.trim()) && "Cidade é obrigatório"}
                                    label="Cidade" value={cidade} onChange={this.setField('cidade')} />
                            </Grid>

                            <Grid item lg={4} md={4} sm={12} xs={12}>
                                <TextField fullWidth
                                    error={inputError && !estado.trim()}
                                    required={true}
                                    helperText={(inputError && !estado.trim()) && "Estado é obrigatório"}
                                    label="Estado" value={estado} onChange={this.setField('estado')} />
                            </Grid>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth
                                    type="tel"
                                    label="Telefone" value={telefone} onChange={this.setField('telefone', 'TELMASK')} />
                            </Grid>


                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth
                                    type="tel"
                                    error={inputError && !celular.trim()}
                                    required={true}
                                    helperText={(inputError && !celular.trim()) && "Celular é obrigatório"}
                                    label="Celular" value={celular} onChange={this.setField('celular', 'CELMASK')} />
                            </Grid>

                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField fullWidth label="Email"
                                    error={inputError && !validateEmail(email)}
                                    required={true}
                                    helperText={(inputError && !validateEmail(email)) && "Insira um e-mail válido"}
                                    value={email} onChange={this.setField('email')} />
                            </Grid>

                        </Grid>
                        <Button size="large" style={{ marginTop: 50 }} variant="contained" color="primary"
                            type="submit"
                            disabled={isLoading}
                            endIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : null}
                        >
                            {this.props.ClienteSelecionado ? 'Atualizar' : 'Registrar'}
                        </Button>
                    </form>
                </Paper>
            </Container>)
    }

}

export default Form;