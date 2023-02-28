import "styled-components";

interface Base {
  gap: {
    base: number;
  };
  radius: {
    small: number;
    large: number;
  };
}

declare module "styled-components" {
  export interface DefaultTheme extends Base {
    name: string;
    colors: {
      body: string;
      text: string;
      black: string;
      white: string;
      border: string;
    };
  }
}
