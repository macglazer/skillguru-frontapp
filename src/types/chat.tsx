export type ChatContactType = {
    id: number, 
    fullName: string, 
    lastMessage: string,
    lastMessageDate: string,
    avatarUrl: string,
    unreadMessages: number,
}

export type ChatMessageType = {
    id: number,
    fromId: number,
    date: string,
    text: string, 
}
