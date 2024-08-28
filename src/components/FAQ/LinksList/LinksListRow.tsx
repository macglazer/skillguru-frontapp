import React from "react";
import clx from 'classnames'
import styles from './LinksList.module.scss'

type Props = {
    text?: string 
    className?: string
    href?: string
}

export const LinksListRow = ({ text, className, href } : Props) => {
    return (
        <a className={clx(styles.link, className)} href={href}>
            {text}
        </a>
    )
}
