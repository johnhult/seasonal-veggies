import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Header, { HeaderTypes } from "components/Header";
import styled from "styled-components";
import { useGetGap } from "helpers/style";
import { format, formatWithOptions, sub } from "date-fns/fp";
import IconButton, { Icons } from "components/IconButton";
import { sv } from "date-fns/locale";
import { useVeggiesQuery } from "queries/getVeggies";
import VegList from "components/VegList";
import { VeggiesEntry } from "types/veggies";

const IndexPage: React.FC<PageProps> = () => {
  const [month, setMonth] = React.useState(new Date());
  const {
    veggies: { nodes: veggies },
  }: { veggies: { nodes: VeggiesEntry[] } } = useVeggiesQuery();

  const setMonthIncDec = (incDec: 1 | -1) => {
    setMonth(sub({ months: incDec })(month));
  };

  console.log(veggies);
  return (
    <>
      <StyledHeader>
        <Header type={HeaderTypes.H1} fancy>
          Grönsaker i säsong
        </Header>
      </StyledHeader>
      <MainSection>
        <Nav>
          <IconButton
            size="medium"
            onClick={() => setMonthIncDec(1)}
            type={Icons.ARROW_L}
          />
          <WidthHeader type={HeaderTypes.H3}>
            {formatWithOptions({ locale: sv })("MMMM")(month)}
          </WidthHeader>
          <IconButton
            size="medium"
            onClick={() => setMonthIncDec(-1)}
            type={Icons.ARROW_R}
          />
        </Nav>
        {veggies && (
          <VegList
            data={veggies.filter((item) =>
              item.months.includes(format("MMM")(month))
            )}
          />
        )}
      </MainSection>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Grönsaker</title>;

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
