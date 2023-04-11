import * as M from 'lib/Month';

export interface VeggiesEntry {
  id: string;
  name: string;
  months: M.Month[];
  isInGroup?: string;
  typeOfGreen: 'veg' | 'fruit';
}

export interface VeggiesEntryInGroup extends Omit<VeggiesEntry, 'isInGroup'> {
  isInGroup: string;
}
