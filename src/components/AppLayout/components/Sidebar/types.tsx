import { FC } from "react"

export type SidebarButtonProps = {
    title: string 
    Icon: FC<{ className?: string }>
    href: string
}
