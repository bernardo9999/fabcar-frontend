import "./App.css";
import React, { useEffect } from "react";
import InputTable from "./InputTable";
import axios from "axios";
import { useLocalDB } from "./context/LocalDB";

function App() {
  const { tableItem, setTableITem, setOpen, setMSG } = useLocalDB();

  useEffect(FetchData, []);

  const url = "http://167.71.249.87:8000/fabcar/";
  const path = {
    getall: "getAll/",
    create: "create/",
    getHisCar: "getHistoryCar/",
    changeOwn: "changeOwner/",
    getOne: "queryOne/",
    delete: "delete/",
  };

  function FetchData() {
    fetch(`${url}${path.getall}`)
      .then((res) => {
        return axios.get(res.url);
      })
      .then((res) => setTableITem([...res.data]))
      .catch((error) => console.log(error));
  }

  function Table() {
    function handleDelete(id, itemindex) {
      const tablereturn = tableItem.filter((item, index) => {
        if (index !== itemindex) return true;
      });
      fetch(`${url}${path.delete}${id}`)
        .then((res) => axios.delete(res.url))
        .catch((error) => console.log(error));
      setTableITem(tablereturn);
      FetchData();
      setOpen(true);
      setMSG("Deletado com Sucesso!");
    }
    return (
      <table className="ui single line table">
        <tr>
          <th>ID</th>
          <th>MAKE</th>
          <th>MODEL</th>
          <th>COLOUR</th>
          <th>OWNER</th>
        </tr>
        {tableItem
          ? tableItem.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item._make}</td>
                  <td>{item._model}</td>
                  <td>{item._colour}</td>
                  <td>{item._owner}</td>
                  <button onClick={() => handleDelete(item._id, index)}>DEL</button>
                </tr>
              );
            })
          : null}
      </table>
    );
  }

  return (
    <div className="App">
      <div className="formulario">
        <InputTable />
        <Table />
      </div>
    </div>
  );
}

export default App;
