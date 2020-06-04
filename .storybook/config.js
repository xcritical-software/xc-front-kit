import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

addParameters({
  options: {
    name: 'XCritical Components',
    url: '#',
    theme: themes.normal,
  },
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'light', value: '#eeeeee' },
    { name: 'gray', value: '#cccccc' },
    { name: 'dark', value: '#222222' },
    { name: 'black', value: '#000000' },
  ],
});

