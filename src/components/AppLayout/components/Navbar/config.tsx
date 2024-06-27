// Libraries
import React, { ReactNode } from "react";
import Doc from "../../../../assets/icons/Doc";
import Home from "../../../../assets/icons/Home";
import Settings from "../../../../assets/icons/Settings";
import CreateSchedules from "../../../../assets/icons/CreateSchedules";
import { ReactComponent as CalendarIcon } from "../../../../assets/icons/svg/calendar.svg";
import paths from "../../../../paths";
import { DollarCircleIcon } from "@icons/DollarCircleIcon";

export type Visibility = "student" | "mentor" | "authenticated" | "all";

export type MenuItemType = {
  id: string;
  label: string;
  link: string;
  icon: ReactNode;
  visibility: Visibility;
};

type Props = {
  username: string;
  role: "M" | "S" | "";
};

export const getMenuItems = ({ username, role }: Props): MenuItemType[] => {
  return [
    {
      id: "home",
      label: "Strona główna",
      link: "/home",
      icon: <Home />,
      visibility: "all",
    },
    {
      id: "calendar",
      label: "Kalendarz",
      link: paths.calendar,
      icon: <CalendarIcon />,
      visibility: "authenticated",
    },
    {
      id: "profile",
      label: "Profil",
      link: `/student/${username}`,
      icon: <Doc />,
      visibility: "student",
    },
    {
      id: "profile",
      label: "Profil",
      link: `/mentor/${username}`,
      icon: <Doc />,
      visibility: "mentor",
    },
    {
      id: "schedules",
      label: "Tworzenie spotkań",
      link: "/schedules",
      icon: <CreateSchedules />,
      visibility: "mentor",
    },
    {
      id: "settings",
      label: "Ustawienia",
      link: `/edit-mentor/${username}`,
      icon: <Settings />,
      visibility: "mentor",
    },
    {
      id: "settings",
      label: "Ustawienia",
      link: `/edit-student/${username}`,
      icon: <Settings />,
      visibility: "student",
    },
    {
      id: "payments",
      label: "Płatności",
      link: `/payment`,
      icon: <DollarCircleIcon />,
      visibility: "mentor",
    },
    {
      id: "payments",
      label: "Płatności",
      link: `/payment/${username}`,
      icon: <DollarCircleIcon />,
      visibility: "student",
    },
  ].filter((item) => {
    if (
      item.visibility === "all" ||
      (item.visibility === "authenticated" && !!role) ||
      (item.visibility === "mentor" && role === "M") ||
      (item.visibility === "student" && role === "S")
    ) {
      return true;
    }
    return false;
  }) as MenuItemType[];
};