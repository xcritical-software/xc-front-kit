import { dirname, join } from "path";
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const styledComponentsTransformer = createStyledComponentsTransformer();


module.exports = {
    stories: ['../packages/**/stories/*.stories.(ts|tsx)'],

    addons: [
        getAbsolutePath("@storybook/addon-controls"),
        getAbsolutePath("@storybook/addon-actions"),
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("@storybook/addon-backgrounds"),
        getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {}
    },

    webpackFinal: async (config) => {
       
        config.resolve.mainFields = ['xc:source', 'browser', 'module', 'main']
      

        return config;
    },

    typescript: {
        reactDocgen: "react-docgen-typescript",
      },

   
};

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}
