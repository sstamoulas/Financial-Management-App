export const formatDate = (date) => {
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
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const updateArray = (arrayItems, index, value, label) => {
  if(label !== "label" && label !== "date") {
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

export const removeArrayItem = (arrayItems, index) => {
  return arrayItems.filter((expense, expenseIndex) => index !== expenseIndex);
}
