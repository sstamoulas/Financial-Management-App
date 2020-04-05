import { updateCollectionsStart } from '../../redux/expense/expense.actions';

export const updateExpense = (expenses, {index, value, type}) => {
  return expenses.map((expense, expenseIndex) => {
    if(index === expenseIndex) {
      expense[type] = value;
    }

    return expense;
  });
}

export const updateAmount = (state, {value, type, label, isExpense}) => {
  console.log(state);
  let {expenses, deposits, selectedTable, selectedMonth, selectedYear} = state;

  if(isExpense) {
    updateArray(expenses, value, type, label);
    updateCollectionsStart(`${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {expenses: expenses});
  }
  else {
    updateArray(deposits, value, type, label);
    updateCollectionsStart(`${selectedMonth.label}-${selectedYear.label}`, selectedTable.label, {deposits: deposits});
  }
}

const updateArray = (arrayItems, value, type, label) => {
  console.log(arrayItems, value, type, label);
  if(!isNaN(value)) {
    let index = arrayItems.map(item => item.expenseType).indexOf(type);
    console.log(index);

    if(value === "") {
      arrayItems[index][label] = 0;
    }
    else {
      arrayItems[index][label] = value;
    }
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

export const defaultDeposits = {
  deposits: [
    {
      'expenseType': 'Serap Payment',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Stamatios Payment',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Extra Payment',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Deposits',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
  ]
};

export const defaultExpenses = {
  expenses: [
    {
      'expenseType': 'Rent',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Ameneties + Heat',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Electricity',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Water',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Gas',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Car Gas',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Car Maintenance',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Car Insurance',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Car Taxes',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Internet',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Serap Phone Bill',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Moms Phone Bill',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Stamatios Phone Bill',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Monthly Shopping',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Food Week 1',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Food Week 2',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Food Week 3',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Food Week 4',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Eating Out',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Yatim',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Ibrahim',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Baby',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Extra',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
    {
      'expenseType': 'Hair Cut',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Qurban Savings',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Cleaning',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Monthly Withdrawal',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': false,
    },
    {
      'expenseType': 'Unknown',
      'Last Month Paid': 0,
      'Expected': 0,
      'Paid': 0,
      'Date': '',
      'hasOwnTable': true,
    },
  ],
};
