export const simpleData = [{
  field: 'userName',
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
}, {
  field: 'city',
  displayName: 'City',
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
}, {
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
}, {
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
}, {
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
}];
