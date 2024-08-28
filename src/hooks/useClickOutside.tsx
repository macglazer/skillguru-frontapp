import { useEffect, RefObject } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  onClickOutside: (e: MouseEvent | TouchEvent) => void,
  secondRef?: RefObject<HTMLElement>,
) {
  useEffect(() => {
    const isOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      
      const isRef = !!ref.current && ref.current.contains(target)
      const isRef2 = !!secondRef && !!secondRef.current && secondRef.current.contains(target)

      if( !isRef && !isRef2 ){
        return true
      }

      return false;
    };

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      if (isOutside(e)) {
        onClickOutside(e);
      }
    };

    if(document){
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("touchstart", onMouseDown);

      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("touchstart", onMouseDown);
      }
    }
  }, [onClickOutside, ref])
}
