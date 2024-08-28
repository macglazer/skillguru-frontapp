import React from "react";
import paths, {PathValue} from "./paths";
import {ReactNode} from "react";
// Libraries
import {Navigate} from "react-router-dom";
// NEW Screens
import HomeScreen from "./pages/app/HomePage/HomePage";
import SearchMentors from "./pages/app/SearchMentors/SearchMentors";
import BookSession from "./pages/app/BookSession/BookSession";
import Schedules from "./pages/app/Schedules/Schedules";
import ScheduleForm from "./pages/app/Schedules/screens/ScheduleForm/ScheduleForm";
import SessionForm from "./pages/app/Schedules/screens/SessionForm/SessionForm";
import RegisterMentorView from "./pages/unauthorized/RegisterMentorView/RegisterMentorView";
import RegisterMenteeView from "./pages/unauthorized/RegisterMenteeView/RegisterMenteeView";
import HelpPage from "./pages/app/HelpPage/HelpPage";
// Screens
import CalendarView from "./pages/app/CalendarView/CalendarView";
import RemindPasswordView from "./pages/unauthorized/RemindPasswordView/RemindPasswordView";
import LoginView from "./pages/unauthorized/LoginView/LoginView";
import PasswordResetLinkSentView from "./pages/unauthorized/PasswordResetLinkSentView/PasswordResetLinkSentView";
import SetNewPasswordView from "./pages/unauthorized/SetNewPasswordView/SetNewPasswordView";
import {LayoutVersion} from "@customTypes/layoutVersion";
import {MentorProfilePage} from "./pages/app/MentorProfile";
import CalendarDailyView from "./pages/app/CalendarDailyView/CalendarDailyView";
import RescheduleMeetingView from "./pages/app/RescheduleMeetingView/RescheduleMeetingView";
import {MentorProfileEditPage} from "./pages/app/MentorProfileEdit";
import {MenteeProfilePage} from './pages/app/MenteeProfile';
import {MenteeProfileEditPage} from './pages/app/MenteeProfileEdit';
import {ChatPage} from './pages/app/Chat';
import {MentorPaymentIntegration} from './pages/app/MentorPaymentIntegration';
import SchedulesView from "./pages/app/Schedules/Schedules";
import { MentorOfferDetails } from "./pages/app/MentorOfferDetails";
import { CreateMentoringOffer } from "./pages/app/CreateMentoringOffer";
import ScheduleScreen from "./pages/app/Schedules/screens/ScheduleForm/ScheduleScreen";
import { MentorSubscriptionsPage, StudentSubscriptionsPage } from "./pages/app/Subscriptions";
import { MentorshipApplicationPage } from "./pages/app/MentorshipApplication";
import {MenteePaymentReports} from "./pages/app/MenteePaymentRaports";

type Route = {
    id: string;
    path: PathValue | string; // TODO remove string when all paths are moved to paths.ts;
    element: ReactNode;
    isProtected?: boolean;
    layoutVersion: LayoutVersion;
};

const routesRaw: Omit<Route, "id">[] = [
    {
        path: paths.studentProfileEdit,
        element: <MenteeProfileEditPage/>,
        layoutVersion: "default",
    },
    {
        path: paths.studentProfile,
        element: <MenteeProfilePage/>,
        layoutVersion: "default",
    },
    {
        path: paths.mentorProfile,
        element: <MentorProfilePage/>,
        isProtected: true,
        layoutVersion: "default",
    },
    {
        path: paths.mentorProfileEdit,
        element: <MentorProfileEditPage/>,
        layoutVersion: "default",
    },
    {
        path: paths.root,
        element: <Navigate to="/home"/>,
        layoutVersion: "none",
    },
    {
        path: paths.authLayout,
        element: <LoginView/>,
        layoutVersion: "auth",
    },
    {
        path: paths.login,
        element: <LoginView/>,
        layoutVersion: "auth",
    },
    {
        path: paths.remindPassword,
        element: <RemindPasswordView/>,
        layoutVersion: "auth",
    },
    {
        path: paths.setNewPassword,
        element: <SetNewPasswordView/>,
        layoutVersion: "auth",
    },
    {
        path: paths.passwordResetLinkSent,
        element: <PasswordResetLinkSentView/>,
        layoutVersion: "auth",
    },
    {
        path: paths.home,
        element: <HomeScreen/>,
        isProtected: true,
        layoutVersion: "default",
    },
    {
        path: paths.searchMentors,
        element: <SearchMentors/>,
        layoutVersion: "default",
        isProtected: false,
    },

    {
        path: paths.sessionBook,
        element: <BookSession/>,
        layoutVersion: "default",
        // layoutVersion: 'simple',
        isProtected: false,
    },
    {
        path: paths.sessionBookPayment,
        element: <BookSession payment/>,
        layoutVersion: "simple",
        isProtected: true,
    },
    {
        path: paths.schedules,
        element: <Schedules/>,
        layoutVersion: "default",
        isProtected: true,
    },
    {
        path: paths.schedulesAddSchedule,
        element: <ScheduleScreen/>,
        layoutVersion: "default",
        isProtected: true,
    },
    {
        path: paths.schedulesEditSchedule,
        element: <ScheduleScreen />,
        layoutVersion: "default",
        isProtected: true,
    },
    {
        path: paths.schedulesAddSession,
        element: <SessionForm/>,
        layoutVersion: "default",
        isProtected: true,
    },
    {
        path: paths.schedulesEditSession,
        element: <SessionForm/>,
        layoutVersion: "default",
        isProtected: true,
    },

    {
        path: paths.calendar,
        element: <CalendarView/>,
        isProtected: true,
        layoutVersion: "default",
    },
    {
        path: paths.calendarDaily,
        element: <CalendarDailyView/>,
        isProtected: true,
        layoutVersion: "default",
    },
    {
        path: paths.rescheduleMeeting,
        element: <RescheduleMeetingView/>,
        isProtected: true,
        layoutVersion: "default",
    },

    {
        path: paths.registerMentor,
        element: <RegisterMentorView/>,
        layoutVersion: "none",
    },
    {
        path: paths.registerMentee,
        element: <RegisterMenteeView/>,
        layoutVersion: "none",
    },
    {
        path: paths.help,
        element: <HelpPage/>,
        layoutVersion: "default",
    },
    {
        path: paths.calendar,
        element: <CalendarView/>,
        isProtected: true,
        layoutVersion: 'default',
    },
    {
        path: paths.calendarDaily,
        element: <CalendarDailyView/>,
        isProtected: true,
        layoutVersion: 'default',
    },
    {
        path: paths.rescheduleMeeting,
        element: <RescheduleMeetingView/>,
        isProtected: true,
        layoutVersion: 'default',
    },

    {
        path: paths.schedules,
        element: <SchedulesView/>,
        isProtected: true,
        layoutVersion: 'none',
    },

    {
        path: paths.registerMentor,
        element: <RegisterMentorView/>,
        layoutVersion: 'none',
    },
    {
        path: paths.registerMentee,
        element: <RegisterMenteeView/>,
        layoutVersion: 'none',
    },
    {
        path: paths.chat,
        element: <ChatPage/>,
        layoutVersion: 'default',
    },
    {
        path: paths.payment,
        element: <MentorPaymentIntegration/>,
        layoutVersion: 'default',
    },
    {
        path: paths.reports,
        element: <MenteePaymentReports/>,
        layoutVersion: 'default',
    },
    {
        path: paths.mentorOfferDetails,
        element: <MentorOfferDetails />,
        layoutVersion: 'default',
    },
    {
        path: paths.createMentoring,
        element: <CreateMentoringOffer />,
        layoutVersion: 'default',
    },
    {
        path: paths.mentorSubscriptions,
        element: <MentorSubscriptionsPage />,
        layoutVersion: 'default',
    },
    {
        path: paths.studentSubscriptions,
        element: <StudentSubscriptionsPage />,
        layoutVersion: 'default',
    },    
    {
        path: paths.mentorshipApplication,
        element: <MentorshipApplicationPage />,
        layoutVersion: 'default',
    },
];

// I'm not sure about purpose of this id, but some of them were duplicated, so I added unique id to each route
const routes = routesRaw.map((route, index) => ({
    ...route,
    id: `route${index}`,
}));

export default routes;
