import React, { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { WebSocketContext } from "../../websocket/WsClient";
import { styled } from "@mui/system";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Room = {
    id: string,
    name: string
}

const RoomsPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#211634',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    height: '100vh',
}));

const RoomBlock = styled('div')(({ theme }) => ({
    borderRadius: '5%',
    marginLeft: '0',
    backgroundColor: '#4F359B',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}));

const RoomBlockName = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
}));

const RoomsBlock = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    width: '90%',
    padding: '5% 5% 5% 5%',
    '& > * + *': {
        marginTop: '0.7vh'
    }
}));

const RoomControls = styled('div')(({ theme }) => ({
    width: '90%',
    padding: '5% 5% 5% 5%',
    '& > * + *': {
        marginTop: '0.7vh'
    }
}));

export default function Rooms() {
    const roomCreated = "roomCreated";
    const roomJoined = "roomJoined";
    const webClient = React.useContext(WebSocketContext);
    const [rooms, setRooms] = React.useState<Room[]>([]);

    useEffect(() => {
        webClient.addRoomCreatedHandler(roomCreated, e => {
            setRooms((rooms) => [...rooms, { id: e.id, name: e.name }]);
        });
        webClient.addRoomJoinedHandler(roomJoined, e => {
            setRooms((rooms) => [...rooms, { id: e.id, name: e.name }]);
        });
        return () => {
            webClient.removeRoomCreatedHandler(roomCreated);
            webClient.removeRoomJoinedHandler(roomJoined);
        };
    }, [])

    return (
        <RoomsPanel>
            <RoomsBlock>
                {rooms.map((room) =>
                    <RoomBlock key={room.id}>
                        <RoomBlockName>{room.name}</RoomBlockName>
                        <CopyToClipboard text={room.id}>
                            <ContentCopyIcon />
                        </CopyToClipboard>
                    </RoomBlock>)}
            </RoomsBlock>
            <RoomControls>
                <CreateRoom></CreateRoom>
                <JoinRoom></JoinRoom>
            </RoomControls>
        </RoomsPanel>
    )
}