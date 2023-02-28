import { useGetGap } from "helpers/style";
import * as React from "react";
import styled from "styled-components";

interface ListItemProps {
  name: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, ...props }) => {
  return <StyledListItem {...props}>{name}</StyledListItem>;
};

export default ListItem;

const StyledListItem = styled.li`
  margin: 0;
  margin-bottom: ${() => useGetGap(3)};
  padding: ${() => useGetGap(4)};
  list-style: none;
  border-radius: ${({ theme }) => theme.radius.large}px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
