import api from "./axios";

const { api_rest, coords } = api;

export async function getData() {
  const data = await api_rest.get();
  return data;
}

export async function getCoords() {
  const data = await coords.get();
  return data;
}
