import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import ThemeChangeProvider, { useGetTheme } from "context/ThemeChangeContext";

const StyledTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useGetTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const Global: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeChangeProvider>
        <StyledTheme>
          <GlobalStyles />
          <main>{children}</main>
        </StyledTheme>
      </ThemeChangeProvider>
    </>
  );
};

export default Global;

const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
  html {
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    box-sizing: border-box;
    *, *:before, *:after {
      box-sizing: inherit;
    }
  }
  main {
    width: 100%;
  }
`;
