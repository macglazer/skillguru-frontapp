import {ServiceMentoring, SubscriptionPlan} from "@customTypes/order";
import axios from "axios";

export type OfferStatus = 'in-progress' | 'rejected' | 'accepted' | 'awaiting' | '';

type Plan = {
    id: number
    price: number
    sessionDuration: number
    responseTime: number
    sessionsPerMonth: number
    planIncludes: string[]
    subscriptionVariant: SubscriptionPlan;
}

export type OfferDetails = {
    status: OfferStatus
    rejectionFeedback: string
    service: ServiceMentoring;
    userFullName: string;
    userAvatarUrl: string;
    mainGoals: string[];
    timezone: string;
    location: string;
    aboutStudent: string;
    questionForMentor: string;
};

type Output = {
    offer: OfferDetails
    plan: Plan
}

export const fetchOfferDetails = async (
    offerId: number
): Promise<Output> => {

    const res = await axios.get(`/api/mentorship/fetch-offer/${offerId}`);
    const media = res.data.data;
    // console.log(media.plan)
    console.log(media.offer)

    return {
        offer: {
            status: 'awaiting',
            rejectionFeedback: '',
            service: {
                id: "1",
                title: "Plan pro",
                subtitle: "",
                price: 30000,
                variant: "pro",
                descriptionRows: [
                    "4 sesje mentoringowe na miesiąc (60 minut każda)",
                    "Nieograniczony dostęp do pytań i odpowiedzi",
                    "Odpowiedzi na Twoje pytania w ciągu 24h",
                    "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
                ],
            },
            userFullName: media?.offer?.userFullName,
            userAvatarUrl: media?.offer?.userAvatarUrl,
            mainGoals: [media?.offer.mainGoals,],
            timezone: media?.offer?.timezone,
            location: media?.offer?.location,
            aboutStudent:media?.offer?.aboutStudent,
            questionForMentor: media?.offer?.questionForMentor,
        },
        plan: {
            id: 1,
            price: 300,
            sessionDuration: 60,
            responseTime: 24,
            sessionsPerMonth: 4,
            planIncludes: [
                'Nieograniczony dostęp do pytań i odpowiedzi',
                'Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów',
            ],
            subscriptionVariant: 'pro',
        },
    };
};
//     return {
//         offer: {
//             status: media.offer.status,
//             rejectionFeedback: media.offer.rejectionFeedback,
//             service: {
//                 id: media.offer.service.id,
//                 title: media.offer.service.title,
//                 subtitle: media.offer.service.subtitle,
//                 price: media.offer.service.price,
//                 variant: media.offer.service.variant,
//                 descriptionRows: media.offer.service.descriptionRows,
//             },
//             userFullName: media.offer.userFullName,
//             userAvatarUrl: media.offer.userAvatarUrl,
//             mainGoals: media.offer.mainGoals,
//             timezone: media.offer.timezone,
//             location: media.offer.location,
//             aboutStudent: media.offer.aboutStudent,
//             questionForMentor: media.offer.questionForMentor,
//         },
//         plan: {
//             id: media.plan.id,
//             price: media.plan.price,
//             sessionDuration: media.plan.sessionDuration,
//             responseTime: media.plan.responseTime,
//             sessionsPerMonth: media.plan.sessionsPerMonth,
//             planIncludes: media.plan.planIncludes,
//             subscriptionVariant: media.plan.subscriptionVariant,
//         },
//     };
// };

export const acceptOffer = async (offerId: number): Promise<void> => {
    console.log(`Zaakceptowałeś ofertę o ID: ${offerId}.`);
};

export const rejectOffer = async (offerId: number): Promise<void> => {
    console.log(`Odrzuciłeś ofertę o ID: ${offerId}.`);
};

export const sendRejectionFeedback = async (
    offerId: number,
    reason: string
): Promise<void> => {
    console.log(
        `Feedback dla oferty o ID: ${offerId}. Powód odrzucenia: ${reason}`
    );
    const res = await axios.post(`/api/mentorship/reject/${offerId}`, reason);

};
