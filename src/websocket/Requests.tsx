export type RequestType =
    | 'SetNickname'
    | 'Message'
    | 'GetId'
    | 'Online'
    | 'GlobalOnline'
    | 'CreateRoom'
    | 'JoinRoom'

export type SetNickname = {
    name: string
}

export type CreateRoom = {
    name: string
}

export type JoinRoom = {
    id: string
}

export type MessageType =
    | 'User'
    | 'Room'

export type Message = {
    messageType: MessageType,
    receiverId: string,
    message: string
}

export type Request = {
    requestType: RequestType,
    data: string
}
