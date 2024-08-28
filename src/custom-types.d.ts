declare module '*.module.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module 'react-range-slider-input';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}