import React from 'react';
import {useSelector} from 'react-redux';
// Selectors
import {getRole} from 'src/redux/selectors/authSelectors';
// Components
import NavCard from 'src/components/Cards/NavCard/NavCard';
// Icons
import Calendar from 'src/assets/icons/Calendar';
import Message from 'src/assets/icons/Message';
import Raports from 'src/assets/icons/Raports';
import Meet from 'src/assets/icons/Meet';
import Payment from 'src/assets/icons/Payment';
import Find from 'src/assets/icons/Find';
// Styles
import styles from './NavSection.module.scss';
import paths from "../../../../../paths";
// Assets
import * as icons from '../../icons'

const NavSection = () => {
    const role = useSelector(getRole);

    const navList =
        role === 'S'
            ? [
                {
                    link: paths.calendar,
                    icon: <Calendar/>,
                    title: 'Kalendarz',
                    text: 'Sprawdź swoje zaplanowane spotkania',
                },
                {
                    link: '/search-mentors',
                    icon: <Find/>,
                    title: 'Znajdź mentora',
                    text: 'Skorzystaj z naszej wyszukiwarki mentorów',
                },
                {
                    link: '/reports',
                    icon: <Raports/>,
                    title: 'Raporty',
                    text: 'Zobacz przygotowane przez nas raporty',
                },
                {
                    link: '/chat',
                    icon: <Message/>,
                    title: 'Chat',
                    text: 'Masz 9 oczekujących wiadomości',
                },
            ]
            : [
                {
                    link: paths.calendar,
                    icon: icons.calendarIcon,
                    title: 'Kalendarz',
                    text: 'Sprawdź swoje zaplanowane spotkania',
                },
                {
                    link: '/schedules',
                    icon: icons.meetingsIcon,
                    title: 'Tworzenie spotkań',
                    text: 'Zarządzaj swoimi spotkaniami i ustal swój harmonogram',
                },

                {
                    link: '/chat',
                    icon: icons.chatIcon,
                    title: 'Wiadomości',
                    text: 'Masz 9 oczekujących wiadomości',
                },
                {
                    link: '/payment',
                    icon: icons.paymentsIcon,
                    title: 'Rozliczenia',
                    text: 'Sprawdź swoje rozliczenia',
                },
            ];

    return (
        <section className={styles.wrapper}>
            {navList.map((item) => (
                <NavCard {...item} key={item.link}/>
            ))}
        </section>
    );
};

export default NavSection;
