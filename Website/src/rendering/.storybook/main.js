const path = require('path')
const storybookDotenv = require('dotenv').config({
	path: path.resolve(__dirname, '.env.storybook'),
});

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-breakpoints"
  ],
  webpackFinal: async (config) => {
    // ----------------------------------------
		// Manually inject environment variables
		// Note that otherwise, only `STORYBOOK_*` prefix env vars are supported
		// Ref: https://github.com/storybookjs/storybook/issues/12270

		const envVarsToInject = storybookDotenv.parsed;
		const hasEnvVarsToInject =
			envVarsToInject && Object.keys(envVarsToInject).length > 0;

		if (hasEnvVarsToInject) {
			const definePlugin = config.plugins.find(
				(plgn) => plgn.definitions && plgn.definitions['process.env'],
			);

			if (definePlugin) {
				Object.keys(envVarsToInject).forEach((key) => {
					definePlugin.definitions['process.env'][key] = JSON.stringify(
						envVarsToInject[key],
					);
				});
			}
		}
		// ----------------------------------------
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss/nesting'),
              require('postcss-sassy-mixins'),
              require('tailwindcss'),
              require('autoprefixer')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })
    return config
  }
}