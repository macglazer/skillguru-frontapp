import React from 'react';

type Props = {
    className?: string;
    size?: string;
    filled?: boolean;
    color?: string;
};

const SubscriptionIcon = ({size = "1em", className, color = "currentColor",}: Props) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M15.0335 11.7923C14.6835 12.134 14.4835 12.6256 14.5335 13.1506C14.6085 14.0506 15.4335 14.709 16.3335 14.709H17.9168V15.7006C17.9168 17.4256 16.5085 18.834 14.7835 18.834H5.21683C3.49183 18.834 2.0835 17.4256 2.0835 15.7006V10.0923C2.0835 8.36733 3.49183 6.95898 5.21683 6.95898H14.7835C16.5085 6.95898 17.9168 8.36733 17.9168 10.0923V11.2923H16.2335C15.7668 11.2923 15.3418 11.4756 15.0335 11.7923Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.0835 10.8421V7.03379C2.0835 6.04212 2.69183 5.15875 3.61683 4.80875L10.2335 2.30875C11.2668 1.91708 12.3752 2.68377 12.3752 3.79211V6.95876"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M18.7992 12.142V13.8587C18.7992 14.317 18.4325 14.692 17.9658 14.7086H16.3325C15.4325 14.7086 14.6075 14.0503 14.5325 13.1503C14.4825 12.6253 14.6825 12.1336 15.0325 11.792C15.3408 11.4753 15.7658 11.292 16.2325 11.292H17.9658C18.4325 11.3087 18.7992 11.6836 18.7992 12.142Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.8335 10.5H11.6668"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default SubscriptionIcon;
