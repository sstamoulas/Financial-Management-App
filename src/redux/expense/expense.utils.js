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

export const thousandsSeparator = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export const defaultData = {
  expenses: [
  {
    'name': 'Rent',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Ameneties + Heat',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Electricity',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Water',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Gas',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Car Gas',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Car Maintenance',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Car Insurance',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Car Taxes',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Internet',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Phone Bill #1',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Phone Bill #2',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Phone Bill #3',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Monthly Shopping',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Food Week 1',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Food Week 2',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Food Week 3',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Food Week 4',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Eating Out',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Yatim',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Baby #1',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Baby #2',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Extra',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Hair Cut',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Qurban Savings',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Cleaning',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Monthly Withdrawal',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'name': 'Unknown',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'name': 'Left Over Last Month',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'name': 'Payment #1',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'name': 'Payment #2',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'name': 'Extra Payment',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'name': 'Deposits',
    'lastMonthPaid': 0,
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
]};
