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

export const formatDate = (date) => {
  console.log(((new Date(date)).getMonth() + 1))
  console.log(("0" + ((new Date(date)).getMonth() + 1)).slice(-2))
  const month = ("0" + ((new Date(date)).getMonth() + 1)).slice(-2);
  const day = ("0" + ((new Date(date)).getDate())).slice(-2);
  const year = ("0" + ((new Date(date)).getFullYear())).slice(-2);

  return `${month}/${day}/${year}`;
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
  if(label !== "label" && label !== "date") {
    if(isNaN(value)) {
      arrayItems[index][label] = 0;
    }
    else {
      arrayItems[index][label] = parseFloat(value);
    }
  }
  else {
    arrayItems[index][label] = value;
  }
}

export const removeArrayItem = (arrayItems, index) => {
  
}

export const defaultData = {
  expenses: [
  {
    'label': 'Rent',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Ameneties + Heat',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Electricity',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Water',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Gas',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Car Gas',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Car Maintenance',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Car Insurance',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Car Taxes',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Internet',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Phone Bill #1',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Phone Bill #2',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Phone Bill #3',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Monthly Shopping',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Food Week #1',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Food Week #2',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Food Week #3',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Food Week #4',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Eating Out',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Yatim',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Baby #1',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Baby #2',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Extra',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Hair Cut',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Qurban Savings',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Cleaning',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Monthly Withdrawal',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': true,
  },
  {
    'label': 'Unknown',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': true,
    'isExpense': true,
  },
  {
    'label': 'Left Over Last Month',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'label': 'Payment #1',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'label': 'Payment #2',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'label': 'Extra Payment',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
  {
    'label': 'Deposits',
    'due': 0,
    'paid': 0,
    'date': `${(new Date()).getFullYear()}-${("0" + ((new Date()).getMonth() + 1)).slice(-2)}-${("0" + (new Date()).getDate()).slice(-2)}`,
    'hasOwnTable': false,
    'isExpense': false,
  },
]};
