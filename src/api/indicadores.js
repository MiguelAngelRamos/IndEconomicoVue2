import { API_URL } from "@/utils/urls";
import axios from 'axios';

export const indicadoresEconomicos = async (query) => {
  try {
    const indicador = await axios.get(`${API_URL}/${query}`);
    console.log(indicador.data);
    return indicador.data;
  } catch (error) {
    console.log(error);
    throw error;
  }

}