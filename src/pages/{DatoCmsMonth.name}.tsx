import * as React from 'react';
import { graphql, HeadFC, PageProps } from 'gatsby';
import Header, { HeaderTypes } from 'components/Header';
import styled from 'styled-components';
import { useGetGap } from 'helpers/style';
import * as D from 'date-fns/fp';
import * as M from 'lib/Month';
import * as V from 'lib/Veg';
import IconButton from 'components/IconButton';
import { enUS, sv } from 'date-fns/locale';
import VegList from 'components/VegList';
import { Icons } from 'components/Icon';
import { useMonthHelper } from 'hooks/useMonthHelper';

type MonthPageParams = {
  month: string;
};

const MonthPage: React.FC<
  PageProps<Queries.allVeggiesPerMonthQuery> & MonthPageParams
> = ({ data, params: { name: monthUrl }, ...props }) => {
  console.log(monthUrl);
  const verfiedUrl = M.parseMonth(monthUrl);

  const { month, setMonthIncDec } = useMonthHelper(
    M.getMonthNumberFromName(verfiedUrl) || undefined
  );

  const veggies = V.parseQueryNodesToVegEntries(data);
  console.log(veggies);
  // console.log(location);

  return (
    <MaxWidthWrapper>
      <StyledHeader>
        <Header type={HeaderTypes.H1} fancy>
          Grönsaker i säsong
        </Header>
      </StyledHeader>
      <MainSection>
        <Nav>
          <IconButton
            size='medium'
            onClick={() => setMonthIncDec(-1)}
            type={Icons.ARROW_L}
          />
          <WidthHeader type={HeaderTypes.H3}>
            {D.formatWithOptions({ locale: sv })('MMMM')(month)}
          </WidthHeader>
          <IconButton
            size='medium'
            onClick={() => setMonthIncDec(1)}
            type={Icons.ARROW_R}
          />
        </Nav>
        {veggies && (
          <VegList
            monthName={D.formatWithOptions({ locale: enUS })('MMM')(
              month
            ).toLowerCase()}
            data={veggies}
          />
        )}
      </MainSection>
    </MaxWidthWrapper>
  );
};

export default MonthPage;

export const Head: HeadFC = () => <title>Grönsaker</title>;

const MaxWidthWrapper = styled.div`
  max-width: 500px;
  margin: auto;
`;

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  padding: ${() => useGetGap(3)};
`;

const MainSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${() => useGetGap(3)};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WidthHeader = styled(Header)`
  flex: 1;
  text-align: center;
  display: block;
`;

export const query = graphql`
  query allVeggiesPerMonth($name: String) {
    allDatoCmsVeggie(
      sort: { name: ASC }
      filter: { months: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        id
        isingroup {
          groupname
        }
        months {
          name
        }
        name
        typeofgreen
      }
      totalCount
    }
  }
`;
