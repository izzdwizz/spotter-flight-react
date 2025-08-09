import React from "react";

export const NavVacation = ({
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
        <g>
          <rect fill="none" height="24" width="24"></rect>
        </g>
      </g>
      <g>
        <g>
          <g>
            <path d="M19,9.3V4h-3v2.6L12,3L2,12h3v8h5v-6h4v6h5v-8h3L19,9.3z M10,10c0-1.1,0.9-2,2-2s2,0.9,2,2H10z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
