// @ts-check
import { addParameters, configure } from "@storybook/react";

// automatically import all files ending in *.stories.js
const req = require.context("../src/stories", true, /\.stories\.tsx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addParameters({
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: "black" },
    // Override the default light theme
    light: { ...themes.normal, appBg: "red" },
  },
});
