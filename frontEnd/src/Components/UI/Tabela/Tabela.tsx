import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import TabelaDialog from './TabelaDialog';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const TableItem = styled.div`
    ${(props: { noWrap: boolean | undefined }) => props.noWrap ? 'white-space: nowrap' : ''};
`;

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
        },
    }),
)(TableRow);

const StyledTableHead = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
)(TableHead);

const StyledTableRowHead = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        minWidth: 700,
        backgroundColor: theme.palette.primary.main
    },
}));

interface IDialogAction {
    btnConfirma?: string,
    btnCancel?: string
    title?: string,
    msgConfirm?: string,
    type: 'danger' | 'success' | 'warnig'
}

interface IHeader {
    Key: number | string
    Value: string | number | Date | JSX.Element
    index?: string | number
    noWrap?: boolean
}

interface IProps {
    isLoading: boolean
    header: IHeader[],
    body: any[],
    action?: Array<{
        DialogAction?: IDialogAction,
        icone: JSX.Element,
        iconeColor?: "inherit" | "default" | "primary" | "secondary" | undefined,
        titulo: string,
        emmit?(value: any): void,
    }>,
}

const Tabela: React.FC<IProps> = ({ header, body, action, isLoading }) => {

    const classes = useStyles();

    const [dialogAction, setDialogAction] = React.useState<IDialogAction | null>(null);
    const [showDialogAction, setShowDialogAction] = React.useState<boolean>(false);
    const [itemSelected, setItemSelected] = React.useState<{ fn: any, item: any }>();

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="TableContainer">
                    <StyledTableHead>
                        <StyledTableRowHead>
                            {
                                header.map((item) => {
                                    return (
                                        <StyledTableCell key={item.Key}>{item.Value}</StyledTableCell>
                                    )
                                })
                            }
                        </StyledTableRowHead>
                    </StyledTableHead>
                    <TableBody>

                        {body.length < 1 &&

                            <StyledTableRow >
                                <StyledTableCell colSpan={12} align="center">
                                    {
                                        isLoading ?
                                            <CircularProgress /> :
                                            <>
                                                <InsertEmoticonIcon />
                                                <br />
                                                Vazio por enquanto.
                                            </>
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        }

                        {body.length > 0 && body.map((row, index) => {

                            return (
                                <StyledTableRow key={index}>

                                    {
                                        header.map((itemHeader) => {
                                            return (
                                                <StyledTableCell key={itemHeader.Key} align="left">
                                                    <TableItem noWrap={itemHeader.noWrap}>
                                                        {row[itemHeader.Key]}
                                                    </TableItem>
                                                </StyledTableCell>
                                            )
                                        })
                                    }

                                    <StyledTableCell align="right">
                                        {
                                            action && action.map((itemAction, index) => {
                                                return (
                                                    <Tooltip key={index} title={itemAction.titulo} style={{ margin: 1 }}>
                                                        <Fab color={itemAction.iconeColor || 'primary'} size="small"
                                                            onClick={() => {
                                                                if (itemAction.DialogAction) {
                                                                    setDialogAction({ ...itemAction.DialogAction })

                                                                    setItemSelected({ fn: itemAction.emmit, item: row });

                                                                    setShowDialogAction(true);

                                                                } else {
                                                                    return itemAction.emmit && itemAction.emmit(row)
                                                                }
                                                            }}>
                                                            {itemAction.icone}
                                                        </Fab>
                                                    </Tooltip>
                                                )
                                            })
                                        }
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {
                (showDialogAction) &&
                <TabelaDialog
                    btnConfirma={dialogAction?.btnConfirma || ''}
                    btnCancel={dialogAction?.btnCancel || ''}
                    title={dialogAction?.title || ''}
                    type={dialogAction?.type || 'success'}
                    msgConfirm={dialogAction?.msgConfirm || ''}
                    open={showDialogAction}
                    cancel={() => setShowDialogAction(false)}
                    confirm={() => { itemSelected?.fn(itemSelected?.item); setShowDialogAction(false); }}
                />
            }
        </>
    );
}

export default React.memo(Tabela);