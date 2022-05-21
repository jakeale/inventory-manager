import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export type TableRowProps = {
  name: string;
  price: number;
  quantity: number;
};

export const TableRow = ({ name, price, quantity }: TableRowProps) => {
  return (
    <Tr justifyContent="flex-start">
      <Td>{name}</Td>
      <Td>${price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>
        <ButtonGroup>
          <Button colorScheme="yellow">
            <AiFillEdit></AiFillEdit>
          </Button>
          <Button colorScheme="red">
            <AiFillDelete />
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
