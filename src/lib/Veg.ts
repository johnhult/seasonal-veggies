import {
  VeggiesEntry,
  VeggiesEntryInContext,
  VeggiesEntryInGroup,
} from 'types/veggies';
import * as M from 'lib/Month';

export const getSlugFromName = (name: string) => {
  return name
    .replace(/\*.*\*/, '')
    .replace(/[åäÅä]/, 'a')
    .replace(/[Öö]/, 'o')
    .toLowerCase();
};

export const isGroup = (veg: VeggiesEntry): veg is VeggiesEntryInGroup => {
  return !!veg.isInGroup;
};

export const parseIsInGroup = (
  veg: VeggiesEntry
): VeggiesEntry | VeggiesEntryInGroup => {
  if (isGroup(veg)) {
    return veg;
  } else {
    return veg;
  }
};

export const mapQueryMonthsToName = (
  months: Queries.allVeggiesPerMonthQuery['allDatoCmsVeggie']['nodes'][number]['months']
): M.Month[] => {
  if (months) {
    const mMonths = months.map((m) => M.parseMonth(m?.name || undefined));
    return mMonths;
  } else {
    throw new Error(`Month ${months} is not a valid array of months`);
  }
};

export const isValidTypeOfGreen = (
  tog: unknown
): tog is VeggiesEntry['typeOfGreen'] => {
  return !!tog && (tog === 'veg' || tog === 'fruit');
};

export const parseSingleVegEntry = (
  veg: Queries.allVeggiesPerMonthQuery['allDatoCmsVeggie']['nodes'][number]
): VeggiesEntry => {
  const vegAsVeggiesEntry = {} as VeggiesEntry;
  if (veg.name && veg.months && isValidTypeOfGreen(veg.typeofgreen)) {
    vegAsVeggiesEntry.id = veg.id;
    vegAsVeggiesEntry.name = veg.name;
    vegAsVeggiesEntry.months = mapQueryMonthsToName(veg.months);
    vegAsVeggiesEntry.isInGroup = veg.isingroup?.groupname
      ? veg.isingroup.groupname
      : undefined;
    vegAsVeggiesEntry.typeOfGreen = veg.typeofgreen;
  }
  return vegAsVeggiesEntry;
};

export const parseQueryNodesToVegEntries = (
  queryVeggies: Queries.allVeggiesPerMonthQuery
): VeggiesEntry[] => {
  const veggies = [] as VeggiesEntry[];
  queryVeggies.allDatoCmsVeggie.nodes.forEach((veg) => {
    const parsedVeg = parseSingleVegEntry(veg);
    veggies.push(parsedVeg);
  });
  return veggies as unknown as VeggiesEntry[];
};

export const parseVegsInGroupFromVegs = (
  vegs: VeggiesEntry[]
): VeggiesEntryInGroup[] => {
  const groupList = [] as VeggiesEntryInGroup[];
  for (const veg of vegs) {
    if (isGroup(veg)) {
      groupList.push(veg);
    }
  }
  return groupList;
};

export const ifSingleGroupOccurence = (
  vegs: (VeggiesEntry | VeggiesEntryInGroup)[],
  vegInGroup: VeggiesEntryInGroup
) => {
  return vegs.filter((v) => v.isInGroup === vegInGroup.isInGroup).length === 1;
};

export const parseVeggiesToRemoveDoubles = (
  vegs: (VeggiesEntry | VeggiesEntryInGroup)[]
): VeggiesEntryInContext[] => {
  const vegsWithContext = vegs.map(
    (v): VeggiesEntryInContext => ({
      ...v,
      isSingleOccurence: !isGroup(v) || ifSingleGroupOccurence(vegs, v),
    })
  );
  const vegGroup = [] as VeggiesEntryInContext[];
  vegsWithContext.forEach((v) => {
    if (!isGroup(v)) {
      vegGroup.push(v);
    } else if (
      !vegGroup.some((vegInList) => v.isInGroup === vegInList.isInGroup)
    ) {
      vegGroup.push(v);
    }
  });
  return vegGroup;
};
