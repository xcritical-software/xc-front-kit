const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {
    stories: ['../packages/**/*.stories.(ts|tsx)'],
    addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-docs', '@storybook/addon-backgrounds'],
    framework: '@storybook/react',
    webpackFinal: async (config) => {
       
        config.resolve.mainFields = ['xc:source', 'browser', 'module', 'main']
      

        return config;
    },
};
