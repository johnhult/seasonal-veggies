import * as React from 'react';
import * as V from 'lib/Veg';
import ListItem from 'components/ListItem';
import styled from 'styled-components';
import { VeggiesEntry, VeggiesEntryInContext } from 'types/veggies';

interface VegListProps {
  data: VeggiesEntry[];
  monthName: string;
}

const VegList: React.FC<VegListProps> = ({ data, monthName }) => {
  const [vegList, setVegList] = React.useState<VeggiesEntryInContext[]>([]);
  React.useEffect(() => {
    setVegList(V.parseVeggiesToRemoveDoubles(data));
  }, [data]);

  return (
    <OrderedList>
      {vegList
        .sort((a, b) => {
          const nameA =
            V.isGroup(a) && !a.isSingleOccurence ? a.isInGroup : a.name;
          const nameB =
            V.isGroup(b) && !b.isSingleOccurence ? b.isInGroup : b.name;
          return nameA.localeCompare(nameB);
        })
        .map((veg) => {
          return <ListItem key={veg.id} veg={veg} monthName={monthName} />;
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
