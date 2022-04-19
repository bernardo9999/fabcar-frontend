import React, { createContext, useState, useContext } from "react";

const LocalDBContext = createContext();

const initialState = () => {
  return { id: "", make: "", model: "", colour: "", owner: "" };
};

export default function LocalDBProvider({ children }) {
  const [item, setItem] = useState(initialState());
  const [tableItem, setTableITem] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMSG] = useState();

  return (
    <LocalDBContext.Provider
      value={{
        item,
        setItem,
        tableItem,
        setTableITem,
        open,
        setOpen,
        msg,
        setMSG,
      }}
    >
      {children}
    </LocalDBContext.Provider>
  );
}

export function useLocalDB() {
  const context = useContext(LocalDBContext);
  if (!context) throw new Error("useImport precisa de um Arquivo importado");
  const { item, setItem, tableItem, setTableITem, open, setOpen, msg, setMSG } = context;
  return {
    item,
    setItem,
    tableItem,
    setTableITem,
    open,
    setOpen,
    msg,
    setMSG,
  };
}
