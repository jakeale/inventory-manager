import React from "react";
import {
  ChakraProvider,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TableRow } from "../components/TableRow";
import { AddItem } from "../components/AddItem";
import theme from "../styles/theme";
import api from "../backend/ky";

type Items = {
  [key: string]: {
    price: number;
    quantity: number;
  };
};

export type Item = {
  name: string;
  price: number | string;
  quantity: number | string;
};

export default function Home() {
  const initialState: Items = {};
  const [items, setItems] = useState(initialState);

  useEffect(() => {
    const fetchItems = async () => {
      const items: Items = await api.get("/items").json();

      setItems(items);
    };

    fetchItems();
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex border="2px" borderColor="white">
          <TableContainer>
            <Table variant="striped" size="lg">
              <TableCaption placement="top">
                Inventory Tracking Application
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(items).map((key) => (
                  <TableRow
                    name={key}
                    key={key}
                    price={items[key]["price"]}
                    quantity={items[key]["quantity"]}
                  ></TableRow>
                ))}
              </Tbody>
            </Table>
            <Flex justifyContent="center">
              <AddItem />
            </Flex>
          </TableContainer>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
