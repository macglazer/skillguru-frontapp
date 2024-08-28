import React, { ReactNode } from "react";
import clx from 'classnames'
import styles from './Scrollable.module.scss'

type Props = {
    className?: string
    children?: ReactNode
    minWidth?: string
}

export const Scrollable = ({ className, children, minWidth } : Props) => {
    return (
        <div className={clx(styles.wrapper, className)}>
            <div className={clx(styles.inner)} style={{ minWidth }}>
                {children}
            </div>
        </div>
    )
}
