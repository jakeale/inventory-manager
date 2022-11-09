import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import ky from "ky";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Item } from "../App";
import { EditItem } from "./EditItem";

export type TableRowProps = {
  name: string;
  price: number;
  quantity: number;
  handleSetItems: (newItem: Item) => void;
};

export const TableRow = ({
  name,
  price,
  quantity,
  handleSetItems,
}: TableRowProps) => {
  const handleItemDeletion = async (name: string) => {
    await ky.delete(`/items/${name}`);
  };

  return (
    <Tr justifyContent="flex-start">
      <Td>{name}</Td>
      <Td>${price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>
        <ButtonGroup>
          <EditItem name={name} />
          <Button colorScheme="red" onClick={() => handleItemDeletion(name)}>
            <AiFillDelete />
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
