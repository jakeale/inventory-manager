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
import { useEffect, useState } from "react";
import { AddItem } from "./components/AddItem";
import { TableRow } from "./components/TableRow";
import ky from "ky";

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

function App() {
  const initialState: Items = {};
  const [items, setItems] = useState(initialState);

  const handleSetItems = async (newItem: Item) => {
    await ky.post(`/items/${newItem.name}`, { json: newItem });
  };

  useEffect(() => {
    const fetchItems = async () => {
      const items: Items = await ky.get("/items").json();

      setItems(items);
    };

    fetchItems();
  });

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
              {Object.keys(items).map((key) => (
                <TableRow
                  name={key}
                  key={key}
                  price={items[key]["price"]}
                  quantity={items[key]["quantity"]}
                  handleSetItems={handleSetItems}
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
  );
}

export default App;
