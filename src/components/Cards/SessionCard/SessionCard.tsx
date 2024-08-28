// Libraries
import React from 'react'
// Components
import {Title, Text} from 'src/components/typography'
import Button from 'src/components/Button/Button'
// Types
import {TitleTag, TitleVariant} from 'src/components/typography/Title/Title'
// Styles
import styles from './SessionCard.module.scss'

interface SessionCardProps {
    title: string;
    price: number
    time: number
    description: string
}

const SessionCard = (props: SessionCardProps) => {
    const {title, price, time, description} = props

    return (
        <div className={styles.wrapper}>
            <Title tag={TitleTag.h4} variant={TitleVariant.standard} classes={styles.title}>{title} <small>{time} minut
                / {price} zł</small></Title>
            <Text classes={styles.description}>{description}</Text>
            <Button classes={styles.button}>Czytaj więcej</Button>
        </div>
    )
}

export default SessionCard