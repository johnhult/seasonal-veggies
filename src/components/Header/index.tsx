import * as React from "react";
import styled, { css, DefaultTheme, ThemeProps } from "styled-components";

export enum HeaderTypes {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
}

interface HeaderProps {
  fancy?: boolean;
  mb?: boolean;
  type: HeaderTypes;
}
type HeaderStyleProps = Omit<HeaderProps, "type">;

const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  fancy,
  type,
  mb,
  children,
  ...props
}) => {
  const StyledHeader = headers[type];
  return (
    <StyledHeader fancy={fancy} mb={mb} {...props}>
      {children}
    </StyledHeader>
  );
};

export default Header;

const baseHeader = css<ThemeProps<DefaultTheme> & HeaderStyleProps>`
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.text};
  background-image: ${({ theme, fancy }) =>
    fancy
      ? theme.name === "light"
        ? "red"
        : "linear-gradient(to bottom right, #dce35b, #45b649)"
      : "black"};
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 100%;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-bottom: ${({ mb }) => (mb ? "1rem" : undefined)};
`;

const H1Styled = styled("h1")<HeaderStyleProps>`
  ${baseHeader}
  font-size: calc(32rem / 16);
  font-weight: 700;
`;
const H2Styled = styled("h2")`
  ${baseHeader}
  font-size: calc(28rem / 16);
`;
const H3Styled = styled("h3")`
  ${baseHeader}
  font-size: calc(24rem / 16);
  font-weight: 700;
`;

const headers = {
  h1: H1Styled,
  h2: H2Styled,
  h3: H3Styled,
};
