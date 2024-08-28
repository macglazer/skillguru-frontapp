import React, { useEffect, useState } from "react";
// Container
import Notifications from "../Notifications/Notifications";
// Types
// Styles
import styles from "./Topbar.module.scss";
import { useSelector } from "react-redux";
import { fetchUserImageFile } from "@services/files/files.service";
import { Link } from "react-router-dom";
import Logo from "@icons/Logo";
import { HamburgerButton } from "../../elements";

const TopBar = () => {
  const user = useSelector((state: any) => state.auth?.user);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchUserImageFile(user.id).then((res) => {
      setImage(res?.data);
    });
  }, [user?.id]);

  const userProfileLink =
    user && user.role === "M" ? `/mentor/${user.username}` : "";
  const ProfileLinkTag = userProfileLink ? "a" : "div";

  return (
    <div className={styles.topbar}>
      <div  className={styles.hamFix} >
      <HamburgerButton className={styles.ham} />
      </div>
      <div className={styles.left}>
        <Link to={"/"} className={styles.navbarLogo}>
          <Logo
            color="rgb(37, 43, 97)"
            circleColor="rgb(255, 106, 61)"
            width="108"
            className={styles.navbarLogoIcon}
          />
        </Link>
      </div>
      <div className={styles.right}>
        <ProfileLinkTag className={styles.profile} href={userProfileLink}>
          <div className={styles.profileImage}>
            {image ? (
              <img src={image} alt={user.email} />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2023/04/21/15/42/portrait-7942151_640.jpg"
                alt={user.email}
              />
            )}
          </div>
          <span className={styles.email}>{user.email}</span>
        </ProfileLinkTag>

        <Notifications />

        <HamburgerButton className={styles.hamRight} />
      </div>
    </div>
  );
};

export default TopBar;
