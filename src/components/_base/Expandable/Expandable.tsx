import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import AnimateHeight from "react-animate-height";
import clx from "classnames";
import styles from "./Expandable.module.scss";

type Props = {
  children?: ReactNode;
  foldedHeight?: number | "auto";
  isExpanded?: boolean;
  withOverlay?: boolean;
};

export const Expandable = ({ withOverlay, children, foldedHeight = 0, isExpanded }: Props) => {
  const [height, setHeight] = useState<number | "auto">(
    foldedHeight
  );
  const started = useRef<boolean>(false)
 
  useEffect(() => {
    if(started.current && started.current === true){
      setHeight((h) =>
        h === foldedHeight ? "auto" : foldedHeight
      )
      return
    }
    started.current = true
  }, [foldedHeight, isExpanded])

  return (
    <div>
      <AnimateHeight
        id="description"
        duration={500}
        height={height}
        animateOpacity={true}
        contentClassName={clx(styles.Content, {
          [styles.WithOverlay]: withOverlay,
          [styles.ContentExpanded]:
            height !== foldedHeight,
        })}
      >
        {children}
      </AnimateHeight>
    </div>
  );
};
