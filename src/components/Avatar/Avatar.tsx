import React from "react";
import styles from "./Avatar.module.scss";
import clx from "classnames";

type AvatarProps = {
  src: string;
  defaultSrc?: string;
  size?: string;
  alt: string;
  classes?: string;
};
export const Avatar = ({
  src,
  defaultSrc = "images/avatar-default.png",
  size="40px",
  alt,
  classes,
}: AvatarProps) => {
  return (
    <div
      className={clx(styles.avatar, classes)}
      style={{ width: size, height: size }}
    >
      <img alt={alt} src={src || defaultSrc} />
    </div>
  );
};
