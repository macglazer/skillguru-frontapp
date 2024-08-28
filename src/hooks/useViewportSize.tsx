import { useState, useEffect } from 'react';

type ViewportSize = {
  width: number | undefined;
  height: number | undefined;
};

export const useViewportSize = (): ViewportSize => {
  const [size, setSize] = useState<ViewportSize>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  return size;
};
