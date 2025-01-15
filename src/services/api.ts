import axios from 'axios';

const api = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1/carros',
  timeout: 10000, 
});

export const fetchBrands = async () => {
  try {
    const response = await api.get('/marcas'); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch brands');
  }
};

export const fetchModels = async (brandCode: string) => {
  try {
    const response = await api.get(`/marcas/${brandCode}/modelos`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch models for brand: ${brandCode}`);
  }
};
