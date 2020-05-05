export const formatDate = (date) => {
  const month = ('0' + ((new Date(date)).getMonth() + 1)).slice(-2);
  const day = ('0' + ((new Date(date)).getDate())).slice(-2);
  const year = ('0' + ((new Date(date)).getFullYear())).slice(-2);

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

export const isNegative = (number) => {
  return number < 0 ? 'negative' : ''
}

export const invertNegative = (number) => {
  if(number < 0) {
    number *= -1;
  }

  return number;
}

export const thousandsSeparator = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function addItem(items) {
  return [...items, {label: '', paid: 0, date: ''}];
}

export function updateItem(items, {index, value, label}) {
  if(label !== 'label' && label !== 'date') {
    if(isNaN(value) || !value) {
      value = 0;
    }
  }

  const updatedItems = items.map((item, currentIndex) => {
    // Find the item with the matching id
    if(currentIndex === index) {
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
  return items.filter((expense, expenseIndex) => index !== expenseIndex);
}
