import ListItem from "components/ListItem";
import * as React from "react";
import styled from "styled-components";
import { VeggiesEntry } from "types/veggies";

interface VegListProps {
  data: VeggiesEntry[];
}

const VegList: React.FC<VegListProps> = ({ data }) => {
  return (
    <OrderedList>
      {data.map((item) => {
        return <ListItem key={item.id} name={item.name} />;
      })}
    </OrderedList>
  );
};

export default VegList;

const OrderedList = styled.ol`
  appearance: none;
  margin: 0;
  padding: 0;
`;
