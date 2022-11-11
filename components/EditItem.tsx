import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import api from "../backend/ky";
import { NewItem as Item } from "../types/items";

type EditItemProps = {
  name: string;
};

export const EditItem = ({ name }: EditItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isInvalid = {
    name: useRef(false),
    price: useRef(false),
    quantity: useRef(false),
  };

  const [input, setInput] = useState<Item>({
    name: "",
    price: "",
    quantity: "",
  });

  const handleClose = () => {
    onClose();

    for (const field in isInvalid) {
      isInvalid[field as keyof typeof isInvalid].current = false;
    }

    setInput({ name: "", price: "", quantity: "" });
  };

  const handleInputChange = (e: { target: { value: string; id: string } }) => {
    const value = e.target.value.replace(/^\$/, "");

    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleEditItems = async (newItem: Item) => {
    await api.put(`/items/${name}`, { json: newItem });
  };

  const isInvalidForm = () => {
    let invalid = false;

    for (const field in input) {
      if (["", 0].includes(input[field as keyof Item])) {
        isInvalid[field as keyof typeof isInvalid].current = true;
        invalid = true;
      } else {
        isInvalid[field as keyof typeof isInvalid].current = false;
      }
    }

    return invalid;
  };

  const handleSaveButtonClick = () => {
    const newItem = {
      name: input.name,
      price: input.price,
      quantity: input.quantity,
    };

    if (isInvalidForm()) {
      return;
    }

    handleEditItems(newItem);
    handleClose();
  };

  return (
    <>
      <Button colorScheme="yellow" onClick={onOpen}>
        Edit Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={Object.values(isInvalid).some((item) => item)}
              isRequired
            >
              <FormLabel htmlFor="name" marginBottom={2}>
                Name
              </FormLabel>
              <Input
                id="name"
                value={input.name}
                onChange={handleInputChange}
                isInvalid={isInvalid.name.current}
                placeholder="coffee"
                marginBottom={1}
              />
              <FormLabel htmlFor="price">Price</FormLabel>
              <NumberInput
                id="price"
                value={input.price && "$" + input.price}
                precision={2}
                isInvalid={isInvalid.price.current}
                placeholder="$9.99"
                marginBottom={1}
              >
                <NumberInputField onChange={handleInputChange} />
                {isInvalid.price.current && (
                  <FormErrorMessage>Invalid price</FormErrorMessage>
                )}
              </NumberInput>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <NumberInput
                id="quantity"
                value={input.quantity}
                isInvalid={isInvalid.quantity.current}
                placeholder="10"
              >
                <NumberInputField onChange={handleInputChange}>
                  {isInvalid.quantity.current && (
                    <FormErrorMessage>Invalid quantity</FormErrorMessage>
                  )}
                </NumberInputField>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleSaveButtonClick}>
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
