import React from "react";

export const NavHotel = ({
  color = "rgb(3 96 240)",
  height = "18",
  width = "18",
}) => {
  return (
    <svg
      enableBackground="new 0 0 24 24"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      focusable="false"
      style={{ fill: color }}
    >
      <g>
        <rect fill="none" height="24" width="24"></rect>
      </g>
      <g>
        <g>
          <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm12-7h-8v8H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"></path>
        </g>
      </g>
    </svg>
  );
};
