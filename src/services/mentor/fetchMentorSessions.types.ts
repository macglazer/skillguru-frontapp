export type FetchMentorSessionsInput = {
    sortBy: 'status'
    sortMethod: 'ASC'|'DESC'
    skip: number 
    take: number
}

export type SessionStatus = 'in-progress'|'planned'|'cancelled'

export type FetchMentorSessionsOutput = {
    total: number
    mentee: {
        id: number
        username: string
        avatarUrl: string
        fullName: string
        date: string
        status: SessionStatus
        serviceType: 'session'|'mentoring'
        serviceName: string
    }[]
}
