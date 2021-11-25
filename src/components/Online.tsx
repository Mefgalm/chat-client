import { styled } from "@mui/system";
import React, { useEffect } from "react";
import { UserInfo } from "../websocket/Responses";
import { WebSocketContext } from "../websocket/WsClient";


const Name = styled('div')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
}));

const Users = styled('div')(({ theme }) => ({
    padding: '5px 5px 5px 5px',
    '& > * + *': {
        marginTop: '0.1vh'
    }
}));

export default function Online() {
    const webClient = React.useContext(WebSocketContext);
    const onlineHandler = 'onlineHandler';
    const offlineHandler = 'offlineHandler';
    const globalOnlineHandler = 'globalOnlineHandler';
    const [users, setUsers] = React.useState<UserInfo[]>([]);

    function sortUsers(users: UserInfo[]): UserInfo[] {
        let newUsers = [...users];
        newUsers.sort((a, b) => a.name.localeCompare(b.name));
        return newUsers;
    }

    useEffect(() => {
        webClient.send('Online', {});
        webClient.send('GlobalOnline', {});

        webClient.addOnlineHandler(onlineHandler, e =>
            setUsers(users => sortUsers([...users, {
                id: e.id,
                name: e.name
            }])));
        webClient.addOfflineHandler(offlineHandler, e => {
            setUsers(users => sortUsers(users.filter(u => u.id !== e.id)))
        });
        webClient.addGlobalOnlineHandler(globalOnlineHandler, e => {
            setUsers((_) => sortUsers(e.users))
        })

        return () => {
            webClient.removeOnlineHandler(onlineHandler);
            webClient.removeOfflineHandler(offlineHandler);
            webClient.removeGlobalOnlineHandler(globalOnlineHandler);
        }
    }, [])

    console.log(users);

    return (
        <Users>
            {users.map(u => (<Name key={u.id}>{u.name}</Name>))}
        </Users>
    )
}