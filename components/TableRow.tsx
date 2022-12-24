import { Button, Td, Tr, ButtonGroup } from "@chakra-ui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import api from "../server/ky";
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
