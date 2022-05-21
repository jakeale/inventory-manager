import {
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddItem } from "./components/AddItem";
import { TableRow } from "./components/TableRow";
import data from "./items.json";

function App() {
  const [items, setItems] = useState(data.items);

  const handleSetItems = (newItem: {
    name: string;
    price: number;
    quantity: number;
  }) => {
    const newItems = [...items, newItem];

    setItems(newItems);
  };

  return (
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
                  key={item.name}
                  price={item.price}
                  quantity={item.quantity}
                ></TableRow>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent="center">
            <AddItem handleSetItems={handleSetItems} />
          </Flex>
        </TableContainer>
      </Flex>
    </Flex>
  );
}

export default App;
