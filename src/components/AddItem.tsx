import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

type AddItemProps = {
  handleSetItems: (newItem: {
    name: string;
    price: number;
    quantity: number;
  }) => void;
};

export const AddItem = ({ handleSetItems }: AddItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [input, setInput] = useState({ name: "", price: "", quantity: "" });

  const handleInputChange = (e: { target: { value: string; id: string } }) => {
    const value = e.target.value;

    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleFormSubmission = (e: {
    name: string;
    price: string;
    quantity: string;
  }) => {
    const newItem = {
      name: e.name,
      price: parseFloat(e.price),
      quantity: parseInt(e.quantity),
    };
  };

  const handleAddButtonClick = () => {
    onClose();

    const newItem = {
      name: input.name,
      price: parseFloat(input.price),
      quantity: parseInt(input.quantity),
    };

    handleSetItems(newItem);
  };

  const isInvalid = (field: string) => {
    return field === "";
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Add Item
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={() => handleFormSubmission(input)}>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddButtonClick}
              isDisabled={Object.values(input).some(isInvalid)}
            >
              Add
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
