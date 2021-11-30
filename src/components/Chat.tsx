import { Button, Grid, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import React from "react";
import { WebSocketContext } from "../websocket/WsClient";
import { Message, SetNickname } from "../websocket/Responses";
import { Message as MessageComponent } from "./Message";
import { styled } from "@mui/system";
import Online from "./Online";
import Rooms from "./rooms/Rooms";

const MessagesComponent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'start',
    height: '92.7vh',
    overflowY: 'auto',
    '& > * + *': {
        marginTop: '0.5vh'
    }
}));

const InputComponent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: '7.3vh',
}));

const ChatPanel = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'row',
}))

export function Chat() {
    const webClient = React.useContext(WebSocketContext);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const chatNewMessageHandler = 'chat_new_message';
    const chatNewNicknameHandler = 'chat_new_nickname';
    const getIdHandler = 'getIdHandler';
    const [ownerId, setOwnerId] = useState<string>('');
    const [lastMessage, setLastMessage] = useState<HTMLDivElement | null>(null);

    function onNewNickname(e: SetNickname) {
        console.log(e);
    }

    useEffect(() => {
        webClient.addNewMessageHandler(chatNewMessageHandler, e => {
            setMessages((msgs) => [...msgs, e]);
        });
        webClient.addGetIdHandler(getIdHandler, e => {
            console.log(e);
            setOwnerId(e.id)
        });
        webClient.send('GetId', {});
        return () => {
            webClient.removeNewMessageHandler(chatNewMessageHandler);
            webClient.removeGetIdHandler(getIdHandler);
        };
    }, [])

    const scrollToBottom = () => {
        lastMessage?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    function onMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
    }

    function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        let msgMessageSent = {
            message: message
        }
        webClient.send('Message', msgMessageSent);
        setMessage('');
    }

    return (        
        <Grid sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'row',
        }} container>
            <Grid sx={{ backgroundColor: '#211634' }} item xs={1}>
                <Rooms></Rooms>
            </Grid>
            <Grid item xs={10}>
                <MessagesComponent>
                    {messages.map((m, i) =>
                        <MessageComponent key={i} message={m} ownerId={ownerId}></MessageComponent>
                    )}
                    <div ref={setLastMessage} />
                </MessagesComponent>

                <InputComponent>
                    <TextField
                        sx={{ width: '100%', height: '100%' }}
                        value={message}
                        label="Write a message..."
                        variant="outlined"
                        onChange={onMessageChange}
                        onKeyPress={onKeyPress} />

                    <Button variant="contained" onClick={sendMessage} endIcon={<SendIcon />}>
                    </Button>
                </InputComponent>
            </Grid>
            <Grid sx={{ backgroundColor: '#211634' }} item xs={1}>
                <Online />
            </Grid>
        </Grid>
    )
}