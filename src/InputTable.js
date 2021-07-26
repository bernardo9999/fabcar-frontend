import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { useLocalDB } from "./context/LocalDB";
import axios from "axios";

const initialState = () => {
  return { _id: "", _make: "", _model: "", _colour: "", _owner: "" };
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

  function FetchData() {
    fetch(`${url}${path.getall}`)
      .then((res) => {
        return axios.get(res.url);
      })
      .then((res) => setTableITem([...res.data]))
      .catch((error) => console.log(error));
  }

  function AddItem(e) {
    e.preventDefault();
    const itemreturn = {
      car: {
        _id: tableItem ? tableItem.length + 1 : item._id,
        _make: item._make,
        _model: item._model,
        _colour: item._colour,
        _owner: item._owner,
      },
    };
    fetch(`${url}${path.create}`)
      .then((res) => axios.post(res.url, itemreturn))
      .catch((error) => console.log(error));
    setItem(initialState());
    FetchData();
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
        name="_id"
        value={tableItem ? tableItem.length + 1 : item._id}
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
        placeholder="COLOUR"
        key="colour"
        type="text"
        name="_colour"
        value={item._colour}
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
      <button onClick={AddItem}>ADD</button>
    </form>
  );
}
export default InputTable;
