import { graphql, navigate, PageProps } from 'gatsby';
import * as React from 'react';
import * as V from 'lib/Veg';
import * as M from 'lib/Month';
import styled from 'styled-components';
import { useGetGap } from 'helpers/style';
import IconButton from 'components/IconButton';
import { Icons } from 'components/Icon';
import ListItem from 'components/ListItem';
import { VeggiesEntry } from 'types/veggies';

type VegGroupProps = {
  month?: string;
};

const VegGroup: React.FC<
  PageProps<Queries.veggiePageQuery> & VegGroupProps
> = ({ data, month }) => {
  const veg = data.veggie.nodes;
  console.log(veg);

  React.useEffect(() => {
    if (!M.isMonth(month)) {
      navigate('/');
    }
  }, [month]);

  return (
    <MaxWidthWrapper>
      <StyledHeader>
        <IconButton
          type={Icons.CLOSE}
          onClick={() => navigate(`/${month}`)}
          style={{ marginLeft: 'auto' }}
        />
      </StyledHeader>
      <PaddingWrapper>
        {veg.map((item) => {
          console.log(V.isGroup(item as VeggiesEntry));
          return (
            <ListItem
              key={item.id}
              veg={item as unknown as VeggiesEntry}
              monthName={month || ''}
            />
          );
        })}
      </PaddingWrapper>
    </MaxWidthWrapper>
  );
};

export default VegGroup;

const MaxWidthWrapper = styled.div`
  max-width: 500px;
  margin: auto;
`;

const PaddingWrapper = styled.div`
  padding: ${() => useGetGap(3)};
`;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  padding: ${() => useGetGap(3)};
`;

export const query = graphql`
  query veggiePage($queryName: String!, $month: String) {
    veggie: allDatoCmsVeggie(
      filter: {
        isingroup: { groupname: { eq: $queryName } }
        months: { elemMatch: { name: { in: [$month] } } }
      }
    ) {
      nodes {
        name
        id
      }
    }
  }
`;
