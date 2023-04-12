import * as React from 'react';
import * as D from 'date-fns/fp';
import * as M from 'lib/Month';
import { enUS } from 'date-fns/locale';

// enum MonthActions {
//   INC = 'inc',
//   DEC = 'dec',
// }

// type MonthAction = {
//   type: MonthActions;
// };

// type MonthState = {
//   month: Date;
// };

// const monthReducer = (state: MonthState, action: MonthAction) => {
//   switch (action.type) {
//     case MonthActions.INC:
//       return { month: D.addMonths(1)(state.month) };
//     case MonthActions.DEC:
//       return { month: D.subMonths(1)(state.month) };
//   }
// };

// export const useMonthHelper = (initialMonth?: number) => {
//   // const [month, setMonth] = React.useState(
//   //   initialMonth ? D.setMonth(initialMonth)(new Date()) : new Date()
//   // );

//   /**
//    * Always in enUS locale for matching DatoCMS model and url redirects.
//    * @returns string - a string of type XXX
//    */
//   const getQueryMonth = (month: M.Month) => {
//     const m = month.toString();
//     return D.formatWithOptions({ locale: enUS })('MMM')(month);
//   };
//   // const setMonthIncDec = (incDec: 1 | -1) => {

//   //   // dispatch({ type: incDec === 1 ? MonthActions.INC : MonthActions.DEC });
//   // };

//   return { getQueryMonth };
// };
