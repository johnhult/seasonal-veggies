import { DefaultTheme } from "styled-components";

const themeBase = {
  gap: {
    base: 4,
  },
  radius: {
    small: 4,
    large: 12,
  },
};

const sharedColors = {
  black: "#151617",
  white: "#ffffff",
};

export const lightTheme: DefaultTheme = {
  name: "light",
  colors: {
    body: "#ffffff",
    text: "#162025",
    border: "#6d8095",
    ...sharedColors,
  },
  ...themeBase,
};
export const darkTheme: DefaultTheme = {
  name: "dark",
  colors: {
    body: "#1a242e",
    text: "#ffffff",
    border: "#2d3946",
    ...sharedColors,
  },
  ...themeBase,
};
