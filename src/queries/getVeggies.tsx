// import { graphql, useStaticQuery } from 'gatsby';
// import * as V from 'lib/Veg';
// import * as M from 'lib/Month';
// import { pipe } from 'fp-ts/lib/function';

// export const useVeggiesQuery = (month: M.Month) => {
//   const query = useStaticQuery<Queries.allVeggiesQuery>(graphql`
//     query allVeggies {
//       veggies: allDatoCmsVeggie(
//         filter: { months: { elemMatch: { name: { in: "jan" } } } }
//         sort: { name: ASC }
//       ) {
//         nodes {
//           id
//           isingroup {
//             groupname
//           }
//           months {
//             name
//           }
//           name
//           typeofgreen
//         }
//         totalCount
//       }
//     }
//   `);
//   console.log(query);
//   return pipe(query, V.parseQueryNodeToVegEntry, (v) =>
//     V.flattenVeggiesByMonth(v, month)
//   );
// };
