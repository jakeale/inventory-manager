import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export type AddItemFormProps = {
  onFormSubmission: (newItem: {
    name: string;
    price: number;
    quantity: number;
  }) => void;
};

export const AddItemForm = ({ onFormSubmission }: AddItemFormProps) => {
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

    console.log(newItem);

    onFormSubmission(newItem);
  };

  const isInvalid = (field: string) => {
    return field === "";
  };

  return (
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
  );
};
