import "./App.css";
import React, { useCallback, useEffect } from "react";
import InputTable from "./InputTable";
import axios from "axios";
import { useLocalDB } from "./context/LocalDB";
import { Button } from "@material-ui/core";

function App() {
  const { tableItem, setTableITem, setOpen, setMSG } = useLocalDB();

  const url = "http://167.71.249.87:8000/fabcar/";
  const path = {
    getall: "getAll/",
    create: "create/",
    getHisCar: "getHistoryCar/",
    changeOwn: "changeOwner/",
    getOne: "queryOne/",
    delete: "delete/",
  };

  // function FetchData() {
  //   fetch(`${url}${path.getall}`)
  //     .then((res) => {
  //       return axios.get(res.url);
  //     })
  //     .then((res) => setTableITem([...res.data]))
  //     .catch((error) => console.log(error));
  // }

  const FetchData = useCallback(
    function FetchData() {
      axios(`${url}${path.getall}`)
        .then((res) => setTableITem(JSON.parse(res.data.response)))
        .catch((error) => console.log(error));
    },
    [path.getall, setTableITem]
  );

  useEffect(() => {
    FetchData();
  }, [FetchData]);
  function Table() {
    return (
      <table className="ui single line table">
        <thead>
          <tr>
            <th>ID</th>
            <th>MAKE</th>
            <th>MODEL</th>
            <th>COLOR</th>
            <th>OWNER</th>
          </tr>
        </thead>
        {tableItem
          ? tableItem.map((item, index) => {
              return (
                <tbody key={item.Key}>
                  <tr>
                    <td>{item.Key}</td>
                    <td>{item.Record.make}</td>
                    <td>{item.Record.model}</td>
                    <td>{item.Record.color}</td>
                    <td>{item.Record.owner}</td>
                    <td>
                      <Button
                        variant="outlined"
                        color="default"
                        style={{ borderColor: "red", color: "red" }}
                        onClick={() => {
                          fetch(`${url}${path.delete}${item.Key}`)
                            .then((res) => axios.delete(res.url))
                            .catch((error) => console.log(error));
                          setTimeout(() => {
                            FetchData();
                          }, 5000);
                          setOpen(true);
                          setMSG("Deletado com Sucesso!");
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
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
