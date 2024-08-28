export type FetchSimilarMentorsInput = {
    take: number
}

export type FetchSimilarMentorsOutput = {
    mentors: {
        id: number
        userName: string
        avatarUrl: string
        fullName: string
        profession: string
        skill: string[]
    }[]
}
