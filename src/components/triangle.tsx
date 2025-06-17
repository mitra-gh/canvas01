import type { SVGProps } from "react";

export const Triangle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="64px"
      height="64px"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.932 1.248a.5.5 0 0 0-.864 0l-7 12A.5.5 0 0 0 .5 14h14a.5.5 0 0 0 .432-.752z"
      ></path>
    </svg>
  );
};
