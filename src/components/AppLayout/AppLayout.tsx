// Libraries
import React, { useEffect, useRef } from "react";
// Components
import TopBar from "./components/Topbar/TopBar";
// Types
import { Common } from "../../types/main";
// Styles
import styles from "./AppLayout.module.scss";
import { Sidebar } from "./components/Sidebar/Sidebar";
import clx from "classnames";
import { useLayoutReducer } from "src/reducers/layout";
import { useViewportSize } from "src/hooks/useViewportSize";

const AppLayout = (props: Common) => {
  const { children } = props;
  const { layoutState, handleOpen, handleClose } = useLayoutReducer()
  const { width } = useViewportSize()
  const widthRef = useRef<number>(0)

  useEffect(() => {
    if(width && widthRef.current !== width){
      if(width > 1200){
        handleOpen()
      } else {
        handleClose()
      }     
      widthRef.current = width
    }
  }, [width, handleOpen, handleClose])

  return (
    <div data-sidebar-open={layoutState.isSidebarOpen ? "1" : "0"}>
      <TopBar />
      <Sidebar />
      <div
        className={clx(styles.content, {
          [styles.isSidebarOpen]: layoutState.isSidebarOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
