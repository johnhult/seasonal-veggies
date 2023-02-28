import { graphql, useStaticQuery } from "gatsby";

export const useVeggiesQuery = () => {
  const query = useStaticQuery(graphql`
    query allVeggies {
      veggies: allDatoCmsVeggie(sort: { name: ASC }) {
        nodes {
          id
          name
          months
        }
      }
    }
  `);
  return query;
};
