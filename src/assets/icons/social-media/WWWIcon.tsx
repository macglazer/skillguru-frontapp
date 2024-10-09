import React from 'react';

interface CustomIconProps {
    size?: string;
    className?: string;
}

export const WWWIcon: React.FC<CustomIconProps> = ({
                                                   size = "32",
                                                   className,
                                               }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="16" cy="16" r="16" fill="currentColor" />
            <g clipPath="url(#clip0_8882_28056)">
                <path
                    d="M12.2528 19.7423C12.3482 20.2693 12.456 20.7959 12.586 21.3179C11.8226 20.8282 11.171 20.1746 10.6788 19.4093C11.2007 19.5402 11.7282 19.6495 12.2528 19.7423Z"
                    fill="#56658F"
                    stroke="#56658F"
                    strokeWidth="0.666667"
                />
                <path
                    d="M19.7556 19.7422C20.2834 19.6493 20.807 19.5397 21.3264 19.4086C20.8323 20.1777 20.1725 20.8337 19.3998 21.3301C19.5394 20.8049 19.6607 20.2755 19.7556 19.7422Z"
                    fill="#56658F"
                    stroke="#56658F"
                    strokeWidth="0.666667"
                />
                <path
                    d="M19.756 12.2467C19.6624 11.7173 19.5446 11.1914 19.4054 10.6719C20.1794 11.1682 20.8372 11.8267 21.3326 12.6012C20.8115 12.4632 20.2865 12.3439 19.756 12.2467Z"
                    fill="#56658F"
                    stroke="#56658F"
                    strokeWidth="0.666667"
                />
                <path
                    d="M12.2581 12.2494C11.7245 12.341 11.195 12.4612 10.67 12.6004C11.1654 11.8291 11.82 11.1703 12.5873 10.6764C12.4574 11.1972 12.3504 11.7217 12.2581 12.2494Z"
                    fill="#56658F"
                    stroke="#56658F"
                    strokeWidth="0.666667"
                />
                <path
                    d="M17.9152 12.0163C16.6408 11.9008 15.3591 11.9008 14.0847 12.0163C14.2345 11.2686 14.4195 10.529 14.6618 9.81455C15.0985 9.72182 15.5414 9.66634 16 9.66634C16.455 9.66634 16.9037 9.72234 17.3385 9.81558C17.5807 10.5354 17.7656 11.2709 17.9152 12.0163Z"
                    fill="#56658F"
                    stroke="#56658F"
                    strokeWidth="0.666667"
                />
                <path
                    d="M12.3934 18.3262C11.4734 18.1595 10.5667 17.9462 9.68671 17.6462C9.63337 17.6329 9.59337 17.6395 9.54004 17.6329C9.41337 17.1062 9.33337 16.5662 9.33337 15.9995C9.33337 15.4395 9.41337 14.8929 9.54004 14.3729C9.59337 14.3662 9.63337 14.3662 9.68671 14.3529C10.5734 14.0595 11.4734 13.8395 12.3934 13.6729C12.2267 15.2195 12.2267 16.7795 12.3934 18.3262Z"
                    fill="#56658F"
                />
                <path
                    d="M22.6667 15.9995C22.6667 16.5662 22.5867 17.1062 22.46 17.6329C22.4067 17.6395 22.3667 17.6329 22.3134 17.6462C21.4267 17.9395 20.52 18.1595 19.6067 18.3262C19.78 16.7795 19.78 15.2195 19.6067 13.6729C20.52 13.8395 21.4334 14.0529 22.3134 14.3529C22.3667 14.3662 22.4067 14.3729 22.46 14.3729C22.5867 14.8995 22.6667 15.4395 22.6667 15.9995Z"
                    fill="#56658F"
                />
                <path
                    d="M18.3267 19.6064C18.16 20.5264 17.9467 21.4331 17.6467 22.3131C17.6333 22.3664 17.6333 22.4064 17.6267 22.4598C17.1067 22.5864 16.56 22.6664 16 22.6664C15.4333 22.6664 14.8933 22.5864 14.3667 22.4598C14.36 22.4064 14.3667 22.3664 14.3533 22.3131C14.06 21.4264 13.84 20.5264 13.6733 19.6064C14.4467 19.6931 15.22 19.7531 16 19.7531C16.78 19.7531 17.56 19.6931 18.3267 19.6064Z"
                    fill="#56658F"
                />
                <path
                    d="M18.5089 18.5086C16.8415 18.7189 15.1586 18.7189 13.4912 18.5086C13.2808 16.8412 13.2808 15.1582 13.4912 13.4908C15.1586 13.2804 16.8415 13.2804 18.5089 13.4908C18.7193 15.1582 18.7193 16.8412 18.5089 18.5086Z"
                    fill="#56658F"
                />
            </g>
            <defs>
                <clipPath id="clip0_8882_28056">
                    <rect width="16" height="16" fill="white" transform="translate(8 8)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default WWWIcon;
