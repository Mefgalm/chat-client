import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { WebSocketContext } from '../../websocket/WsClient';
import AddIcon from '@mui/icons-material/Add';
import { styled, width } from "@mui/system";

const CreateRoomBlock = styled('div')(({ theme }) => ({
    borderRadius: '5%',
    backgroundColor: '#4F359B',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: '#21A179'
    }
}));

const RoomAction = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
}));


export function CreateRoom() {
    const webClient = React.useContext(WebSocketContext);
    const [open, setOpen] = React.useState(false);
    const [roomName, setRoomName] = React.useState<string>("");

    console.log(open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function onRoomNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }

    function onCreateRoom() {
        let createRoom = {
            name: roomName
        }
        webClient.send('CreateRoom', createRoom);
        setOpen(false);
        setRoomName('');
    }

    return (
        <div>
            <CreateRoomBlock onClick={handleClickOpen}>
                <RoomAction>Create</RoomAction>
            </CreateRoomBlock>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Room name"
                        onChange={onRoomNameChanged}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCreateRoom}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}