import { IConditionsAll } from './interfaces';


export const conditions: IConditionsAll = {
  String: {
    equalsTo: {
      displayName: 'Equals to',
      hasValue: true,
    },
    startsWith: {
      displayName: 'Starts with',
      hasValue: true,
    },
    endsWith: {
      displayName: 'Ends with',
      hasValue: true,
    },
    contains: {
      displayName: 'Contains',
      hasValue: true,
    },
    isEmpty: {
      displayName: 'Is empty',
      hasValue: false,
    },
    notEqualsTo: {
      displayName: 'Not equalsTo',
      hasValue: true,
    },
    in: {
      displayName: 'In',
      hasValue: true,
    },
    notIn: {
      displayName: 'Not in',
      hasValue: true,
    },
    notEmpty: {
      displayName: 'Not empty',
      hasValue: false,
    },
  },

  Numeric: {
    // числа, везде просто ввод одного числа
    equals: {
      displayName: 'Equals',
      hasValue: true,
    },
    lessThan: {
      displayName: 'Less than',
      hasValue: true,
    },
    lessOrEquals: {
      displayName: 'Less or equals',
      hasValue: true,
    },
    greaterThan: {
      displayName: 'Greater than',
      hasValue: true,
    },
    greaterOrEquals: {
      displayName: 'Greater or equals',
      hasValue: true,
    },
    notEquals: {
      displayName: 'Not equals',
      hasValue: true,
    },
    isEmpty: {
      displayName: 'Is empty',
      hasValue: false,
    },
    in: {
      displayName: 'In',
      hasValue: true,
    },
    notIn: {
      displayName: 'Not in',
      hasValue: true,
    },
    notEmpty: {
      displayName: 'Not empty',
      hasValue: false,
    },
  },
  Currency: {
    // числа, везде просто ввод одного числа
    equals: {
      displayName: 'Equals',
      hasValue: true,
    },
    lessThan: {
      displayName: 'Less than',
      hasValue: true,
    },
    lessOrEquals: {
      displayName: 'Less or equals',
      hasValue: true,
    },
    greaterThan: {
      displayName: 'Greater than',
      hasValue: true,
    },
    greaterOrEquals: {
      displayName: 'Greater or equals',
      hasValue: true,
    },
    notEquals: {
      displayName: 'Not equals',
      hasValue: true,
    },
    isEmpty: {
      displayName: 'Is empty',
      hasValue: false,
    },
    in: {
      displayName: 'In',
      hasValue: true,
    },
    notIn: {
      displayName: 'Not in',
      hasValue: true,
    },
    notEmpty: {
      displayName: 'Not empty',
      hasValue: false,
    },
  },
  Date: {
    lessOrEquals: {
      displayName: 'Less or equals',
      hasValue: true,
    }, // одна дата
    greaterOrEquals: {
      displayName: 'Greater or equals',
      hasValue: true,
    }, // одна дата
    notEquals: {
      displayName: 'Not equals',
      hasValue: true,
    }, // одна дата
    isEmpty: {
      displayName: 'Is empty',
      hasValue: false,
    },
    notEmpty: {
      displayName: 'Not empty',
      hasValue: false,
    },
    last20Minuts: {
      displayName: 'Last 20 minuts',
      hasValue: false,
    },
    today: {
      displayName: 'Today',
      hasValue: false,
    },
    yesterday: {
      displayName: 'Yesterday',
      hasValue: false,
    },
    last7Days: {
      displayName: 'Last 7 days',
      hasValue: false,
    },
    last30Days: {
      displayName: 'Last 30 days',
      hasValue: false,
    },
    last60Days: {
      displayName: 'Last 60 days',
      hasValue: false,
    },
    last90Days: {
      displayName: 'Last 90 days',
      hasValue: false,
    },
    thisMonth: {
      displayName: 'This month',
      hasValue: false,
    },
    lastMonth: {
      displayName: 'Last month',
      hasValue: false,
    },
    last3Months: {
      displayName: 'Last3 months',
      hasValue: false,
    },
    last6Months: {
      displayName: 'Last6 months',
      hasValue: false,
    },
    thisQuater: {
      displayName: 'This quater',
      hasValue: false,
    },
    lastQuater: {
      displayName: 'Last quater',
      hasValue: false,
    },
    thisYear: {
      displayName: 'This year',
      hasValue: false,
    },
    lastYear: {
      displayName: 'Last year',
      hasValue: false,
    },
  },

  Enum: {
    // dictionary selector
    equalsTo: {
      displayName: 'Equals to',
      hasValue: true,
    }, // один вариант
    contains: {
      displayName: 'Contains',
      hasValue: true,
    }, // содержит часть слова
    isEmpty: {
      displayName: 'Is empty',
      hasValue: false,
    },
    notEquals: {
      displayName: 'Not equals',
      hasValue: true,
    }, // один вариант, не равно
    in: {
      displayName: 'In',
      hasValue: true,
    }, // мультиселектор, одно из
    notIn: {
      displayName: 'Not in',
      hasValue: true,
    }, // мультиселектор, не одно из
    notEmpty: {
      displayName: 'Not empty',
      hasValue: false,
    },
  },

  Boolean: {
    // да нет
    equalsTo: {
      displayName: 'Equals to',
      hasValue: true,
    },
  },
};
