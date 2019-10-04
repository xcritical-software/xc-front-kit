import '@storybook/addon-console';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { withCssResources } from '@storybook/addon-cssresources';

import newViewports from './tools/viewports';

addDecorator(withCssResources);
addDecorator(withA11y);

addParameters({
  a11y: {
    configure: {},
    options: {
      checks: { 'color-contrast': { options: { noScroll: true } } },
      restoreScroll: true,
    },
  },
  options: {
    name: 'XCritical Components',
    url: '#',
    theme: themes.normal,
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...newViewports,
    },
  },
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true  },
    { name: 'light', value: '#eeeeee' },
    { name: 'gray', value: '#cccccc' },
    { name: 'dark', value: '#222222'},
    { name: 'black', value: '#000000' },
  ],
});

function loadStories() {
  const req = require.context('../packages', true, /\.stories\.(ts|tsx)$/);
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
