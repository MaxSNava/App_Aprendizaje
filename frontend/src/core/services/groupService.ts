import axios from "axios";

export const getGroups = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API}/grupos`);
  return response.data;
};

export const createGroup = async (data: {
  nombre: string;
  descripcion: string;
}) => {
  const response = await axios.post(`${import.meta.env.VITE_API}/grupos`, data);
  return response.data;
};
