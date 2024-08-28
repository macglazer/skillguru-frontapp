import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const alias = {
  "src": path.join(path.resolve(__dirname, "../src")),
  "@newComponents": path.join(path.resolve(__dirname, "../src/new-components")),
  "@typography": path.join(
    path.resolve(__dirname, "../src/new-components/typography")
  ),
  "@customTypes": path.join(path.resolve(__dirname, "../src/types")),
  "@icons": path.join(path.resolve(__dirname, "../src/assets/icons")),
  "@images": path.join(path.resolve(__dirname, "../src/assets/img")),
  "@styles": path.join(path.resolve(__dirname, "../src/scss")),
  "@services": path.join(path.resolve(__dirname, "../src/services")),
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config, { configType }) => {
    if (config && config.resolve) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        ...alias,
      };
    }

    return config;
  },
};
export default config;
