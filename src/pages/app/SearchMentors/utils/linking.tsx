import { Mentor } from "@customTypes/mentor";

export const buildMentorLink = (mentor: Mentor) : string => `/mentor/${mentor.username}`
export const buildAfterRegisterLin = () : string => '/auth/login'
