import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getMarcas = async (vehicleType) => {
  try {
    const response = await axios.get(`${API_URL}/${vehicleType}/brands`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getMarcas;
