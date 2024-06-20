import { BoxProps, Box, Flex, Heading, Text } from "@chakra-ui/react";

interface CustomCardProps extends BoxProps {}

const CustomCard = (props: CustomCardProps) => {
  return (
    <Box
      bg="#fff"
      border="1px solid #E6E6E6"
      borderRadius="16px"
      p="24px 16px"
      {...props}
    >
      {props.children}
    </Box>
  );
};

interface CustomCardHeaderProps {
  title: string;
  description?: string;
  actions?: JSX.Element[];
}

export const CustomCardHeader = ({
  title,
  description,
  actions,
}: CustomCardHeaderProps) => {
  return (
    <Flex align="center" justify="space-between" w="full" mb={7}>
      <Flex direction="column" gap={2}>
        <Heading fontSize="16px" fontWeight="600" color="#141924">
          {title}
        </Heading>
        {description && (
          <Text fontSize="14px" fontWeight="400" color="#616161">
            {description}
          </Text>
        )}
      </Flex>
      <Flex gap={5}>{actions?.map((action) => action)}</Flex>
    </Flex>
  );
};

export default CustomCard;
