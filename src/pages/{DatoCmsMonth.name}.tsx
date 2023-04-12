import * as React from 'react';
import { graphql, HeadFC, Link, PageProps } from 'gatsby';
import Header, { HeaderTypes } from 'components/Header';
import styled from 'styled-components';
import { useGetGap } from 'helpers/style';
import * as D from 'date-fns/fp';
import * as M from 'lib/Month';
import * as V from 'lib/Veg';
import IconButton from 'components/IconButton';
import { enUS, sv } from 'date-fns/locale';
import VegList from 'components/VegList';
import Icon, { Icons } from 'components/Icon';
// import { useMonthHelper } from 'hooks/useMonthHelper';

type MonthPageParams = {
  month: string;
};

const MonthPage: React.FC<
  PageProps<Queries.allVeggiesPerMonthQuery, null, MonthPageParams>
> = ({ data, params: { name: monthUrl }, ...props }) => {
  const verfiedUrl = M.parseMonth(monthUrl);

  const [month] = React.useState(verfiedUrl);

  // const setMonthIncDec = (incOrDec: 1 | -1) => {
  //   if(incOrDec === 1) {
  //     navigate
  //   }
  // }

  const veggies = V.parseQueryNodesToVegEntries(data);

  return (
    <MaxWidthWrapper>
      <StyledHeader>
        <Header type={HeaderTypes.H1} fancy>
          Grönsaker i säsong
        </Header>
      </StyledHeader>
      <MainSection>
        <Nav>
          <Link to={`/${M.getPrevOrNextMonth(month, -1)}`}>
            <Icon size='medium' type={Icons.ARROW_L} />
          </Link>
          <WidthHeader type={HeaderTypes.H3}>
            {D.formatWithOptions({ locale: sv })('MMMM')(
              M.getFirstDateOfMonthFromMMonth(month)
            )}
          </WidthHeader>
          <Link to={`/${M.getPrevOrNextMonth(month, 1)}`}>
            <Icon size='medium' type={Icons.ARROW_R} />
          </Link>
        </Nav>
        {veggies && <VegList monthName={month} data={veggies} />}
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
