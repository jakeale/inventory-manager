import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import { Item } from "@prisma/client";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import api from "../backend/ky";
import { EditItemModal } from "./EditItem";

export type TableRowProps = {
  name: string;
  price: number;
  quantity: number;
  refetchItems: () => void;
};

export const TableRow = ({
  name,
  price,
  quantity,
  refetchItems,
}: TableRowProps) => {
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
          <EditItemModal
            name={name}
            price={price}
            quantity={quantity}
            refetchItems={refetchItems}
          />
          <Button colorScheme="red" onClick={() => handleItemDeletion(name)}>
            <AiFillDelete />
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};
