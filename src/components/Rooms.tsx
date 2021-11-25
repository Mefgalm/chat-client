import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { WebSocketContext } from "../websocket/WsClient";

type Room = {
    id: string,
    name: string
}

const RoomsPanel = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    height: '100vh'
});

const Name = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
}));

export default function Rooms() {
    const webClient = React.useContext(WebSocketContext);
    const [rooms, setRooms] = React.useState<Room[]>([]);
    const [roomName, setRoomName] = React.useState<string>("");
    const roomCreated = "roomCreated";
    const roomJoined = "roomJoined";

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

    function onRoomNameChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }

    function onCreateRoom() {
        let createRoom = {
            name: roomName
        }
        webClient.send('CreateRoom', createRoom);
        setRoomName('');
    }

    return (
        <RoomsPanel>
            <div>
                {rooms.map((room) => <Name key={room.id}>{room.name}</Name>)}
            </div>
            <div>
                <TextField value={roomName} onChange={onRoomNameChanged}></TextField>
                <Button onClick={onCreateRoom}>Create</Button>
            </div>
        </RoomsPanel>
    )
}