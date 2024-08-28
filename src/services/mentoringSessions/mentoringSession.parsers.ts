import {
    MentoringSessionDTO,
    MentoringSessionInListDTO,
    MentoringSessionInListT,
    MentoringSessionT
} from "./mentoringSession.types";

export const parseMentoringSessionForFE = (data: MentoringSessionDTO): MentoringSessionT => {
    return {
        id: data.id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        meetingLink: data.meetingLink,
        sessionId: data.sessionId,
        meetingId: data.meetingId,
        mentorId:  data.mentorId,
        participant: {
            mobile: data.participant.mobile,
            email: data.participant.email,
            name: data.participant.name,
            avatarUrl: data.participant.avatar_url,
        }
    }
}

export const parseMentoringSessionInListForFE = (data: MentoringSessionInListDTO): MentoringSessionInListT => {
    return {
        id: data.id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        meetingLink: data.meetingLink,
        sessionId: data.sessionId,
        meetingId: data.meetingId,
        mentorId:  data.mentorId,
        participant: {
            mobile: data.participant.mobile,
            email: data.participant.email,
            name: data.participant.name,
            avatarUrl: data.participant.avatar_url,
        }
    }
}