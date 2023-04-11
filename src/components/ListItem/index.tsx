import Icon, { Icons } from 'components/Icon';
import { Link } from 'gatsby';
import { useGetGap } from 'helpers/style';
import * as React from 'react';
import styled from 'styled-components';
import { VeggiesEntry } from 'types/veggies';
import * as V from 'lib/Veg';

interface ListItemProps {
  veg: VeggiesEntry;
  monthName: string;
}

const LinkWrapper: React.FC<React.PropsWithChildren<{ to?: string }>> = ({
  to,
  children,
}) => {
  return to ? <StyledLink to={to}>{children}</StyledLink> : <>{children}</>;
};

const ListItem: React.FC<ListItemProps> = ({ veg, monthName, ...props }) => {
  console.log(veg);
  return (
    <LinkWrapper
      to={
        V.isGroup(veg)
          ? `/${monthName}/${V.getSlugFromName(veg.isInGroup)}`
          : undefined
      }
    >
      <StyledListItem {...props} $isGroup={V.isGroup(veg)}>
        {V.isGroup(veg) ? veg.isInGroup : veg.name}
        {V.isGroup(veg) && <StyledIcon type={Icons.EXPAND} size='xSmall' />}
      </StyledListItem>
    </LinkWrapper>
  );
};

export default ListItem;

type StyledListItemProps = {
  $isGroup: boolean;
};

const StyledLink = styled(Link)`
  appearance: none;
  text-decoration: none;
  color: inherit;
`;

const StyledListItem = styled.li<StyledListItemProps>`
  display: flex;
  align-items: center;
  margin: 0;
  margin-bottom: ${() => useGetGap(3)};
  padding: ${() => useGetGap(3)} ${() => useGetGap(4)};
  list-style: none;
  border-radius: ${({ theme }) => theme.radius.large}px;
  border: ${({ $isGroup, theme }) =>
    $isGroup ? `1px solid ${theme.colors.border}` : undefined};
  cursor: ${({ $isGroup }) => ($isGroup ? 'pointer' : undefined)};
`;

const StyledIcon = styled(Icon)`
  margin-left: auto;
`;
