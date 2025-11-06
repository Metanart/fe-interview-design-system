import type { Preview } from "@storybook/react-vite";

import "../src/tokens/border-radius.css"
import "../src/tokens/colors.css"
import "../src/tokens/font.css"
import "../src/tokens/spacing.css"
import "../src/tokens/typography.css"

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
