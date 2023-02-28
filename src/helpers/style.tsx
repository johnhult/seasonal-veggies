import { useTheme } from "styled-components";

export const useGetGap = (multiple: number): string => {
  const theme = useTheme();
  return `${theme.gap.base * multiple}px`;
};
