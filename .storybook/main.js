const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-next",
    "storybook-addon-sass-postcss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      "~": path.resolve(__dirname, "../src"),
      public: path.resolve(__dirname, "../public"),
    };
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
        },
      ],
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: "sass-loader",
          options: {
            additionalData: `
              @import "./src/styles/_color.scss";
              @import "./src/styles/_font.scss";
            `,
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
  staticDirs: ["../public"],
};
