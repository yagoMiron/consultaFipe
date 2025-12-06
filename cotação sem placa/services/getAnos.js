import axios from "axios";

const API_URL = "https://fipe.parallelum.com.br/api/v2";

const getAnos = async (vehicleType, brandId, modelId) => {
  try {
    const response = await axios.get(
      `${API_URL}/${vehicleType}/brands/${brandId}/models/${modelId}/years`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default getAnos;
