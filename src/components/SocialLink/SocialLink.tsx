// Libraries
import React, {useMemo} from 'react';
// Icons
import LinkedIn from 'src/assets/icons/social-media/LinkedIn';
import Instagram from 'src/assets/icons/social-media/Instagram';
import Website from 'src/assets/icons/social-media/Website';
import YouTube from 'src/assets/icons/social-media/YouTube';
import Source from 'src/assets/icons/Source';
// Styles
import styles from './SocialLink.module.scss';

interface SocialLinkProps {
    link: string;
    type:
        | 'linkedin'
        | 'youtube'
        | 'instagram'
        | 'facebook'
        | 'website'
        | 'youtube'
        | 'twitter'
        | 'behance'
        | 'dribble';
}

const SocialLink = (props: SocialLinkProps) => {
    const {link, type} = props;

    const icon = useMemo(() => {
        switch (type) {
            case 'linkedin':
                return <LinkedIn/>;
            case 'instagram':
                return <Instagram/>;
            case 'youtube':
            case 'youtube':
                return <YouTube/>;
            default:
                return <Website/>;
        }
    }, [type]);

    const text = useMemo(() => {
        switch (type) {
            case 'linkedin':
                return 'Linkedin';
            case 'instagram':
                return 'Instagram';
            case 'youtube':
            case 'youtube':
                return 'youtube';
            default:
                return 'Strona www';
        }
    }, [type]);

    return (
        <a href={link} target='_blank' rel='noreferrer' className={styles.link}>
			<span className={styles.title}>
				{icon} {text}
			</span>
            <span className={styles.source}>
				{link.slice(0, 19)}
                {link.length > 19 && '...'} <Source/>
			</span>
        </a>
    );
};

export default SocialLink;
