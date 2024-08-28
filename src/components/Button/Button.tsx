// Libraries
import React, { useMemo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
// Types
import { Common } from "../../types/main";
// styles
import styles from "./Button.module.scss";
import { isInternalURL } from "src/utils";

export enum ButtonTag {
  InternalLink = "Link",
  ExternalLink = "a",
  Button = "button",
}

export enum ButtonVariant {
  Primary = "primary",
  PrimaryLight = "primary-light",
  Light = "light",
  Dark = "dark",
  Outline = "outline",
  Danger = "danger",
  DangerText = "danger-text",
  DangerOutline = "danger-outline",
  Transparent = "transparent",
}

interface CommonProps extends Common {
  as?: ButtonTag;
  fullWidth?: boolean;
  href?: string;
  variant?: ButtonVariant;
  disableButton?: boolean;
  size?: "sm" | "md" | "lg";
  fontVariant?: "button-md";
  btnHref?: string;
  noWrap?: boolean;
}
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<
  (CommonProps & ButtonProps) | (CommonProps & AnchorProps)
> = (props) => {
  const {
    fullWidth,
    classes,
    children,
    id,
    href,
    as: customAs,
    variant = ButtonVariant.Primary,
    disableButton,
    size,
    fontVariant,
    btnHref,
    noWrap,
  } = props;

  const as = customAs
    ? customAs
    : href && isInternalURL(href)
      ? ButtonTag.InternalLink
      : href
        ? ButtonTag.ExternalLink
        : ButtonTag.Button;

  const config = useMemo(() => {
    const omitedProps = Object.fromEntries(
      Object.entries(props).filter(
        (e) =>
          e[0] !== "fullWidth" &&
          e[0] !== "classes" &&
          e[0] !== "href" &&
          e[0] !== "children" &&
          e[0] !== "disableButton" &&
          e[0] !== "as"
      )
    );
    return {
      ...omitedProps,
      className: classNames(
        styles.button,
        {
          [styles.buttonFullWidth]: fullWidth,
          [styles.buttonSm]: size === "sm",
          [styles.buttonLg]: size === "lg",
          [styles.FontButtonMd]: fontVariant === "button-md",
          [styles.noWrap]: !!noWrap,
        },
        classes
      ),
      "data-variant": variant,
    };
  }, [props, fullWidth, size, classes, variant, noWrap, fontVariant]);

  // Returned JSX
  switch (as) {
    case ButtonTag.InternalLink:
      const linkConfig = config as any;
      return (
        <Link {...linkConfig} to={href ?? "/"}>
          {children}
        </Link>
      );
    case ButtonTag.ExternalLink:
      const anchorConfig = config as AnchorProps;
      return (
        <a {...anchorConfig} href={href ?? "/"}>
          {children}
        </a>
      );
    default:
      const buttonConfig = config as ButtonProps;
      return (
        <button {...buttonConfig} disabled={disableButton}>
          {children}
        </button>
      );
  }
};

export default Button;
