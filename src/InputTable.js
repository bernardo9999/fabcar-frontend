import React, { useCallback, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useLocalDB } from "./context/LocalDB";
import axios from "axios";

const initialState = () => {
  return { _id: "", _make: "", _model: "", _color: "", _owner: "" };
};
const url = "http://167.71.249.87:8000/fabcar/";
const path = {
  getall: "getAll/",
  create: "create/",
  getHisCar: "getHistoryCar/",
  changeOwn: "changeOwner/",
  getOne: "queryOne/",
};

function InputTable() {
  const { tableItem, setTableITem, setOpen, setMSG } = useLocalDB();
  const [item, setItem] = useState(initialState());

  const FetchData = useCallback(
    function FetchData() {
      axios(`${url}${path.getall}`)
        .then((res) => setTableITem(JSON.parse(res.data.response)))
        .catch((error) => console.log(error));
    },
    [setTableITem]
  );

  // useEffect(() => {
  //   FetchData();
  // }, [FetchData, tableItem, setTableITem]);

  function AddItem(e) {
    e.preventDefault();
    const itemreturn = {
      id: tableItem ? "CAR" + (tableItem.length + 1) : item._id,
      make: item._make,
      model: item._model,
      color: item._color,
      owner: item._owner,
    };
    fetch(`${url}${path.create}`)
      .then((res) => {
        axios.post(res.url, itemreturn);
      })
      .catch((error) => console.log(error));
    setItem(initialState());
    setTimeout(() => {
      FetchData();
    }, 5000);
    setMSG("Adicionado com Sucesso!");
    setOpen(true);
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setItem({
      ...item,
      [name]: value,
    });
  }

  return (
    <form noValidate autoComplete="off">
      <TextField
        placeholder="ID"
        key="id"
        type="text"
        name="Key"
        value={tableItem ? "CAR" + (tableItem.length + 1) : item.Key}
      />
      <TextField
        key="make"
        placeholder="MAKE"
        type="text"
        name="_make"
        value={item._make}
        onChange={handleChange}
      />
      <TextField
        placeholder="MODEL"
        key="model"
        type="text"
        name="_model"
        value={item._model}
        onChange={handleChange}
      />
      <TextField
        placeholder="COLOR"
        key="color"
        type="text"
        name="_color"
        value={item._color}
        onChange={handleChange}
      />
      <TextField
        placeholder="OWNER"
        key="owner"
        type="text"
        name="_owner"
        value={item._owner}
        onChange={handleChange}
      />
      <Button
        onClick={AddItem}
        variant="contained"
        color="default"
        style={{ backgroundColor: "lightgreen", fontWeight: "bold" }}
      >
        ADD
      </Button>
    </form>
  );
}
export default InputTable;
