export type RegisterFormInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    acceptRules: boolean,
};

export type AboutFormInput = {
    profession: string,
    company: string,
    timezone: number,
    language: string
};

export type ProfileFormInput = {
    profilePhoto: File[] | null,
    bio: string,
    skills: {label: string, value: string}[],
};

export type PortfolioFormInput = {
    personalWebsite: string,
    linkedin: string,
    twitter: string,
    github: string,
    dribble: string,
    behance: string,
};

export type VerificationFormInput = {
    num1: string,
    num2: string,
    num3: string,
    num4: string,
};

export type RegisterMentorResponse = {
    userId: string,
};

// That's how we use data on FE
export type MergedRegisterMentorFormInput = RegisterFormInput & AboutFormInput & ProfileFormInput & PortfolioFormInput;

export type MergedRegisterMenteeFormInput = RegisterFormInput;

