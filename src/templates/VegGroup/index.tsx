import { graphql, navigate, PageProps } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { useGetGap } from 'helpers/style';
import IconButton from 'components/IconButton';
import { Icons } from 'components/Icon';
import { VeggiesEntry } from 'types/veggies';
import VegList from 'components/VegList';

type VegGroupProps = {
  month: string;
};

const VegGroup: React.FC<PageProps<Queries.veggiePageQuery, VegGroupProps>> = ({
  data: {
    veggie: { nodes: vegs },
  },
  pageContext: { month },
}) => {
  React.useEffect(() => {
    if (vegs.length === 1 || vegs.length === 0) {
      navigate(`/${month}`);
    }
  }, [month, vegs]);

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
        {/* TODO: FIX TYPECAST, WORKS BUT ISN'T PROPER */}
        <VegList data={vegs as unknown as VeggiesEntry[]} monthName={month} />
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
