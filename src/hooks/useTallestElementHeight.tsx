import { useEffect, useState } from "react";

export const useTallestElementHeight = (
  cb: (h: number) => void,
  dependencies: any[]
) => {
  const [elementRefs, setElementRefs] = useState<HTMLDivElement[]>([]);
  const addToRefs = (element: HTMLDivElement) => {
    if (element && !elementRefs.includes(element)) {
      setElementRefs((prevRefs) => [...prevRefs, element]);
    }
  };

  useEffect(() => {
    const checkTallest = () => {
      let maxHeight = 0;

      elementRefs.forEach((ref, index) => {
        if (ref) {
          const height = ref.getBoundingClientRect().height;
          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      });
      cb(maxHeight);
    };

    checkTallest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRefs, cb, ...dependencies]);

  return { addToRefs };
};
