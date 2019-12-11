import { IConditionsAll } from './interfaces';


export const conditions: IConditionsAll = {
  String: {
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

  Numeric: {
    equals: {
      name: 'Equals',
      hasValue: true,
    },
    lessThan: {
      name: 'Less than',
      hasValue: true,
    },
    lessOrEquals: {
      name: 'Less or equals',
      hasValue: true,
    },
    greaterThan: {
      name: 'Greater than',
      hasValue: true,
    },
    greaterOrEquals: {
      name: 'Greater or equals',
      hasValue: true,
    },
    notEquals: {
      name: 'Not equals',
      hasValue: true,
    },
    isEmpty: {
      name: 'Is empty',
      hasValue: false,
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
  Currency: {
    equals: {
      name: 'Equals',
      hasValue: true,
    },
    lessThan: {
      name: 'Less than',
      hasValue: true,
    },
    lessOrEquals: {
      name: 'Less or equals',
      hasValue: true,
    },
    greaterThan: {
      name: 'Greater than',
      hasValue: true,
    },
    greaterOrEquals: {
      name: 'Greater or equals',
      hasValue: true,
    },
    notEquals: {
      name: 'Not equals',
      hasValue: true,
    },
    isEmpty: {
      name: 'Is empty',
      hasValue: false,
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
  Date: {
    lessOrEquals: {
      name: 'Less or equals',
      hasValue: true,
    },
    greaterOrEquals: {
      name: 'Greater or equals',
      hasValue: true,
    },
    notEquals: {
      name: 'Not equals',
      hasValue: true,
    },
    isEmpty: {
      name: 'Is empty',
      hasValue: false,
    },
    notEmpty: {
      name: 'Not empty',
      hasValue: false,
    },
    last20Minuts: {
      name: 'Last 20 minuts',
      hasValue: false,
    },
    today: {
      name: 'Today',
      hasValue: false,
    },
    yesterday: {
      name: 'Yesterday',
      hasValue: false,
    },
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
    thisMonth: {
      name: 'This month',
      hasValue: false,
    },
    lastMonth: {
      name: 'Last month',
      hasValue: false,
    },
    last3Months: {
      name: 'Last3 months',
      hasValue: false,
    },
    last6Months: {
      name: 'Last6 months',
      hasValue: false,
    },
    thisQuater: {
      name: 'This quater',
      hasValue: false,
    },
    lastQuater: {
      name: 'Last quater',
      hasValue: false,
    },
    thisYear: {
      name: 'This year',
      hasValue: false,
    },
    lastYear: {
      name: 'Last year',
      hasValue: false,
    },
  },

  Enum: {
    // dictionary selector
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

  Boolean: {
    equalsTo: {
      name: 'Equals to',
      hasValue: true,
    },
  },
};
