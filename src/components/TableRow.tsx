import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Item } from "../types/items";
import api from "../server/ky";
import { EditItemModal } from "./EditItem";

export type TableRowProps = {
  item: Item;
  refetchItems: () => void;
};

export const TableRow = ({ item, refetchItems }: TableRowProps) => {
  const { name, price, quantity } = item;

  const handleItemDeletion = async (name: string) => {
    await api.delete(`items/${name}`);
    refetchItems();
  };

  return (
    <Tr justifyContent="flex-start">
      <Td>{name}</Td>
      <Td>${price}</Td>
      <Td isNumeric>{quantity}</Td>
      <Td>
        <ButtonGroup>
          <EditItemModal item={item} refetchItems={refetchItems} />
          <Button colorScheme="red" onClick={() => handleItemDeletion(name)}>
            <AiFillDelete />
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
