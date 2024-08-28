export const pathAnchors = {
  loginView: {
      mentor: 'mentor',
      mentee: 'mentee',
  }
};

// Desc: Paths used in React Router
const paths = {
    root: '/',
    authLayout: '/auth',
    login: '/auth/login',
    remindPassword: '/auth/remind-password',
    setNewPassword: '/auth/set-new-password/:userToken',
    passwordResetLinkSent: '/auth/reset-link-sent',
    register: '/register',
    home: '/home',
    settings: '/settings',
    searchMentors: '/search-mentors',
    sessionBook: '/session-book/:id',
    sessionBookPayment: '/session-book/:id/payment',
    schedules: '/schedules',
    schedulesAddSchedule: '/schedules/add-schedule',
    schedulesEditSchedule: '/schedules/edit-schedule/:scheduleId',
    schedulesAddSession: '/schedules/add-session',
    schedulesEditSession: '/schedules/edit-session/:sessionId',
    help: '/help',
    underConstruction: '/underconstruction',
    calendar: '/calendar',
    calendarDaily: '/calendar/:year/:month/:day',
    rescheduleMeeting: '/reschedule-meeting/:meetingId/:sessionId/:mentorId',
    accountView: '/account-view',
    createMentoring: '/create-mentoring',
    createSession: '/create-session',
    reports: '/reports',
    accountSettlements: '/account-settlements',
    messages: '/messages',
    bookSuccess: '/book-success',
    loggedUserProfile: '/logged-user-profile',
    registerMentor: '/register-mentor',
    registerMentee: '/register-mentee',
    mentorProfile: '/mentor/:username',
    mentorProfileEdit: '/edit-mentor/:username',
    studentProfile: '/student/:id',
    studentProfileEdit: '/edit-student/:id',
    chat: '/chat',
    payment: '/payment',
    mentorOfferDetails: '/mentor-offer-details/:id',
    mentorSubscriptions: '/mentor-subscriptions',
    studentSubscriptions: 'mentee-subscriptions',
    mentorshipApplication: '/mentorship/:id/application',
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = typeof paths[PathKey];

export default paths;