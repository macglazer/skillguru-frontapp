import React from 'react';

interface CustomIconProps {
    size?: string;
    className?: string;
    color?: string;
}

export const DribbbleIcon: React.FC<CustomIconProps> = ({
                                                size = "32",
                                                className,
                                                color = "#56658F",
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
            <circle cx="16" cy="16" r="16" fill="#E2E9FC" />
            <g clipPath="url(#clip0_8882_27952)">
                <path
                    d="M16.5 9.49805C20.3672 9.49805 23.4961 12.627 23.4961 16.4883C23.4961 20.3496 20.3672 23.4844 16.5 23.4844C12.6328 23.4844 9.50391 20.3555 9.50391 16.4941C9.50391 12.6328 12.6328 9.49805 16.5 9.49805Z"
                    fill="#8E9ABB"
                />
                <path
                    d="M16.5 23.9824C12.3633 23.9824 9 20.625 9 16.4941C9 12.3574 12.3633 9 16.5 9C20.6367 9 24 12.3574 24 16.4883C24 20.6191 20.6367 23.9824 16.5 23.9824ZM22.8223 17.5137C22.6055 17.4434 20.8418 16.9219 18.832 17.2383C19.6699 19.5352 20.0098 21.4102 20.0742 21.7969C21.5156 20.8301 22.541 19.2949 22.8223 17.5137ZM19.002 22.3887C18.9082 21.8262 18.5332 19.8691 17.6367 17.5371C17.625 17.543 17.6074 17.5488 17.5957 17.5488C13.9805 18.8086 12.6855 21.3105 12.5684 21.5449C13.6523 22.3887 15.0176 22.8926 16.5 22.8926C17.3848 22.8984 18.2344 22.7168 19.002 22.3887ZM11.7422 20.7773C11.8887 20.5312 13.6465 17.625 16.9512 16.5527C17.0332 16.5234 17.1211 16.5 17.2031 16.4766C17.0449 16.1133 16.8691 15.75 16.6816 15.3926C13.4824 16.3477 10.377 16.3066 10.0957 16.3008C10.0957 16.3652 10.0898 16.4297 10.0898 16.4941C10.0957 18.1406 10.7168 19.6406 11.7422 20.7773ZM10.2305 15.1875C10.5176 15.1934 13.1543 15.2051 16.1543 14.4082C15.0937 12.5215 13.9453 10.9395 13.7812 10.7109C11.9824 11.5547 10.6465 13.207 10.2305 15.1875ZM15 10.2773C15.1758 10.5117 16.3418 12.0937 17.3906 14.0215C19.6699 13.166 20.6309 11.877 20.748 11.7129C19.6172 10.7109 18.1289 10.1016 16.5 10.1016C15.9844 10.1016 15.4805 10.166 15 10.2773ZM21.457 12.4512C21.3223 12.6328 20.25 14.0098 17.8828 14.9766C18.0293 15.2812 18.1758 15.5918 18.3105 15.9023C18.3574 16.0137 18.4043 16.125 18.4512 16.2305C20.584 15.9609 22.6992 16.3945 22.9102 16.4355C22.8926 14.9297 22.3535 13.541 21.457 12.4512Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id="clip0_8882_27952">
                    <rect width="15" height="15" fill="white" transform="translate(9 9)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default DribbbleIcon;
