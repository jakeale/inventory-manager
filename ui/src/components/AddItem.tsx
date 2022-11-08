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
import ky from "ky";
import React from "react";
import { useReducer, useRef, useState } from "react";
import { Item } from "../App";

export const AddItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
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

  const handleInputChange = (e: { target: { value: any; id: any } }) => {
    const value = e.target.value.replace(/^\$/, "");

    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleAddItems = async (newItem: Item) => {
    await ky.post(`/items/${newItem.name}`, { json: newItem });
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

  const handleAddButtonClick = () => {
    const newItem = {
      name: input.name,
      price: input.price,
      quantity: input.quantity,
    };

    if (isInvalidForm()) {
      forceUpdate();
      return;
    }

    handleAddItems(newItem);
    handleClose();
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
                placeholder="matcha"
                marginBottom={1}
              />
              {isInvalid.name.current && (
                <FormErrorMessage>Name is required</FormErrorMessage>
              )}

              <FormLabel htmlFor="price" marginTop={2} marginBottom={2}>
                Price
              </FormLabel>
              <NumberInput
                id="price"
                value={input.price && "$" + input.price}
                precision={2}
                isInvalid={isInvalid.price.current}
                placeholder="number"
                marginBottom={1}
              >
                <NumberInputField onChange={handleInputChange} />

                {isInvalid.price.current && (
                  <FormErrorMessage>Invalid price</FormErrorMessage>
                )}
              </NumberInput>

              <FormLabel htmlFor="quantity" marginTop={2} marginBottom={2}>
                Quantity
              </FormLabel>
              <NumberInput
                id="quantity"
                value={input.quantity}
                isInvalid={isInvalid.quantity.current}
                placeholder="10"
              >
                <NumberInputField onChange={handleInputChange} />
                {isInvalid.quantity.current && (
                  <FormErrorMessage>Invalid quantity</FormErrorMessage>
                )}
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddButtonClick}>
              Add
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};