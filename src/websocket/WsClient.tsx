import React, { useEffect } from "react";
import { Message, ResponseType, SetNickname, Response, GetId, Online, Offline, GlobalOnline, RoomCreated, RoomJoined, ReponseError as ResponseError } from "./Responses";
import { RequestType, Request } from './Requests';
import { Alert } from "@mui/material";
import { ResponseErrorComponent } from "../components/ResponseError";


type WebSocketClient = {
    close: () => void

    addNewMessageHandler: (handlerId: string, handler: ((response: Message) => void)) => void
    removeNewMessageHandler: (handlerId: string) => void

    addSetNicknameHandler: (handlerId: string, handler: ((response: SetNickname) => void)) => void
    removeSetNicknameHandler: (handlerId: string) => void

    addOnlineHandler: (handlerId: string, handler: ((response: Online) => void)) => void
    removeOnlineHandler: (handlerId: string) => void

    addOfflineHandler: (handlerId: string, handler: ((response: Offline) => void)) => void
    removeOfflineHandler: (handlerId: string) => void

    addGetIdHandler: (handlerId: string, handler: ((response: GetId) => void)) => void
    removeGetIdHandler: (handlerId: string) => void

    addGlobalOnlineHandler: (handlerId: string, handler: ((response: GlobalOnline) => void)) => void
    removeGlobalOnlineHandler: (handlerId: string) => void

    addRoomCreatedHandler: (handlerId: string, handler: ((response: RoomCreated) => void)) => void
    removeRoomCreatedHandler: (handlerId: string) => void

    addRoomJoinedHandler: (handlerId: string, handler: ((response: RoomJoined) => void)) => void
    removeRoomJoinedHandler: (handlerId: string) => void

    addErrorHandler: (handlerId: string, handler: ((response: ResponseError) => void)) => void
    removeErrorHandler: (handlerId: string) => void

    send: <T>(messageType: RequestType, data: T) => void
}

const defaultWebSocketClient: WebSocketClient = {
    close: function () {
    },
    addNewMessageHandler: function (handlerId: string, handler: ((msg: Message) => void)) {
    },
    removeNewMessageHandler: function (handlerId: string) {
    },
    send: function <T>(messageType: RequestType, data: T) {
    },
    addSetNicknameHandler: function (handlerId: string, handler: (response: SetNickname) => void): void {
        throw new Error("Function not implemented.");
    },
    removeSetNicknameHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addOnlineHandler: function (handlerId: string, handler: (response: Online) => void): void {
        throw new Error("Function not implemented.");
    },
    removeOnlineHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addOfflineHandler: function (handlerId: string, handler: (response: Offline) => void): void {
        throw new Error("Function not implemented.");
    },
    removeOfflineHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addGetIdHandler: function (handlerId: string, handler: (response: GetId) => void): void {
        throw new Error("Function not implemented.");
    },
    removeGetIdHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addGlobalOnlineHandler: function (handlerId: string, handler: (response: GlobalOnline) => void): void {
        throw new Error("Function not implemented.");
    },
    removeGlobalOnlineHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addRoomCreatedHandler: function (handlerId: string, handler: (response: RoomCreated) => void): void {
        throw new Error("Function not implemented.");
    },
    removeRoomCreatedHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addRoomJoinedHandler: function (handlerId: string, handler: (response: RoomJoined) => void): void {
        throw new Error("Function not implemented.");
    },
    removeRoomJoinedHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    },
    addErrorHandler: function (handlerId: string, handler: (response: ResponseError) => void): void {
        throw new Error("Function not implemented.");
    },
    removeErrorHandler: function (handlerId: string): void {
        throw new Error("Function not implemented.");
    }
}

export const WebSocketContext = React.createContext(defaultWebSocketClient)

export default ({ children }: any) => {
    let socket: WebSocket;
    let onNewMessageHandlers = new Map<string, ((_: Message) => void)>();
    let onNewNicknameHandlers = new Map<string, ((_: SetNickname) => void)>();
    let onGetIdHandlers = new Map<string, ((_: GetId) => void)>();
    let onOnlineHandlers = new Map<string, ((_: Online) => void)>();
    let onOfflineHandlers = new Map<string, ((_: Offline) => void)>();
    let onGlobalOnlineHandlers = new Map<string, ((_: GlobalOnline) => void)>();
    let onRoomCreatedHandlers = new Map<string, ((_: RoomCreated) => void)>();
    let onRoomJoinedHandlers = new Map<string, ((_: RoomJoined) => void)>();
    let onErrorHandlers = new Map<string, ((_: ResponseError) => void)>();

    useEffect(() => {
        socket = new WebSocket('ws://localhost:3012')

        socket.addEventListener('message', onMessage);
        socket.addEventListener('open', onOpen);

        return () => {
            socket.removeEventListener('message', onMessage);
            socket.removeEventListener('open', onOpen);
            socket.close();
        }
    })

    function callHandlers<T>(msg: T, handlers: Map<string, ((msg: T) => void)>) {
        handlers.forEach((fn, _key, _) => {
            fn(msg);
        });
    }

    function onOpen(e: Event) {
        console.log("Websocket connected successfully", e)
    }

    function onMessage(e: MessageEvent<string>) {
        const response: Response = JSON.parse(e.data);
        switch (response.responseType) {
            case 'SetNickname':
                callHandlers<SetNickname>(JSON.parse(response.data), onNewNicknameHandlers);
                break;
            case 'Message':
                callHandlers<Message>(JSON.parse(response.data), onNewMessageHandlers);
                break;
            case 'GetId':
                callHandlers<GetId>(JSON.parse(response.data), onGetIdHandlers);
                break;
            case 'Online':
                callHandlers<Online>(JSON.parse(response.data), onOnlineHandlers);
                break;
            case 'Offline':
                callHandlers<Offline>(JSON.parse(response.data), onOfflineHandlers);
                break;
            case 'GlobalOnline':
                callHandlers<GlobalOnline>(JSON.parse(response.data), onGlobalOnlineHandlers);
                break;
            case 'RoomCreated':
                callHandlers<RoomCreated>(JSON.parse(response.data), onRoomCreatedHandlers);
                break;
            case 'RoomJoined':
                callHandlers<RoomJoined>(JSON.parse(response.data), onRoomJoinedHandlers);
                break;
            case 'Error':
                callHandlers<ResponseError>(JSON.parse(response.data), onErrorHandlers);
                break;
        }
    }

    function send<T>(requestType: RequestType, data: T) {
        let rawMessage: Request = {
            requestType: requestType,
            data: JSON.stringify(data)
        }
        socket.send(JSON.stringify(rawMessage));
    }

    function close() {
        socket.close();
    }

    // Message
    const addNewMessageHandler = (handlerId: string, handler: ((msg: Message) => void)) =>
        onNewMessageHandlers.set(handlerId, handler);

    const removeNewMessageHandler = (handlerId: string) =>
        onNewMessageHandlers.delete(handlerId);

    // Set nickname
    const addSetNicknameHandler = (handlerId: string, handler: ((msg: SetNickname) => void)) =>
        onNewNicknameHandlers.set(handlerId, handler);

    const removeSetNicknameHandler = (handlerId: string) =>
        onNewNicknameHandlers.delete(handlerId);

    // Online
    const addOnlineHandler = (handlerId: string, handler: ((msg: Online) => void)) =>
        onOnlineHandlers.set(handlerId, handler);

    const removeOnlineHandler = (handlerId: string) =>
        onOnlineHandlers.delete(handlerId);

    // Offline
    const addOfflineHandler = (handlerId: string, handler: ((msg: Offline) => void)) =>
        onOfflineHandlers.set(handlerId, handler);

    const removeOfflineHandler = (handlerId: string) =>
        onOfflineHandlers.delete(handlerId);

    // Get Id
    const addGetIdHandler = (handlerId: string, handler: ((msg: GetId) => void)) =>
        onGetIdHandlers.set(handlerId, handler);

    const removeGetIdHandler = (handlerId: string) =>
        onGetIdHandlers.delete(handlerId);

    // Global online
    const addGlobalOnlineHandler = (handlerId: string, handler: ((msg: GlobalOnline) => void)) =>
        onGlobalOnlineHandlers.set(handlerId, handler);

    const removeGlobalOnlineHandler = (handlerId: string) =>
        onGlobalOnlineHandlers.delete(handlerId);


    // RoomCreated
    const addRoomCreatedHandler = (handlerId: string, handler: ((msg: RoomCreated) => void)) =>
        onRoomCreatedHandlers.set(handlerId, handler);

    const removeRoomCreatedHandler = (handlerId: string) =>
        onRoomCreatedHandlers.delete(handlerId);

    // RoomJoined
    const addRoomJoinedHandler = (handlerId: string, handler: ((msg: RoomJoined) => void)) =>
        onRoomJoinedHandlers.set(handlerId, handler);

    const removeRoomJoinedHandler = (handlerId: string) =>
        onRoomJoinedHandlers.delete(handlerId);

    // Error
    const addErrorHandler = (handlerId: string, handler: ((msg: ResponseError) => void)) =>
        onErrorHandlers.set(handlerId, handler);

    const removeErrorHandler = (handlerId: string) =>
        onErrorHandlers.delete(handlerId);

    return (
        <WebSocketContext.Provider value={{
            close,
            addNewMessageHandler,
            removeNewMessageHandler,
            addSetNicknameHandler,
            removeSetNicknameHandler,
            addOnlineHandler,
            removeOnlineHandler,
            addOfflineHandler,
            removeOfflineHandler,
            addGetIdHandler,
            removeGetIdHandler,
            addGlobalOnlineHandler,
            removeGlobalOnlineHandler,
            addRoomCreatedHandler,
            removeRoomCreatedHandler,
            addRoomJoinedHandler,
            removeRoomJoinedHandler,
            addErrorHandler,
            removeErrorHandler,
            send
        }}>
            <ResponseErrorComponent></ResponseErrorComponent>
            {children}
        </WebSocketContext.Provider>);
}