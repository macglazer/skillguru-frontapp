export type MentoringSessionT = {
    id: string,
    title: string,
    start: Date,
    end: Date,
    meetingLink: string,
    sessionId: string,
    meetingId: string,
    mentorId: string
    participant: {
        mobile: string,
        email: string,
        name: string,
        avatarUrl: string,
    },
};

export type MentoringSessionInListT = MentoringSessionT;

export type MentoringSessionDTO = {
    id: string,
    title: string,
    start: string,
    end: string,
    meetingLink: string,
    sessionId: string,
    meetingId: string,
    mentorId: string
    participant: {
        mobile: string,
        email: string,
        name: string,
        avatar_url: string,
    },
}

export type MentoringSessionInListDTO = MentoringSessionDTO;


