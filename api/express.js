import express from "express";
import { readFile, writeFile } from "fs/promises";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(`./public`));
}

const writeItems = async (items) => {
  writeFile(
    new URL("./items.json", import.meta.url),
    JSON.stringify(items, null, 2)
  );
};

const readItems = async () => {
  return readFile(new URL("./items.json", import.meta.url));
};

const getItems = async () => {
  return JSON.parse(await readItems());
};

const addItem = async (newItem) => {
  const items = await getItems();

  const name = newItem.name;

  if (name in items["items"]) {
    if (newItem.price != items["items"].name.price) {
      return false;
    }

    items["items"].name.quantity += newItem.quantity;
  } else {
    items["items"][name] = {
      price: newItem.price,
      quantity: newItem.quantity,
    };
  }

  await writeItems(items);

  return true;
};

const editItem = async (name, item) => {
  const items = await getItems();

  const updatedItem = { price: item.price, quantity: item.quantity };
  items["items"][name] = updatedItem;

  await writeItems(items);
};

const deleteItem = async (name) => {
  const items = await getItems();
  delete items["items"][name];
  await writeItems(items);
};

app.get("/items", async (req, res) => {
  res.send((await getItems())["items"]);
});

app.post("/items/:name", async (req, res) => {
  const success = await addItem(await req.body);

  if (success) {
    res.status(201).send();
    return;
  }

  res
    .status(400)
    .send("Existing item cannot be updated as the prices are different");
});

app.put("/items/:name", async (req, res) => {
  await editItem(req.params.name, await req.body);
  res.status(200).send();
});

app.delete("/items/:name", async (req, res) => {
  await deleteItem(req.params.name);
  res.status(200).send();
});

const addWarehouse = async (name) => {
  const items = await getItems();

  if (!items["warehouses"].includes(name)) {
    items["warehouses"].push(name);
  }

  await writeItems(items);
};

app.get("/warehouses", async (req, res) => {
  res.send((await getItems())["warehouses"]);
});

app.post("/warehouses/:name", async (req, res) => {
  await addWarehouse(req.params.name);

  res.status(201).send();
});
