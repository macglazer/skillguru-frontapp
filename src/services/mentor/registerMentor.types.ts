// That's Data Transfer Object
export type RegisterMentorDTO = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptRules: boolean,

    profession: string,
    company: string,
    timezone: number,
    language: string

    personalWebsite: string | null,
    linkedin: string | null,
    twitter: string | null,
    github: string | null,
    dribble: string | null,
    behance: string | null,
};
