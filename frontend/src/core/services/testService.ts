import axios from "axios";

export const createTest = async (data: {
  name: string;
  email: string;
  groupId?: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API}/usuarios`,
    data
  );
  return response.data;
};
