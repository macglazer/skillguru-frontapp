import React, {useEffect, useMemo, useState} from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import {useNavigate, useParams} from "react-router-dom";
import {MentorContent, MentorLinks, MentorMainWrapper,} from "./components/content";
import {MentorServices, MentorServicesMentoring, MentorServicesSession,} from "./components/sidebar";
import {ServiceMentoring, ServiceSession, ServiceType,} from "@customTypes/order";
import {fetchMentoring} from "src/services/mentor/fetchMentorServices.service";
import styles from "./MentorProfile.module.scss";
import {getMentorByUsername, getMentorProfileByID} from "../../../services/mentorViewService";
import {fetchMentorSession} from "../../../services/SessionService";
import clx from "classnames";
import {useSelector} from "react-redux";
import paths from "../../../paths";
import {MentorData} from "../MentorProfileEdit";
import {UserProfileHeader} from "../../../components/_grouped";
import {MentorLangs} from "../../../components/_grouped/languages/MentorLangs";
import {MentorReviewsConnected} from "../../../components/_connected";

type Props = {
    isLoggedMentor: boolean;
};


export const MentorProfilePage = () => {

    const {username: username} = useParams();


    const [tab, setTab] = useState<ServiceType>("mentoring");
    const [mentorData, setMentorData] = useState<MentorData>({} as MentorData);
    const [pending, setPending] = useState<boolean>(true);

    const useIsMentorLoggedUser = (mentorDat: MentorData) => {
        const userFromRedux = useSelector((state: any) => state.auth.user);

        const mentorIsLoggedUser = useMemo(() => {
            return userFromRedux?.id === mentorData?.userID;
        }, [userFromRedux, mentorData]);

        return mentorIsLoggedUser;
    };
    const mentorIsLoggedUser = useIsMentorLoggedUser(mentorData);

    // @TODO: get user id from sesion/jwt

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
    const navigate = useNavigate();

    const openPopup = (opt: ServiceSession) => setPopupSession(opt);

    const closePopup = () => setPopupSession(null);

    const handleSubmitSession = (opt: ServiceSession) => {
        navigate(paths.sessionBook, {state: opt});
    };

    // TODO do usuniecia ten hook albo ten ponizej, nalezy to ustawic!
    // useEffect(() => {
    //     const run = async () => {
    //         const resp = await fetchMentoring({mentorId: mentorId || ""});
    //         if (resp.success) {
    //             setOptionsMentoring(resp.mentoring);
    //             // setOptionsSession(resp.session);
    //         }
    //         setLoading(false);
    //     };
    //     if (mentorId) {
    //         run();
    //     }
    // }, [mentorId]);

    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         setPending(true);
    //         await getMentorProfileByID(mentorId).then((res) => {
    //             setMentorData(res.data as MentorData);
    //         });
    //         setPending(false);
    //     };
    //     if (mentorId) {
    //         fetchInitialData();
    //     }
    // }, [mentorId]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setPending(false);
            setLoading(false);
            try {
                const mentorResponse = await getMentorByUsername(username);
                const mentorData = mentorResponse.data as MentorData;
                setMentorData(mentorData);

                const mentorId = mentorResponse.data.mentorId;

                if (mentorId) {
                    const [sessionResponse, mentoringResponse] = await Promise.all([
                        fetchMentorSession(mentorId),
                        fetchMentoring({mentorId: mentorId})
                    ]);

                    const formattedSessions = sessionResponse.data.map((elementFromAPI: any) => ({
                        id: elementFromAPI?.id,
                        sessionType: elementFromAPI?.sessionType,
                        sessionPrice: elementFromAPI?.sessionPrice,
                        description: elementFromAPI?.description,
                        meetTime: elementFromAPI?.meetTime,
                        mentorID: mentorId,
                    }));
                    setOptionsSession(formattedSessions);

                    if (mentoringResponse.success) {
                        setOptionsMentoring(mentoringResponse.mentoring);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setPending(false);
                setLoading(false);
            }
        };

        if (username) {
            fetchInitialData();
        }
    }, [username]);

    return loading ? null : (
        <>
            <UserProfileHeader
                avatarUrl={
                    mentorData?.profileImage ||
                    "https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
                }
                btnText={mentorIsLoggedUser ? "Edytuj profil" : ""}
                btnHref={mentorIsLoggedUser ? `/edit-mentor/${mentorData.mentorId}` : ""}
                company={mentorData?.company}
                coverUrl={mentorData?.coverImage || "/images/header-banner-bg.jpg"}
                fullname={mentorData?.firstName + " " + mentorData?.lastName}
                langSwitcher={
                    <MentorLangs
                        langs={[
                            {value: "pl", label: "Polski"},
                            {value: "en", label: "Angielski"},
                            {value: "de", label: "Niemiecki"},
                            {value: "jp", label: "Japonski"},
                        ]}
                    />
                }
                location={mentorData?.timeZone}
                profession={mentorData?.jobPosition}
            />


            <Container as={Tag.Section}>
                <MentorLinks
                    className={clx(styles.onlyMobileFlex, styles.socialLinksMobile)}
                    instagram={mentorData?.instagram ?? "#"}
                    youtube={mentorData?.youtube ?? "#"}
                    linkedin={mentorData?.linkedin ?? "#"}
                    twitter={mentorData?.twitter ?? "#"}
                    facebook={mentorData?.facebook ?? "#"}
                />
                <MentorMainWrapper>
                    <main>
                        <MentorContent
                            title={mentorData?.intro}
                            contentHtml={mentorData?.description}
                            contentExpandable={mentorData?.description?.length > 120}
                            skills={mentorData?.skill}
                            services={mentorData?.services}
                            topics={mentorData?.mentorTopics}
                        />
                        <MentorLinks
                            isDesktop
                            className={styles.onlyDesktopFlex}
                            instagram={mentorData?.instagram ?? "#"}
                            youtube={mentorData?.youtube ?? "#"}
                            linkedin={mentorData?.linkedin ?? "#"}
                            twitter={mentorData?.twitter ?? "#"}
                            facebook={mentorData?.facebook ?? "#"}
                        />
                    </main>
                    <aside>
                        {loading ? (
                            <div>LOADING</div>
                        ) : (
                            <MentorServices activeTab={tab} handleSwitchTab={toggleTab}>
                                {tab === "mentoring" ? (
                                    <MentorServicesMentoring
                                        services={optionsMentoring}
                                        selected={selectedMentoring}
                                        handleSelect={
                                            !mentorIsLoggedUser ? handleSelectMentoring : undefined
                                        }
                                        handleSubmit={
                                            !mentorIsLoggedUser ? handleSubmitMentoring : undefined
                                        }
                                    />
                                ) : null}
                                {tab === "session" &&
                                    optionsSession &&
                                    optionsSession.length > 0 && (
                                        <MentorServicesSession
                                            services={optionsSession}
                                            selected={selectedSession}
                                            handleSelect={
                                                !mentorIsLoggedUser ? handleSelectSession : undefined
                                            }
                                            handleSubmit={
                                                !mentorIsLoggedUser ? handleSubmitSession : undefined
                                            }
                                        />
                                    )}
                            </MentorServices>
                        )}
                    </aside>
                </MentorMainWrapper>
            </Container>

            {mentorData.mentorId ? (
                <Container as={Tag.Section}>
                    <MentorReviewsConnected mentorId={mentorData.mentorId}/>
                </Container>
            ) : null}
        </>
    );
};
