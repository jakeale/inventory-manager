import React from "react";
import {
  Center,
  ChakraProvider,
  Flex,
  Skeleton,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { TableRow } from "../components/TableRow";
import { AddItem } from "../components/AddItem";
import theme from "../styles/theme";
import api from "../backend/ky";
import { Item } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchItems = async () => await api.get("items").json();

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialData: [],
    select: (data) => data as Item[],
  });

  return (
    <ChakraProvider theme={theme}>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex border="2px" borderColor="white">
          {!isLoading && data ? (
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
                  {data.map((item) => (
                    <TableRow
                      name={item.name}
                      key={item.id}
                      price={item.price}
                      quantity={item.quantity}
                    />
                  ))}
                </Tbody>
              </Table>
              <Flex justifyContent="center">
                <AddItem />
              </Flex>
            </TableContainer>
          ) : (
            <Center height="250px" width="500px">
              <Spinner size="lg" />
            </Center>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
