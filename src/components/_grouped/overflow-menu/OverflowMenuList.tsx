import React, { CSSProperties, ReactNode } from "react";
import styles from './OverflowMenu.module.scss'
import clx from 'classnames'

type Props = {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

const BTN_HEIGHT_IN_PX = 54
const TOGGLE_HEIGHT_IN_PX = 64

const calculateTopStyles = (childrenCount: number) => {
    const diff = TOGGLE_HEIGHT_IN_PX - (childrenCount * BTN_HEIGHT_IN_PX)
    return { top: `${diff / 2}px`}
}

export const OverflowMenuList = ({ style, children, className } : Props) => {
    const childrenCount = React.Children.count(children);
 
    return (
        <div style={{
            ...calculateTopStyles(childrenCount),
            ...style
        }} className={clx(styles.list, className)}>{children}</div>
    )
} 
