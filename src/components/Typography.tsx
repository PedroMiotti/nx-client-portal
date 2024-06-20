import { Text, TextProps } from "@chakra-ui/react";

interface HeaderProps extends TextProps {
  title: string;
}

const Header = ({ title, ...props }: HeaderProps) => {
  return (
    <Text fontSize={"24px"} {...props}>
      {title}
    </Text>
  );
};

interface SubheaderProps {
  text: string;
  color?: string;
}

const Subheader = ({ text, color }: SubheaderProps) => {
  return (
    <Text
      fontSize={"16px"}
      fontWeight={"500"}
      color={color ? color : "gray.600"}
    >
      {text}
    </Text>
  );
};

interface BodyProps extends TextProps {
  text: string;
  color?: string;
}

const Body = ({ text, color, ...props }: BodyProps) => {
  return (
    <Text
      fontSize={"14px"}
      fontWeight={"500"}
      color={color ? color : "gray.600"}
      {...props}
    >
      {text}
    </Text>
  );
};

export default {
  Header,
  Subheader,
  Body,
};
