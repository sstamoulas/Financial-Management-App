import React, { Fragment } from 'react';

import CustomTH from '../custom-th/custom-th.component';
import CustomTD from '../custom-td/custom-td.component';

import { generateTotal } from '../../redux/expense/expense.utils';

import './custom-tr-total.styles.scss';

const CustomTRTotal = ({ title, credits, debits, hasDueItems, isOverviewTable }) => {
  let dueCreditTotal = generateTotal(credits, 'due'), dueTotal = dueCreditTotal;
  let paidCreditTotal = generateTotal(credits, 'paid'), paidTotal = paidCreditTotal;

  if(debits) {
    const dueDebitTotal = generateTotal(debits, 'due');
    const paidDebitTotal = generateTotal(debits, 'paid');

    dueTotal = dueDebitTotal - dueCreditTotal;
    paidTotal = paidDebitTotal - paidCreditTotal;
  }

  return (
    <tr className='total-row'>
      {
        isOverviewTable ? (
          <Fragment>
            <CustomTH isLabel>---</CustomTH>
            <CustomTD label={title} className={'bold'} isBlank />
          </Fragment>
        ) : (
          <CustomTH isLabel>{title}</CustomTH>
        )
      }
      {
        hasDueItems ?
          <CustomTD isTotal value={dueTotal} />
        :
          <CustomTD isBlank />
      }
      <CustomTD isTotal value={paidTotal} />
      <CustomTD label={'---'} isBlank />
    </tr>
  )
};

export default CustomTRTotal;
