const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();
module.exports = {
    stories: ['../packages/**/*.stories.(ts|tsx)'],
    addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-docs', '@storybook/addon-backgrounds'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve('ts-loader'),
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                    },
                },
            ],
        });

        config.resolve.extensions.push('.ts', '.tsx');

        return config;
    },
};
