import { VeggiesEntry, VeggiesEntryInGroup } from 'types/veggies';
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

// export const isVegGroup = (veg?: {
//   groupname?: string;
// }): veg is VeggiesGroupName => {
//   return !!veg && !!veg.groupname;
// };

// export const subVeggieToVeggiesEntry = (
//   vegs: VeggiesEntry[]
// ): VeggiesEntry[] => {
//   const addedEmptySubVeggies = [] as VeggiesEntry[];
//   for (const v of vegs) {
//     const addedV = {
//       ...v,
//     } as VeggiesEntry;
//     addedEmptySubVeggies.push(addedV);
//   }
//   return addedEmptySubVeggies;
// };

/**
 * If a subVeggie only contains one item that matches
 * a spedific month, we can return flattened object
 */
// export const flattenVeggiesByMonth = (
//   vegs: VeggiesEntry[],
//   month: M.Month
// ): VeggiesEntry[] => {
//   const flattened = [] as (VeggiesEntry)[];
//   for (const v of vegs) {
//     if (!isGroup(v) && v.months?.includes(capitalize(month))) {
//       // console.log('SINLGE AND HAS MONTH', v);
//       flattened.push(v);
//     } else {
//       // console.log('I NEED NAMES', v);
//       if (
//         isGroup(v) &&
//         v.subveggies.filter((sv) => sv.months?.includes(capitalize(month)))
//           .length === 1
//       ) {
//         flattened.push(
//           v.subveggies[
//             v.subveggies.findIndex((sv) =>
//               sv.months?.includes(capitalize(month))
//             )
//           ]
//         );
//       } else if (
//         isGroup(v) &&
//         v.subveggies.some((sv) => sv.months?.includes(capitalize(month)))
//       ) {
//         flattened.push(v);
//       }
//     }
//   }
//   return subVeggieToVeggiesEntry(flattened);
// };

// export const removeGroup = (origName: string) => {
//   return origName.replace(/\*.*\*/, '');
// };

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

// export const groupVeggiesInGroup = (
//   vegs: VeggiesEntry[]
// ): (VeggiesEntry | VeggiesGroupName)[] => {
//   const combinedList = [] as (VeggiesEntry | VeggiesGroupName)[];
//   for (const v of vegs) {
//     if (!isGroup(v)) {
//       combinedList.push(v);
//     } else if (
//       isVegGroup({ groupname: v.isInGroup }) &&
//       combinedList.some((i) => !!i.groupname && i.groupname === v.isInGroup)
//     ) {
//       combinedList.push({ groupname: v.isInGroup });
//     }
//   }
//   return combinedList;
// };

export const parseSingleVegEntry = (
  veg: Queries.allVeggiesPerMonthQuery['allDatoCmsVeggie']['nodes'][number]
): VeggiesEntry => {
  const vegAsVeggiesEntry = {} as VeggiesEntry;
  if (veg.name && veg.months && isValidTypeOfGreen(veg.typeofgreen)) {
    console.log('', veg);
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

// export const parseVeggiePageToVegEntry = (
//   queryVeggies: Queries.veggiePageQuery
// ) => {
//   // TODO: Validate query
//   return queryVeggies.veggie.nodes[0] as unknown as VeggiesEntry;
// };
