import React from "react";
import styled from "styled-components";

interface TextProps {
  children: React.ReactNode;
  size?: string;
  weight?: string | number;
  color?: string;
  align?: "left" | "center" | "right";
  margin?: string;
  lineHeight?: string;
  as?: keyof JSX.IntrinsicElements;
}

const StyledText = styled.span<TextProps>`
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.weight || "normal"};
  color: ${(props) => props.color || "inherit"};
  text-align: ${(props) => props.align || "left"};
  margin: ${(props) => props.margin || "0"};
  line-height: ${(props) => props.lineHeight || "1.2"};
`;

const Text: React.FC<TextProps> = ({
  children,
  size,
  weight,
  color,
  align,
  margin,
  lineHeight,
  as = "span",
}) => {
  return (
    <StyledText
      size={size}
      weight={weight}
      color={color}
      align={align}
      margin={margin}
      lineHeight={lineHeight}
      as={as}
    >
      {children}
    </StyledText>
  );
};

export default Text;
