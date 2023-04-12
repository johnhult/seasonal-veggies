import * as D from 'date-fns/fp';
import { pipe } from 'fp-ts/lib/function';
import { toLowerCase } from 'fp-ts/lib/string';

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
] as const;
export type Month = typeof months[number];

export const isMonth = (m: unknown): m is Month => {
  return !!m && typeof m === 'string' && months.includes(m as Month);
};

export const parseMonth = (m?: string): Month => {
  if (isMonth(m)) {
    return m;
  } else {
    throw new Error(`${m} is not of type Month`);
  }
};

export const getFirstDateOfMonthFromMMonth = (m: Month): Date => {
  const d = new Date();
  return D.setMonth(getMonthNumberFromName(m))(D.startOfMonth(d));
};

export const getPrevOrNextMonth = (m: Month, incOrDec: 1 | -1): Month => {
  return pipe(
    m,
    getFirstDateOfMonthFromMMonth,
    D.addMonths(incOrDec),
    getMonthNameFromDate
  );
};

export const getMonthNameFromDate = (d: Date): Month => {
  return pipe(d, D.format('MMM'), toLowerCase, parseMonth);
};

export const getMonthNumberFromName = (monthName: Month) => {
  switch (monthName) {
    case 'jan':
      return 0;
    case 'feb':
      return 1;
    case 'mar':
      return 2;
    case 'apr':
      return 3;
    case 'may':
      return 4;
    case 'jun':
      return 5;
    case 'jul':
      return 6;
    case 'aug':
      return 7;
    case 'sep':
      return 8;
    case 'oct':
      return 9;
    case 'nov':
      return 10;
    case 'dec':
      return 11;
  }
};
