import React from "react";

export const NavFlight = ({
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
      <rect fill="none" height="24" width="24"></rect>
      <path d="M3.29,6.56l1.41-1.41l9.55,2.47l3.89-3.89c0.59-0.59,1.53-0.59,2.12,0s0.59,1.53,0,2.12l-3.89,3.89l2.47,9.55l-1.41,1.41 l-4.24-7.78l-3.89,3.89l0.35,2.47L8.6,20.35l-1.77-3.18L3.65,15.4l1.06-1.06l2.47,0.35l3.89-3.89L3.29,6.56z"></path>
    </svg>
  );
};
