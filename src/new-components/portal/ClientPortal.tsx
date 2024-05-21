import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};

export const ClientPortal = ({ children, selector, show = true }: ClientPortalInterface) => {
  const ref = useRef<Element | null>(null);
 
  useEffect(() => {
    const x = document.getElementById(selector);

    console.log("EFFECT CLIENT PORTAL", x)
    ref.current = document.getElementById(selector);
  }, [selector]);

  return show && ref.current ? createPortal(children, ref.current) : null;
};
