import React, {useEffect, useState} from 'react';
import AppLayout from '../../../component/AppLayout';
import {getLoggedProfileByEmail,} from '../../../services/UserProfileService';
import {useSelector} from "react-redux";

const PLACEHOLDER_USER = {
    firstName: '',
    jobRole: '',
    description:
        'Ekspert ds. wzrostu organicznego i płatnego z ponad 10-letnim doświadczeniem w agencjach i firmach w marketingu cyfrowym.',
    industry: 'D4 Cloud',
};

const LoggedProfileScreen = () => {

    // const {user} = useContext(AuthContext);
    const userFromRedux = useSelector((state) => state.auth.user);
    const [user, setUser] = useState(null);

    const userData = ({
        email: userFromRedux.email,
        role: userFromRedux?.role
    })

    useEffect(() => {
        getLoggedProfileByEmail(userData).then((res) => {
            setUser(res.data);
        });
    }, []);


    return (
        <AppLayout>
            <div className='user-profile__grid'>
                <section className='user-profile__data'>
                    <div className='user-profile__data-photo'>
                        <img
                            src='https://cdn.pixabay.com/photo/2021/12/22/01/40/male-6886494_960_720.jpg'
                            alt='profile'
                        />
                    </div>
                </section>
                <section className='user-profile__data-info'>
                    <h3 className='info__name'>{user?.firstName}</h3>
                    <h4 className='info__lastName'>{user?.lastName}</h4>
                    <h4 className='info__job_position'>{user?.jobPosition}</h4>
                </section>
                <section className='user-profile__about'>
                    <article className='app-section'>
                        <h3 className='app-section__title'>O mnie</h3>
                        <p className='app__text text-left'>
                            {user?.description}
                        </p>
                    </article>
                    <article className='app-section'>
                        <h3 className='app-section__title'>Moje branże</h3>
                        <ul className='app-list'>
                            <li className='app-list__item'>IT</li>
                            <li className='app-list__item'>BIZNES</li>
                            <li className='app-list__item'>MARKETING</li>
                            <li className='app-list__item'>FINTECH</li>
                        </ul>
                    </article>
                    <article className='app-section'>
                        <h3 className='app-section__title'>Moja zainteresowania</h3>
                        <ul className='app-list'>
                            <li className='app-list__item'>Software development</li>
                            <li className='app-list__item'>Scrum</li>
                            <li className='app-list__item'>Zarządzanie</li>
                            <li className='app-list__item'>IT</li>
                            <li className='app-list__item'>Nowe technologie</li>
                            <li className='app-list__item'>Biznes</li>
                            <li className='app-list__item'>Motywacja</li>
                        </ul>
                    </article>
                </section>
            </div>
        </AppLayout>
    );
};

export default LoggedProfileScreen;
