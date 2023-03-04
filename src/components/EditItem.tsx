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
import React, { useReducer, useRef, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import api from "../server/ky";
import { Item } from "../types/items";
import { TableRowProps } from "./TableRow";

export const EditItemModal = ({ item, refetchItems }: TableRowProps) => {
  const { name, price, quantity } = item;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const isInvalid = {
    name: useRef(false),
    price: useRef(false),
    quantity: useRef(false),
  };

  const [input, setInput] = useState({
    name: name,
    price: price.toString(),
    quantity: quantity.toString(),
  });

  const resetInvalidState = () => {
    for (const field in isInvalid) {
      isInvalid[field as keyof typeof isInvalid].current = false;
    }
  };

  const handleClose = () => {
    onClose();
    resetInvalidState();
  };

  const handleInputChange = (e: { target: { value: string; id: string } }) => {
    const value = e.target.value.replace(/^\$/, "");

    setInput({
      ...input,
      [e.target.id]: value,
    });
  };

  const handleEditItems = async (newItem: Item) => {
    await api.put(`items/${newItem.name}`, { json: newItem });
    refetchItems();
  };

  const parseForm = () => {
    const newItem = Item.safeParse(input);

    if (!newItem.success) {
      newItem.error.issues.forEach((issue) => {
        isInvalid[issue.path[0] as keyof typeof isInvalid].current = true;
      });

      return null;
    }

    return newItem.data;
  };

  const handleSaveButtonClick = () => {
    resetInvalidState();
    const newItem = parseForm();

    if (!newItem) {
      forceUpdate();
      return;
    }

    handleEditItems(newItem);
    handleClose();
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
                isDisabled
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
                placeholder="$9.99"
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
