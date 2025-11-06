import type { Preview } from "@storybook/react-vite";

import "../src/tokens/generic/colors.css";
import "../src/tokens/generic/spacing.css";
import "../src/tokens/generic/font.css";
import "../src/tokens/typography.css";

import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fff" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};

export default preview;
