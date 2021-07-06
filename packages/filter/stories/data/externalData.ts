import { IFilter } from '../../src/interfaces';
import { DictionarySelector } from '../createValueElement';
import { IDictionary } from '../interfaces';

export const salesStatus: IDictionary[] = [
  {
    value: 3,
    label: 'New',
    order: 1,
  },
  {
    value: 4,
    label: 'Call To Close',
    order: 2,
  },
  {
    value: 13,
    label: 'Free Money Trading',
    order: 3,
  },
  {
    value: 5,
    label: 'High Priority',
    order: 4,
  },
  {
    value: 6,
    label: 'Medium Priority',
    order: 5,
  },
  {
    value: 9,
    label: 'No Response',
    order: 6,
  },
  {
    value: 10,
    label: 'Partially Activated',
    order: 7,
  },
  {
    value: 8,
    label: 'Failed Expectation',
    order: 8,
  },
  {
    value: 11,
    label: 'Fully Activated',
    order: 9,
  },
  {
    value: 7,
    label: 'No Potential',
    order: 10,
  },
  {
    value: 12,
    label: 'Not Valid',
    order: 11,
  },
  {
    value: 498,
    label: 'Unreachable',
    order: 12,
  },
  {
    value: 868,
    label: 'PGX',
    order: 13,
  },
  {
    value: 1671753,
    label: 'Auto Call',
    order: 14,
  },
  {
    value: 1671755,
    label: 'AutoCall Answered',
    order: 16,
  },
];

export const simpleData: IFilter[] = [
  {
    field: 'userName',
    isHidden: true,
    displayName: 'User Name',
    conditions: {
      equalsTo: {
        name: 'Equals to',
        hasValue: true,
      },
      startsWith: {
        name: 'Starts with',
        hasValue: true,
      },
      endsWith: {
        name: 'Ends with',
        hasValue: true,
      },
      contains: {
        name: 'Contains',
        hasValue: true,
      },
      isEmpty: {
        name: 'Is empty',
        hasValue: false,
      },
      notEqualsTo: {
        name: 'Not equalsTo',
        hasValue: true,
      },
      in: {
        name: 'In',
        hasValue: true,
      },
      notIn: {
        name: 'Not in',
        hasValue: true,
      },
      notEmpty: {
        name: 'Not empty',
        hasValue: false,
      },
    },
  },
  {
    field: 'status',
    displayName: 'Sale Status',
    conditions: {
      equalsTo: {
        name: 'Equals to',
        hasValue: true,
      },
      startsWith: {
        name: 'Starts with',
        hasValue: true,
      },
      endsWith: {
        name: 'Ends with',
        hasValue: true,
      },
      contains: {
        name: 'Contains',
        hasValue: true,
      },
    },
    Element: DictionarySelector(salesStatus),
  },
  {
    field: 'country',
    displayName: 'Country',
    conditions: {
      equalsTo: {
        name: 'Equals to',
        hasValue: true,
      },
      startsWith: {
        name: 'Starts with',
        hasValue: true,
      },
      endsWith: {
        name: 'Ends with',
        hasValue: true,
      },
      contains: {
        name: 'Contains',
        hasValue: true,
      },
    },
  },
  {
    field: 'firstName',
    displayName: 'First Name',
    conditions: {
      last7Days: {
        name: 'Last 7 days',
        hasValue: false,
      },
      last30Days: {
        name: 'Last 30 days',
        hasValue: false,
      },
      last60Days: {
        name: 'Last 60 days',
        hasValue: false,
      },
      last90Days: {
        name: 'Last 90 days',
        hasValue: false,
      },
    },
  },
  {
    field: 'lastName',
    displayName: 'Last Name',
    conditions: {
      equalsTo: {
        name: 'Equals to',
        hasValue: true,
      },
      contains: {
        name: 'Contains',
        hasValue: true,
      },
      isEmpty: {
        name: 'Is empty',
        hasValue: false,
      },
      notEquals: {
        name: 'Not equals',
        hasValue: true,
      },
      in: {
        name: 'In',
        hasValue: true,
      },
      notIn: {
        name: 'Not in',
        hasValue: true,
      },
      notEmpty: {
        name: 'Not empty',
        hasValue: false,
      },
    },
  },
];
