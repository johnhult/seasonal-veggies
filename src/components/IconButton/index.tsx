import * as React from "react";
import Arrow_L from "assets/gfx/arrow_l.svg";
import Arrow_R from "assets/gfx/arrow_r.svg";
import styled from "styled-components";

export enum Icons {
  ARROW_L = "arrow_l",
  ARROW_R = "arrow_r",
}

interface IconButtonProps {
  onClick: () => void;
  type: Icons;
  size: "small" | "medium";
}

type IconButtonDefaultFix = {
  size?: "small" | "medium";
} & Omit<IconButtonProps, "size">;

type IconButtonStyleProps = {
  $stroke: boolean;
  $fill: boolean;
} & Pick<IconButtonProps, "size">;

const matchIcon = {
  arrow_l: { component: Arrow_L, fill: true, stroke: true },
  arrow_r: { component: Arrow_R, fill: true, stroke: true },
};

const matchSize = {
  small: "32px",
  medium: "64px",
};

const IconButtonDefaults: React.FC<IconButtonProps> = ({
  onClick,
  type,
  size,
}) => {
  const Icon = matchIcon[type].component;
  const fill = matchIcon[type].fill;
  const stroke = matchIcon[type].stroke;
  return (
    <Button onClick={onClick}>
      <StyledIcon as={Icon} size={size} $fill={fill} $stroke={stroke} />
    </Button>
  );
};

const IconButton: React.FC<IconButtonDefaultFix> = ({
  size = "small",
  ...props
}) => <IconButtonDefaults size={size} {...props} />;

export default IconButton;

const Button = styled.button`
  appearance: none;
  border-style: none;
  background-color: initial;
  margin: 0;
  padding: 0;
`;

const StyledIcon = styled.div<IconButtonStyleProps>`
  width: ${({ size }) => matchSize[size]};
  height: ${({ size }) => matchSize[size]};
  & path {
    fill: ${({ theme, $fill }) => $fill && theme.colors.text};
    stroke: ${({ theme, $stroke }) => $stroke && theme.colors.text};
  }
`;
