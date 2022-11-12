import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import api from "../backend/ky";
import { EditItem } from "./EditItem";

export type TableRowProps = {
  name: string;
  price: number;
  quantity: number;
};

export const TableRow = ({ name, price, quantity }: TableRowProps) => {
  const handleItemDeletion = async (name: string) => {
    await api.delete(`items/${name}`);
  };

  return (
    <Tr justifyContent="flex-start">
      <Td>{name}</Td>
      <Td>${price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>
        <ButtonGroup>
          <EditItem name={name} price={price} quantity={quantity} />
          <Button colorScheme="red" onClick={() => handleItemDeletion(name)}>
            <AiFillDelete />
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
