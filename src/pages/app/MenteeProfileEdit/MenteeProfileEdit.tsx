import React, {useEffect, useState} from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import {useParams} from "react-router-dom";
import {
    MenteeEditFooter,
    MenteeEditSectionAccount,
    MenteeEditSectionNotifications,
    MenteeEditSectionPersonalData, MenteeDTO
} from "./sections/content";
import {Typography} from "@mui/material";

import {getMenteeByUserName, getMenteeProfileById} from "@services/mentee/fetchMenteeServices.service";
import {UserProfileHeader} from "../../../components/_grouped";
import {LangSwitcherConnected} from "../../../components/_connected/lang-switcher/LangSwitcher";

/**
 *
 */
export const MenteeProfileEditPage = () => {
    const {id: menteeId} = useParams();
    const {username: username} = useParams();


    // const [tab, setTab] = useState<ServiceType>("mentoring");
    // const toggleTab = () =>
    //   setTab((s) => (s === "mentoring" ? "session" : "mentoring"));
    // const [loading, setLoading] = useState<boolean>(true);
    // const [optionsMentoring, setOptionsMentoring] = useState<ServiceMentoring[]>(
    //   []
    // );
    // const [optionsSession, setOptionsSession] = useState<ServiceSession[]>([]);
    // const [selectedMentoring, setMentoring] = useState<null | ServiceMentoring>(
    //   null
    // );
    // const [selectedSession, setSession] = useState<null | ServiceSession>(null);
    // const [popupSession, setPopupSession] = useState<null | ServiceSession>(null);
    // const handleSelectMentoring = (opt: ServiceMentoring) => setMentoring(opt);
    // const handleSelectSession = (opt: ServiceSession) => setSession(opt);
    // const handleSubmitMentoring = (opt: ServiceMentoring) => {
    //   console.log("ORDER Mentoring, ", opt);
    // };
    // const handleSubmitSession = (opt: ServiceSession) => {
    //   console.log("ORDER Session, ", opt);
    // };
    // const openPopup = (opt: ServiceSession) => setPopupSession(opt);
    // const closePopup = () => setPopupSession(null);

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

    const [mentee, setMentee] = useState<MenteeDTO | null>(null);

    useEffect(() => {
        getMenteeByUserName(menteeId).then((res) => {
            setMentee(res.data);
        });
    }, [menteeId]);

    if (!mentee) {
        return <div>Loading...</div>; // Możesz dodać tu bardziej zaawansowany komponent ładowania
    }

    return (
        <>
            <UserProfileHeader
                avatarUrl={mentee?.avatarUrl}
                btnText='Zobacz profil'
                btnHref={`/student/${menteeId}`}
                company="Skillguru"
                coverUrl={mentee?.coverUrl}
                fullname={mentee?.firstName + ' ' + mentee?.lastName}
                langSwitcher={<LangSwitcherConnected/>}
                location="Warszawa, Polska (UTC+2)"
                profession="Mentee"
            />

            <Container as={Tag.Section}>
                <MenteeEditSectionPersonalData/>
                <Typography variant='h2' color='secondary' sx={{display: 'block', margin: '48px 0 24px'}}>
                    Ustawienia konta
                </Typography>
                <MenteeEditSectionAccount menteeData={mentee} />
                <MenteeEditSectionNotifications/>
                <MenteeEditFooter/>
            </Container>
        </>
    );
};
