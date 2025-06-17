import type { SVGProps } from "react";

export const SquareSharp = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      width="64px"
      height="64px"
      {...props}
    >
      <path fill="currentColor" d="M48 48h416v416H48z"></path>
    </svg>
  );
};
