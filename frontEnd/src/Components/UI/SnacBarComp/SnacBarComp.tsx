import { Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AppContext } from 'Appcontext/AppContext';
import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Container } from './styles';
import { showToastModel } from 'Appcontext/Reducers/ToastReducer';

const styles = makeStyles((theme: Theme) => ({
    'success': {
        color: "#fff",
        background: theme.palette.primary.main
    },
    'warning': {
        color: "#fff",
        background: theme.palette.warning.main
    },
    'info': {
        color: "#fff",
        background: theme.palette.info.main
    },
    'danger': {
        color: "#fff",
        background: theme.palette.secondary.main
    }
}));

const SnackBarComp: React.FC = () => {

    const classes = styles();

    const { state, dispatch } = React.useContext(AppContext);

    const [list, setList] = React.useState<Array<{ type: 'success' | 'warning' | 'info' | 'danger', message: string, out: string, id: string }>>([]);

    const [showMsgToRemove, setShowMsgToRemove] = React.useState(false);
    const [count, setCount] = React.useState<{ id: string, count: number }>({ id: "", count: 0 });

    const handleShowMsg = (id: string) => {
        if (count.id === id && count.count === 1) {
            handleRemove(id);
            return;
        }
        setCount({ id, count: count.count + 1 })
        setShowMsgToRemove(true);
        setTimeout(() => {
            setCount({ id: "", count: 0 })
            setShowMsgToRemove(false);
        }, 1500)
    }

    const handleRemove = (id: string) => {
        setList(oldList => oldList.map((item, i) => {
            if (item.id === id) {
                return {
                    ...item,
                    out: 'slide-out-right'
                }
            }
            return item;
        }));
        setTimeout(() => {
            setList(oldList => oldList.filter((item) => item.id !== id));
        }, 1500)
    }

    const dispatchEvent = React.useCallback(() => {
        dispatch(showToastModel('success', ''));
    }, [dispatch]);

    React.useEffect(() => {
        const getNewId = () => String(new Date().getTime());
        if (state.TOAST.message) {
            setList(old => ([...old, {
                message: state.TOAST.message,
                type: state.TOAST.type,
                out: '',
                id: getNewId()
            }]));

            dispatchEvent();
        }

    }, [state.TOAST, dispatchEvent])

    if (!list.length) return null;
    return (
        <>
            <Container>
                <ul>
                    {
                        list.map((item) => (
                            <li key={item.id} onClick={() => handleShowMsg(item.id)}>
                                <Paper className={"custom-toast " + classes[item.type] + ` ${item.out}`}>
                                    <div className="content">
                                        <Typography>{item.message}</Typography>
                                        {
                                            (showMsgToRemove && count.id === item.id) &&
                                            <small>Clique novamente para remover</small>
                                        }
                                    </div>
                                    <div >
                                        <IconButton className="close" onClick={() => handleRemove(item.id)}>
                                            <CloseIcon style={{ color: "#fff" }} />
                                        </IconButton>
                                    </div>
                                </Paper>
                            </li>))
                    }
                </ul>
            </Container>
        </>
    )
}

export default React.memo(SnackBarComp);