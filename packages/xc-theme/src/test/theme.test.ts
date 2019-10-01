import { css } from 'styled-components';

import {
  getAppearancePath,
  mergeBaseTheme,
  getThemedState,
  compileAppearanceTheme,
  getStatesTheme,
  getAppearanceTheme,
  getFontStyle,
  getFontObj,
} from '../utils';

import { ITheme, IThemeBase, IAppearance } from '../interfaces';


interface ICustomAppearance extends IAppearance {
  dark: IThemeBase;
}

interface ICustomTheme extends IThemeBase {
  appearance?: ICustomAppearance;
}

interface ICustomThemeNamespace {
  [namespace: string]: ICustomTheme;
}

const namespace = '@xcritical\\xc-theme';

const defaultTheme: ITheme = {
  padding: {
    top: 5,
    right: 10,
    bottom: 5,
    left: 10,
  },
  appearance: {
    default: {
      background: '#fff',
      color: '#000',
      font: {
        weight: 600,
        size: 14,
      },
    },
  },
};

const customTheme: ICustomThemeNamespace = {
  '@xcritical\\xc-theme': {
    padding: {
      top: 0,
      right: 10,
      bottom: 0,
      left: 10,
    },
    width: '100%',
    height: '100%',
    appearance: {
      default: {
        display: 'block',
        color: 'red',
        font: {
          weight: 500,
        },
      },
      dark: {
        background: '#000',
        display: 'block',
        color: 'yellow',
        font: {
          weight: 500,
        },
      },
    },
  },
};

const resultTheme: ICustomTheme = {
  padding: {
    top: 0,
    right: 10,
    bottom: 0,
    left: 10,
  },
  width: '100%',
  height: '100%',
  appearance: {
    default: {
      background: '#fff',
      display: 'block',
      color: 'red',
      font: {
        weight: 500,
        size: 14,
      },
    },
    dark: {
      background: '#000',
      display: 'block',
      color: 'yellow',
      font: {
        weight: 500,
      },
    },
  },
};

const resultDefaultAppearance: IThemeBase = {
  background: '#fff',
  color: 'red',
  font: { weight: 500, size: 14 },
  display: 'block',
};

const resultDarkAppearance: IThemeBase = {
  background: '#000',
  color: 'yellow',
  font: { weight: 500, size: 14 },
  display: 'block',
};

describe('This is the tests for the theme utils', () => {
  test('getAppearancePath(\'default\', \'background\') to equal [\'appearance\', \'default\', \'background\']', () => {
    expect(getAppearancePath('default', 'background')).toEqual(['appearance', 'default', 'background']);
    expect(getAppearancePath('default', ['font', 'weight'])).toEqual(['appearance', 'default', 'font', 'weight']);
  });

  test('mergeBaseTheme checking', () => {
    expect(mergeBaseTheme(namespace, defaultTheme, customTheme)).toEqual(resultTheme);
  });

  test('getThemedState checking', () => {
    const getThemedStateMocked = jest.fn(getThemedState);
    const func = getThemedStateMocked(namespace, defaultTheme);

    expect(getThemedStateMocked).toHaveReturned();
    expect(func).not.toBe(undefined);
    expect(func(customTheme, 'width')).toEqual('100%');
    expect(func(customTheme, null)).toEqual(resultTheme);
    expect(func({}, null)).toEqual(defaultTheme);
    expect(func({}, 'width')).toEqual(undefined);
    expect(func(undefined, 'width')).toEqual(undefined);
  });

  test('compileAppearanceTheme checking', () => {
    expect(compileAppearanceTheme(namespace, defaultTheme, customTheme, 'default', 'default'))
      .toEqual(resultDefaultAppearance);
    expect(compileAppearanceTheme(namespace, defaultTheme, customTheme, 'dark', 'default'))
      .toEqual(resultDarkAppearance);
    expect(compileAppearanceTheme(namespace, {}, {}, 'default', 'default'))
      .toEqual({});
    expect(compileAppearanceTheme(namespace, {}, {}, 'dark', 'default'))
      .toEqual({});
  });

  test('getStatesTheme checking', () => {
    const getStatesThemeMocked = jest.fn(getStatesTheme);
    const withoutDefaultBaseState = getStatesThemeMocked(defaultTheme, 'default');

    expect(getStatesThemeMocked).toHaveReturned();
    expect(withoutDefaultBaseState).not.toBe(undefined);
    expect(withoutDefaultBaseState('display', 'none')).toEqual('none');
    expect(withoutDefaultBaseState(null, 'none')).toEqual({});

    const withDefaultBaseState = getStatesThemeMocked(defaultTheme, 'default', 'selected');
    expect(getStatesThemeMocked).toHaveReturned();
    expect(withDefaultBaseState).not.toBe(undefined);
  });

  test('getAppearanceTheme checking', () => {
    const getAppearanceThemeMocked = jest.fn(getAppearanceTheme);
    const compileAppearanceThemeMocked = jest.fn(compileAppearanceTheme);

    const func = getAppearanceThemeMocked(namespace, defaultTheme);
    const compiledTheme = compileAppearanceThemeMocked(namespace, defaultTheme, customTheme, 'default', 'default');

    expect(getAppearanceThemeMocked).toHaveReturned();
    expect(func).not.toBe(undefined);
    expect(func(customTheme, 'default', 'display', 'default')).toEqual('block');
    expect(func(customTheme, 'default', '', 'default')).toEqual(compiledTheme);
    expect(func(customTheme, 'default', '')).toEqual(compiledTheme);
    expect(func({}, 'default', 'transition')).toEqual(undefined);
  });

  test('getFontStyle checking', () => {
    expect(getFontStyle({ size: 14, weight: 500, lineHeightRatio: 1.69 }))
      .toEqual(css`
        ${`font-weight: ${500}`};
        ${`font-size: ${14}px; line-height: ${14 * 1.69}px;`};
      `);

    expect(getFontStyle({ weight: 500 }))
      .toEqual(css`
        ${`font-weight: ${500}`};
        ${null};
      `);

    expect(getFontStyle({ size: 14, lineHeightRatio: 1.69 }))
      .toEqual(css`
        ${null};
        ${`font-size: ${14}px; line-height: ${14 * 1.69}px;`};
      `);

    expect(getFontStyle({ lineHeightRatio: 1.69 }))
      .toEqual(css`
        ${null};
        ${null};
      `);
  });

  test('getFontObj checking', () => {
    expect(getFontObj({ size: 14, weight: 500, lineHeightRatio: 1.69 }))
      .toEqual({ fontSize: '14px', fontWeight: 500, lineHeight: '23.66px;' });

    expect(getFontObj({ weight: 500 })).toEqual({ fontWeight: 500 });

    expect(getFontObj({ size: 14, lineHeightRatio: 1.69 }))
      .toEqual({ fontSize: '14px', lineHeight: '23.66px;' });

    expect(getFontObj({ size: 14, weight: 500 }))
      .toEqual({ fontSize: '14px', fontWeight: 500, lineHeight: '23.66px;' });

    expect(getFontObj({ lineHeightRatio: 1.69 })).toEqual({});
    expect(getFontObj(undefined)).toEqual({});
  });
});
