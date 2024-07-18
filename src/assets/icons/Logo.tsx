import React from "react";

const Logo = ({ width = "139", color = "white", circleColor = "#ED734B" }) => {
  return (
    <svg
      width={width}
      viewBox="0 0 673 198"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M589.209 36.6941H615.072V95.9352C615.072 128.429 589.872 154.955 559.367 154.955C528.642 154.955 503.663 128.429 503.663 95.9352V36.9151H529.305V95.9352C529.305 114.282 542.789 129.314 559.367 129.314C575.725 129.314 589.209 114.282 589.209 95.9352V36.6941Z"
        fill={color}
      />
      <path
        d="M462.196 40.894H487.837V150.092C487.837 179.05 467.501 197.839 436.333 197.839C435.007 197.839 433.68 197.839 432.575 197.839V175.292C433.901 175.513 435.228 175.513 436.775 175.513C452.69 175.513 462.196 165.787 462.196 149.429V147.661C453.796 152.966 443.848 156.282 433.459 156.282C402.733 156.282 377.755 129.756 377.755 97.0405C377.755 64.5463 402.733 38.0204 433.459 38.0204C443.848 38.0204 453.796 41.3361 462.196 46.6413V40.894ZM432.575 131.524C449.154 131.524 462.417 116.051 462.417 97.0405C462.417 78.0303 449.154 62.7779 432.575 62.7779C416.217 62.7779 402.954 78.0303 402.954 97.0405C402.954 116.051 416.217 131.524 432.575 131.524Z"
        fill={color}
      />
      <path d="M364.007 154.955H338.586V0H364.007V154.955Z" fill={color} />
      <path d="M319.754 154.955H294.333V0H319.754V154.955Z" fill={color} />
      <path
        d="M262.685 30.0627C254.506 30.0627 247.875 23.2102 247.875 15.0313C247.875 6.85252 254.506 0 262.685 0C270.864 0 277.716 6.85252 277.716 15.0313C277.716 23.2102 270.864 30.0627 262.685 30.0627ZM275.285 154.955H249.864V36.4731H275.285V154.955Z"
        fill={color}
      />
      <path
        d="M241.307 36.4731L188.034 87.3144L234.233 154.955H202.845L169.024 104.998L152.887 120.472V154.955H127.467V0H152.887V88.6407L209.034 36.031L241.307 36.4731Z"
        fill={color}
      />
      <path
        d="M47.5317 91.2932C13.7112 80.4617 0.00615012 67.1988 0.00615012 45.7571C0.00615012 35.5888 4.86923 24.5363 13.2691 16.3575C20.5637 8.84187 34.0477 0.220947 55.7105 0.220947H55.9316C74.0576 0.220947 88.4258 5.74718 98.594 16.7996C111.857 31.3889 112.52 50.3991 112.299 57.2516H86.6574C86.6574 55.4832 87.0995 42.4413 79.3628 34.0415C74.4997 28.7363 66.5419 25.8626 55.9316 25.8626H55.7105C42.8897 25.8626 35.374 30.5047 31.3951 34.4836C27.4162 38.4624 25.6478 43.1045 25.6478 45.7571C25.6478 50.3991 25.6478 57.2516 55.4895 66.9778L60.7946 68.5251C84.4469 76.2618 111.415 84.6617 112.962 108.314C113.183 112.293 113.183 126.44 101.91 138.598C91.7415 149.208 76.4891 154.734 56.5947 154.734H56.3737C40.2371 154.734 26.0899 149.208 15.7006 138.819C5.53237 128.429 -0.214899 114.061 0.00615012 99.2509L25.6478 99.472C25.6478 107.43 28.7425 115.388 34.0477 120.693C39.5739 126.219 47.0896 128.871 56.3737 128.871H56.5947C68.9734 128.871 78.0365 126.219 83.1206 120.914C87.5416 116.051 87.3205 110.303 87.3205 110.082C86.8784 103.893 63.8893 96.5984 52.8369 93.0616L47.5317 91.2932Z"
        fill={color}
      />
      <circle cx="655.731" cy="137.465" r="17.2695" fill={circleColor} />
    </svg>
  );
};

export default Logo;
