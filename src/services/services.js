import axios from "axios";

const url = "http://167.71.249.87:8000/fabcar/";
const path = {
  getall: "getAll/",
  create: "create/",
  getHisCar: "getHistoryCar/",
  changeOwn: "changeOwner/",
  getOne: "queryOne/",
};

export const getall = async () => {
  const getall = await axios
    .get(`${url}${path.getall}`)
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};
export const getOne = (id) => {
  fetch(`${url}${path.getOne}${id}`)
    .then((res) => axios.get(res.url))
    .catch((error) => console.log(error));
};
export const addData = (item) => {
  fetch(`${url}${path.create}`)
    .then((res) => axios.post(res.url, item))
    .catch((error) => console.log(error));
};
export const getHistoryCar = (id) => {
  fetch(`${url}${path.getHisCar}${id}`)
    .then((res) => axios.get(res.url))
    .catch((error) => console.log(error));
};
export const changeOwner = (id, item) => {
  fetch(`${url}${path.changeOwn}${id}`)
    .then((res) => axios.post(res.url, item))
    .catch((error) => console.log(error));
};
