export const formatDate = (date) => {
  const month = ('0' + ((new Date(date)).getMonth() + 1)).slice(-2);
  const day = ('0' + ((new Date(date)).getDate())).slice(-2);
  const year = ('0' + ((new Date(date)).getFullYear())).slice(-2);

  return `${month}/${day}/${year}`;
}

export const generateTotal = (items, label) => {
  return items && !!items.length ? items.reduce(
    (accumulator, item) => {
      let num = parseFloat(item[label]);
      if(isNaN(num)) {
        num = 0;
      }

      return accumulator + parseFloat(num);
    }, 0) : 0;
}

export const isNegative = (number) => {
  return number < 0 ? 'negative' : ''
}

export const invertNegative = (number) => {
  if(number < 0) {
    number *= -1;
  }

  return number.toFixed(2);
}

export const thousandsSeparator = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function addItem(items) {
  return [...items, {label: '', paid: 0, date: '', value: items.length ? items[items.length - 1].value + 1 : 0}];
}

export function updateItem(items, {index, value, label}) {
  if(label !== 'label' && label !== 'date') {
    if(isNaN(value) || !value) {
      value = 0;
    }
  }

  const updatedItems = items.map((item) => {
    // Find the item with the matching id
    if(item.value === index) {
      // Return a new object
      return {
        ...item,  // copy the existing item
        [label]: value  // replace the value 
      }
    }

    // Leave every other item unchanged
    return item;
  });

  return updatedItems;
}

export const removeItem = (items, index) => {
  return items.filter((expense) => index !== expense.value);
}

export const months = [
  {
    label: "January",
    value: 0
  }, {
    label: "February",
    value: 1
  }, {
    label: "March",
    value: 2
  }, {
    label: "April",
    value: 3
  }, {
    label: "May",
    value: 4
  }, {
    label: "June",
    value: 5
  }, {
    label: "July",
    value: 6
  }, {
    label: "August",
    value: 7
  }, {
    label: "September",
    value: 8
  }, {
    label: "October",
    value: 9
  }, {    
    label: "November",
    value: 10
  }, {
    label: "December",
    value: 11
  }
];

export const years = [
  {
    label: 2021,
    value: 2021
  }, {
    label: 2022,
    value: 2022
  }, {
    label: 2023,
    value: 2023
  }, {
    label: 2024,
    value: 2024
  }, {
    label: 2025,
    value: 2025
  }, {
    label: 2026,
    value: 2026
  }, {
    label: 2027,
    value: 2027
  }, {
    label: 2028,
    value: 2028
  }, {
    label: 2029,
    value: 2029
  }, {
    label: 2030,
    value: 2030
  }, {    
    label: 2031,
    value: 2031
  }, {
    label: 2032,
    value: 2032
  }
];

export const tables = [
  { 
    label: "Overview",
    value: 0,
    hasOwnTable: true,
    isExpense: false,
  }
];
