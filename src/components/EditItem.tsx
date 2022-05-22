import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import ky from "ky";
import { useEffect, useState } from "react";
import { Item } from "../App";
import { AddWarehouse } from "./AddWarehouse";
import { AiFillEdit } from "react-icons/ai";

type EditItemProps = {
  name: string;
};

export const EditItem = ({ name }: EditItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialState = { name: "", price: "", quantity: "" };
  const [input, setInput] = useState(initialState);
  const [warehouses, setWarehouses] = useState([]);

  const handleInputChange = (e: { target: { value: string; id: string } }) => {
    const value = e.target.value;

    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  useEffect(() => {
    const fetchWarehouses = async () => {
      const items: [] = await ky.get("/warehouses").json();

      setWarehouses(items);
    };

    fetchWarehouses();
  }, []);

  const handleEditItems = async (newItem: Item) => {
    await ky.put(`/items/${name}`, { json: newItem });
  };

  const handleAddButtonClick = () => {
    const newItem = {
      name: input.name,
      price: parseFloat(input.price),
      quantity: parseInt(input.quantity),
    };

    if (isNaN(newItem.price) || isNaN(newItem.quantity)) {
      return;
    }

    handleEditItems(newItem);
    onClose();
    setInput(initialState);
  };

  const isInvalid = (field: string) => {
    return field === "";
  };

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen}>
        <AiFillEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={input.name}
                onChange={handleInputChange}
                isInvalid={isInvalid(input.name)}
              />
              <FormLabel htmlFor="price">Price</FormLabel>
              <Input
                id="price"
                value={input.price}
                onChange={handleInputChange}
                isInvalid={isInvalid(input.price)}
              />
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <Input
                id="quantity"
                value={input.quantity}
                onChange={handleInputChange}
                isInvalid={isInvalid(input.quantity)}
              />
              <FormLabel htmlFor="warehouse" marginTop="2px">
                Warehouse <AddWarehouse></AddWarehouse>
              </FormLabel>
              <Select id="warehouse" placeholder="Select warehouse">
                {warehouses.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={handleAddButtonClick}
              isDisabled={Object.values(input).some(isInvalid)}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
