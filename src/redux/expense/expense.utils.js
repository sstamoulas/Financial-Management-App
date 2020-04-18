export const defaultTable = (tableName) => {
  if(tableName.value) {
    return {
        expenses: [],
    };
  }
  else {
    return defaultData;
  }
}

export const generateTotal = (items, label) => {
  return !!items.length ? items.reduce(
    (accumulator, item) => {
      let num = parseFloat(item[label]);
      if(isNaN(num)) {
        num = 0;
      }

      return accumulator + parseFloat(num);
    }, 0) : 0;
}

export const updateArray = (arrayItems, index, value, label) => {
  if(label !== "name" && label !== "date") {
    if(isNaN(value)) {
      arrayItems[index][label] = 0;
    }
    else {
      arrayItems[index][label] = value;
    }
  }
  else {
    arrayItems[index][label] = value;
  }
}

export const months = [
  { value: 0, label: 'January'},
  { value: 1, label: 'February'},
  { value: 2, label: 'March'},
  { value: 3, label: 'April'},
  { value: 4, label: 'May'},
  { value: 5, label: 'June'},
  { value: 6, label: 'July'},
  { value: 7, label: 'August'},
  { value: 8, label: 'September'},
  { value: 9, label: 'October'},
  { value: 10, label: 'November'},
  { value: 11, label: 'December'},
];

export const years = [
  { value: 2020, label: 2020 },
  { value: 2019, label: 2019 },
  { value: 2018, label: 2018 },
  { value: 2017, label: 2017 },
];

export const tables = [
  { value: 0, label: 'Overview'},
  { value: 1, label: 'Extra Expense'},
  { value: 2, label: 'Ibrahim Expense'},
  { value: 3, label: 'Baby Expense'},
  { value: 4, label: 'Monthly Shopping Expense'},
  { value: 5, label: 'Food Week 1 Expense'},
  { value: 6, label: 'Food Week 2 Expense'},
  { value: 7, label: 'Food Week 3 Expense'},
  { value: 8, label: 'Food Week 4 Expense'},
  { value: 9, label: 'Eating Out Expense'},
  { value: 10, label: 'Car Gas Expense'},
  { value: 11, label: 'Car Maintenance Expense'},
  { value: 12, label: 'Unknown Expense'},
  { value: 13, label: 'Monthly Withdrawal Calculation'},
];

export const defaultData = {
  expenses: [
  {
    'expenseType': 'Rent',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Ameneties + Heat',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Electricity',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Water',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Gas',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Car Gas',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Car Maintenance',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Car Insurance',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Car Taxes',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Internet',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Serap Phone Bill',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Moms Phone Bill',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Stamatios Phone Bill',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Monthly Shopping',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Food Week 1',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Food Week 2',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Food Week 3',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Food Week 4',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Eating Out',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Yatim',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Ibrahim',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Baby',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Extra',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Hair Cut',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Qurban Savings',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Cleaning',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Monthly Withdrawal',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'expenseType': 'Unknown',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'expenseType': 'Serap Payment',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'expenseType': 'Stamatios Payment',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'expenseType': 'Extra Payment',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'expenseType': 'Deposits',
    'lastMonthPaid': 0,
    'expected': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
]};
