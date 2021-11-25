import { Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { MouseEventHandler } from 'react';
import { useNavigate } from "react-router-dom";
import { SetNickname } from '../websocket/Requests';
import { WebSocketContext } from '../websocket/WsClient';

const MyComponent = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});
const PageComponent = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
}));

export function ChatLobby() {
    const webClient = React.useContext(WebSocketContext);
    const [nickname, setNickname] = React.useState<string>("");
    const navigate = useNavigate();

    function onNickname(event: React.ChangeEvent<HTMLInputElement>) {
        setNickname(event.target.value);
    }

    function onSetNicknameClick(_: React.MouseEvent<HTMLElement>) {
        const setNickname: SetNickname = {
            name: nickname
        };
        webClient.send('SetNickname', setNickname);
        navigate("/chat");
    }

    return (
        <PageComponent>
            <MyComponent>
                <TextField label="nickname" variant="outlined" onChange={onNickname} />
                <Button variant="contained" onClick={onSetNicknameClick}>Set</Button>
            </MyComponent>
        </PageComponent>
    );
}