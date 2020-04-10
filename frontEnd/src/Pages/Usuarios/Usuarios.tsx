import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalFull from 'Components/ModalFull/ModalFull';
import Form from './Components/Form/Form';
import Tabela from 'Components/UI/Tabela';
import { Grid } from '@material-ui/core';
import { UsuarioService } from 'Services/UsuarioService';
import { UsuarioDTO } from 'Models/UsuarioDTO';
import { BaseResponse } from 'Services/types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AppContext } from 'Appcontext/AppContext';
import { showToastModel } from 'Appcontext/Reducers/ToastReducer';

interface IUsuariosProps { }
interface IUsuariosState {
    openModal: boolean
    Usuarios: UsuarioDTO[],
    UsuarioSelecionado: UsuarioDTO | undefined,
    ModalTitle: string
}

class Usuarios extends React.PureComponent<IUsuariosProps, IUsuariosState> {

    static contextType = AppContext;

    private service = new UsuarioService();
    private isLoading = true;

    constructor(props: IUsuariosProps) {
        super(props);
        this.state = {
            openModal: false,
            Usuarios: [],
            ModalTitle: '',
            UsuarioSelecionado: undefined
        }
    }

    private getUsers = async () => {
        try {
            const Response: BaseResponse<UsuarioDTO[]> = await this.service.getUsers();
            this.setState({ Usuarios: Response.Data });

        } catch (error) {
            this.context.dispatch(showToastModel('danger', error));
        } finally {
            this.isLoading = false;
        }
    }

    private deleteUser = async (user: UsuarioDTO) => {
        try {
            if (user.id) {
                const Response: BaseResponse<any> = await this.service.delUser(user.id);
                this.setState({
                    Usuarios: this.state.Usuarios.filter(usuario => usuario.id !== user.id)
                })
                this.context.dispatch(showToastModel('info', Response.Message));
            }
        } catch (error) {
            this.context.dispatch(showToastModel('danger', error));
        }
    }

    componentDidMount = () => {
        this.getUsers()
    }

    render() {
        return (
            <Grid container style={{ paddingBottom: 30 }}>

                <Tabela
                    isLoading={this.isLoading}
                    header={[
                        { Key: 'nome', Value: 'Nome' },
                        { Key: 'empresa', Value: 'Empresa' },
                        { Key: 'email', Value: 'E-mail' },
                    ]}
                    body={this.state.Usuarios}
                    action={[
                        {
                            titulo: 'Detalhes',
                            icone: <VisibilityIcon />,
                            emmit: (item) => {
                                this.setState({
                                    openModal: true,
                                    ModalTitle: item.nome,
                                    UsuarioSelecionado: item
                                });
                            }
                        },
                        {
                            titulo: 'Deletar',
                            icone: <DeleteForeverIcon />,
                            iconeColor: 'secondary',
                            emmit: (user: UsuarioDTO) => {
                                this.deleteUser(user);
                            },
                            DialogAction: {
                                title: 'Tem certeza que quer deletar?',
                                type: 'danger'
                            }
                        }
                    ]}
                />

                <ModalFull
                    open={this.state.openModal}
                    close={() => { this.setState({ openModal: false, ModalTitle: '', UsuarioSelecionado: undefined }) }} title={this.state.ModalTitle}>

                    <Form UsuarioSelecionado={this.state.UsuarioSelecionado} success={(user) => {
                        if (this.state.UsuarioSelecionado) {
                            const selecionado = this.state.UsuarioSelecionado;
                            this.setState({
                                openModal: false,
                                Usuarios: this.state.Usuarios.map(u => u.id === selecionado?.id ? ({ ...u, email: user.email, empresa: user.empresa, nome: user.nome }) : u),
                                UsuarioSelecionado: undefined,
                            })
                        } else {
                            this.getUsers();
                            this.setState({
                                openModal: false
                            })
                        }
                    }} />
                </ModalFull>

                <Fab
                    onClick={() => { this.setState({ openModal: true, ModalTitle: 'Novo usuário' }) }}
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

export default (Usuarios)