import React from "react";

const shimmerStyle = {
  backgroundColor: "#bfb8b8",
  overflow: "hidden",
  padding: "10px",
  borderBottom: "1px solid #ccc",
};

const shimmerText = {
  height: "1em",
  backgroundColor: "#5e5d5c",
  width: "70%",
  marginTop: "0.5em",
};

export function CourseListFunction() {
  return Array.from(new Array(5)).map((_, index) => (
    <li key={index} style={shimmerStyle}>
      <div style={shimmerText} />
    </li>
  ));
}
