import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalFull from 'Components/ModalFull/ModalFull';
import Tabela from 'Components/UI/Tabela';
import { Grid } from '@material-ui/core';
import { ClienteDTO } from 'Models/ClienteDTO';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Form from './Components/Form/Form';
import { ClienteService } from 'Services/ClienteService';

// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface IClientesProps { }
interface IClientesState {
    openModal: boolean;
    Clientes: ClienteDTO[];
    ClienteSelecionado: ClienteDTO | undefined;
    isLoading: boolean;
}

class Clientes extends React.PureComponent<IClientesProps, IClientesState> {

    private service = new ClienteService();

    constructor(props: IClientesProps) {
        super(props);
        this.state = {
            openModal: false,
            Clientes: [],
            ClienteSelecionado: undefined,
            isLoading: true,
        }
    }

    private getClientes = async () => {
        try {
            const response = await this.service.getClientes();

            this.setState({ Clientes: response.Data });

        } catch (error) {
            alert(error)
        } finally {
            this.setState({isLoading: false});
        }
    }

    // private deleteCliente = async (cliente: ClienteDTO) => {
    //     if (cliente.id) {
    //         try {
    //             await this.service.delCliente(cliente.id);
    //             this.setState({
    //                 Clientes: this.state.Clientes.filter(cli => cli.id !== cliente.id)
    //             })
    //         } catch (error) {
    //             alert(error)
    //         }
    //     }
    // }


    componentDidMount = () => {
        this.getClientes();
    }

    render() {

        const cli = this.state.ClienteSelecionado;
        const { isLoading } = this.state;

        return (
            <Grid container style={{ paddingBottom: 30 }}>

                <Tabela
                    isLoading={isLoading}
                    header={[
                        { Key: 'nome', Value: 'Nome' },
                        // { Key: 'empresa', Value: 'Empresa' },
                        // { Key: 'email', Value: 'E-mail' },
                        // { Key: 'cpf', Value: 'CPF' },
                        // { Key: 'rg', Value: 'RG' },
                        // { Key: 'cnpj', Value: 'CNPJ' },
                        // { Key: 'celular', Value: 'Celular', noWrap: true },
                        // { Key: 'endereco', Value: 'Endereço' },
                        // { Key: 'cep', Value: 'Cep' },
                        { Key: 'cidade', Value: 'Cidade' },
                        { Key: 'estado', Value: 'Estado' },
                    ]}
                    body={this.state.Clientes}
                    action={[
                        {
                            titulo: 'Detalhes',
                            icone: <VisibilityIcon />,
                            emmit: (ClienteSelecionado: ClienteDTO) => {
                                this.setState({ ClienteSelecionado, openModal: true });
                            }
                        },
                        // {
                        //     titulo: 'Deletar cliente',
                        //     icone: <DeleteForeverIcon />,
                        //     iconeColor: 'secondary',
                        //     emmit: (cliente: ClienteDTO) => {
                        //         this.deleteCliente(cliente);
                        //     },
                        //     DialogAction: {
                        //         title: 'Tem certeza que quer deletar?',
                        //         type: 'danger'
                        //     }
                        // }
                    ]}
                />

                <ModalFull
                    open={this.state.openModal}
                    close={() => { this.setState({ openModal: false, ClienteSelecionado: undefined }) }}
                    title={cli ? cli.nome : 'Novo Cliente'}>
                    <Form
                        ClienteSelecionado={this.state.ClienteSelecionado}
                        success={(cliente: ClienteDTO) => {
                            if (cliente) {
                                this.setState({
                                    Clientes: this.state.Clientes.map(cli => cli.id === cliente?.id ? ({ ...cli, ...cliente }) : cli),
                                    ClienteSelecionado: undefined,
                                    openModal: false,
                                })
                            } else {
                                this.setState({ openModal: false });
                                this.getClientes();
                            }

                        }}
                    />
                </ModalFull>

                <Fab
                    onClick={() => { this.setState({ openModal: true }) }}
                    color="secondary"
                    aria-label="add"
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        bottom: 10,
                        left: 10,
                        margin: '0 auto',
                    }} >
                    <AddIcon />
                </Fab>
            </Grid>
        )

    }
}

export default Clientes