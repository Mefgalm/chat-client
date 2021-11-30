
export type ResponseType =
    | 'SetNickname'
    | 'Message'
    | 'GetId'
    | 'Online'
    | 'Offline'
    | 'GlobalOnline'
    | 'RoomCreated'
    | 'RoomJoined'
    | 'Error'

export type SetNickname = {
    id: string,
    name: string
}

export type GetId = {
    id: string
}

export type Online = {
    id: string
    name: string
}

export type Offline = {
    id: string
}

export type UserInfo = {
    id: string,
    name: string
}

export type GlobalOnline = {
    users: UserInfo[]
}

export type ReponseError = {
    message: string
}

export type RoomCreated = {
    id: string,
    name: string
}

export type RoomJoined = {
    id: string,
    name: string
}

export type Message = {
    id: string,
    name: string,
    message: string
    createdAt: Date,
}

export type Response = {
    responseType: ResponseType,
    data: string
}