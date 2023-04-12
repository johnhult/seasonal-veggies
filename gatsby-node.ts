import path from 'path';
import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { data, errors } =
    await graphql<Queries.allVeggieGroupsPageBuildQuery>(`
      query allVeggieGroupsPageBuild {
        veggies: allDatoCmsVeggiegroup(sort: { groupname: ASC }) {
          nodes {
            groupname
          }
        }
        months: allDatoCmsMonth(sort: { monthnumber: ASC }) {
          nodes {
            name
          }
        }
      }
    `);
  if (errors) {
    reporter.panic(
      '🚨 Errors when grabbing your DatoCMS entry 🚨',
      errors.join(', ')
    );
  }
  if (data) {
    data.veggies.nodes.forEach((veg) => {
      if (veg.groupname) {
        // TODO: Can't seem to import functions atm. Should be V from Veg.ts
        const slug = veg.groupname
          .replace(/\*.*\*/, '')
          .replace(/[åäÅä]/, 'a')
          .replace(/[Öö]/, 'o')
          .toLowerCase();
        for (const m of data.months.nodes) {
          actions.createPage({
            path: `${m.name}/${slug}`,
            component: path.resolve(`./src/templates/VegGroup/index.tsx`),
            context: { slug: slug, queryName: veg.groupname, month: m.name },
          });
        }
      }
    });
  } else {
    reporter.panic('🚨 No data in DatoCMS entry 🚨');
  }
};
