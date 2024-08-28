
export type FetchRecommendedMentorsInput = {
    take: number
}

export type FetchRecommendedMentorsOutput = {
    mentors: {
        id: number
        userName: string
        avatarUrl: string
        fullName: string
        profession: string
        skill: string[]
    }[]
}
