import { AddIcon } from "@chakra-ui/icons";
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
import ky from "ky";
import { useState } from "react";

export const AddWarehouse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState("");

  const handleInputChange = (e: { target: { value: string; id: string } }) => {
    const value = e.target.value;

    setInput(value);
  };

  const handleWarehouseAddButtonClick = async () => {
    await ky.post(`/warehouses/${input}`);
    onClose();
  };

  const isInvalid = (field: string) => {
    return field === "";
  };

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                value={input}
                onChange={handleInputChange}
                isInvalid={isInvalid(input)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleWarehouseAddButtonClick}
              isDisabled={isInvalid(input)}
              type="button"
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
