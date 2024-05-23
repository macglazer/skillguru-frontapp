import React, {useEffect, useState} from "react";
import Container from "src/new-components/Container/Container";
import {Tag} from "src/types/tags";
import {useParams} from "react-router-dom";
import {
    MentorEditFooter,
    MentorEditSectionAccount,
    MentorEditSectionLinks,
    MentorEditSectionNotifications,
    MentorEditSectionPersonalData,
    MentorEditSectionProfile
} from "./sections/content";
import {ServiceMentoring, ServiceSession, ServiceType,} from "@customTypes/order";
import {getMentorProfileByID} from "../../../services/MentorViewService";
import {Typography} from "@mui/material";
import {UserProfileHeader} from "@newComponents/_grouped";
import {LangSwitcherConnected} from "@newComponents/_connected/lang-switcher/LangSwitcher";
import {SpecialVariant} from "@customTypes/mentor";
import {DropdownOption} from "@customTypes/dropdownOption";

/**
 *
 */

export interface MentorData {
    avatar_url: string;
    description: string;
    id: string;
    firstName: string;
    lastName: string;
    price: number;
    location: string;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    title: string;
    intro: string;
    jobPosition: string;
    company: string;
    profileImage: string;
    coverImage: string;
    userID: number;
    specialVariant: SpecialVariant;
    services: DropdownOption[];
    skill: DropdownOption[];
    mentorTopics: DropdownOption[];

    mentorCategory: DropdownOption[];
    linkedin: string | null;
    website: string | null;
    youtube: string | null;
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    github: string | null;
    dribble: string | null;
    behance: string | null;
}

export const MentorProfileEditPage = () => {
    const {id: mentorId} = useParams();

    const [tab, setTab] = useState<ServiceType>("mentoring");
    const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);

    const toggleTab = () =>
        setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
    const [loading, setLoading] = useState<boolean>(true);
    const [optionsMentoring, setOptionsMentoring] = useState<ServiceMentoring[]>(
        []
    );
    const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
    const [selectedMentoring, setMentoring] = useState<null | ServiceMentoring>(
        null
    );
    const [selectedSession, setSession] = useState<null | ServiceSession>(null);
    const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
    const handleSelectMentoring = (opt: ServiceMentoring) => setMentoring(opt);
    const handleSelectSession = (opt: ServiceSession) => setSession(opt);
    const handleSubmitMentoring = (opt: ServiceMentoring) => {
        console.log("ORDER Mentoring, ", opt);
    };
    const handleSubmitSession = (opt: ServiceSession) => {
        console.log("ORDER Session, ", opt);
    };
    const openPopup = (opt: ServiceSession) => setPopupSession(opt);
    const closePopup = () => setPopupSession(null);

    // useEffect(() => {
    //     const run = async () => {
    //         const resp = await fetchMentorServices({mentorId: mentorId || ""});
    //         if (resp.success) {
    //             setOptionsMentoring(resp.mentoring);
    //             setOptionsSession(resp.session);
    //         }
    //         setLoading(false);
    //     };
    //     if (mentorId) {
    //         run();
    //     }
    // }, [mentorId]);

    useEffect(() => {
        getMentorProfileByID(mentorId).then((res) => {
            setMentorData(res.data as MentorData)
            console.log('res.data', res.data)
        });
    }, []);

    return (
        <>
            <UserProfileHeader
                avatarUrl={mentorData?.profileImage || 'https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg'}
                btnText='Zobacz profil'
                btnHref={`/mentor/${mentorId}`}
                company={mentorData?.company}
                coverUrl={mentorData?.coverImage}
                fullname={mentorData?.firstName + " " + mentorData?.lastName}
                langSwitcher={<LangSwitcherConnected/>}
                location={mentorData?.location}
                profession={mentorData?.jobPosition}
            />

            <Container as={Tag.Section}>
                <MentorEditSectionPersonalData mentorData={mentorData}/>
                <MentorEditSectionProfile mentorData={mentorData}/>
                <MentorEditSectionLinks mentorData={mentorData}/>
                <Typography variant='h2' color='secondary' sx={{display: 'block', margin: '48px 0 24px'}}>
                    Ustawienia konta
                </Typography>
                <MentorEditSectionAccount/>
                <MentorEditSectionNotifications/>
                <MentorEditFooter/>
            </Container>
        </>
    );
};
