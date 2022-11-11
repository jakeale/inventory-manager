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
import { Item } from "@prisma/client";

export default function Home() {
  const initialState: Item[] = [];
  const [items, setItems] = useState(initialState);

  useEffect(() => {
    const fetchItems = async () => {
      const items: Item[] = await api.get("items").json();

      setItems(items);
    };

    fetchItems();
  }, []);

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
                {items.map((item) => (
                  <TableRow
                    name={item.name}
                    key={item.id}
                    price={item.price}
                    quantity={item.quantity}
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
