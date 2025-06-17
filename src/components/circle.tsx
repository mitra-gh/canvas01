import type { SVGProps } from "react";

export const Circle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className="shape"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="64px"
      height="64px"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M256 42.667c117.821 0 213.334 95.513 213.334 213.333c0 117.821-95.513 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334C42.667 138.18 138.18 42.667 256 42.667"
      ></path>
    </svg>
  );
};
