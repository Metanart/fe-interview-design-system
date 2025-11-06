import React from "react";
import ReactDOM from "react-dom/client";

import "./tokens/generic/colors.css";
import "./tokens/generic/spacing.css";
import "./tokens/generic/font.css";
import "./tokens/typography.css";

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<React.StrictMode>👋</React.StrictMode>);
