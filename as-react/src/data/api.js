import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProductById = async (id, updatedProduct) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return response.data;
};

export const deleteProductById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
