import React from "react";
import ReactDOM from "react-dom/client";

import "./tokens/border-radius.css"
import "./tokens/colors.css"
import "./tokens/font.css"
import "./tokens/spacing.css"
import "./tokens/typography.css"

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(<React.StrictMode>👋</React.StrictMode>);
