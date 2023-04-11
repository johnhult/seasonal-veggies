import * as React from 'react';
import * as D from 'date-fns/fp';
import { enUS } from 'date-fns/locale';

enum MonthActions {
  INC = 'inc',
  DEC = 'dec',
}

type MonthAction = {
  type: MonthActions;
};

type MonthState = {
  month: Date;
};

const monthReducer = (state: MonthState, action: MonthAction) => {
  console.log(action);
  switch (action.type) {
    case MonthActions.INC:
      return { month: D.addMonths(1)(state.month) };
    case MonthActions.DEC:
      return { month: D.subMonths(1)(state.month) };
  }
};

export const useMonthHelper = (setMonth?: number) => {
  const [state, dispatch] = React.useReducer(monthReducer, {
    month: setMonth ? D.setMonth(setMonth)(new Date()) : new Date(),
  });

  /**
   * Always in enUS locale for matching DatoCMS model and url redirects.
   * @returns string - a string of type XXX
   */
  const getQueryMonth = () => {
    return D.formatWithOptions({ locale: enUS })('MMM')(state.month);
  };
  const setMonthIncDec = (incDec: 1 | -1) => {
    dispatch({ type: incDec === 1 ? MonthActions.INC : MonthActions.DEC });
  };

  return { month: state.month, getQueryMonth, setMonthIncDec };
};
