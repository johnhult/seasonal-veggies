import * as React from 'react';
import * as V from 'lib/Veg';
import ListItem from 'components/ListItem';
import styled from 'styled-components';
import { VeggiesEntry } from 'types/veggies';

interface VegListProps {
  data: VeggiesEntry[];
  monthName: string;
}

const VegList: React.FC<VegListProps> = ({ data, monthName }) => {
  const vegWithGroupList = [] as VeggiesEntry[];
  data.forEach((v) => {
    if (!V.isGroup(v)) {
      vegWithGroupList.push(v);
    } else if (
      !vegWithGroupList.some((vegInList) => v.isInGroup === vegInList.isInGroup)
    ) {
      vegWithGroupList.push(v);
    }
  });
  console.log(vegWithGroupList);
  return (
    <OrderedList>
      {vegWithGroupList
        .sort((a, b) => {
          const nameA = V.isGroup(a) ? a.isInGroup : a.name;
          const nameB = V.isGroup(b) ? b.isInGroup : b.name;
          return nameA.localeCompare(nameB);
        })
        .map((item) => {
          return <ListItem key={item.id} veg={item} monthName={monthName} />;
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
