import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-api-y04b.onrender.com', 
  timeout: 10000, 
});


export const signIn = async (user: string, password: string) => {
  try {
    const response = await api.post('/signIn', { user, password });

    return response.data;
  } catch (error: any) {
    console.error('Erro no login:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Erro ao realizar login');
  }
};

export const fetchBrands = async () => {
  try {
    const response = await axios.get('https://parallelum.com.br/fipe/api/v1/carros/marcas');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao listar marcas:', error.response ? error.response.data : error.message);
    throw new Error('Erro ao listar marcas');
  }
};

export const fetchModels = async (brandCode: string) => {
  try {
    const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`);
    return response.data;
  } catch (error: any) {
    console.error(`Erro ao listar modelos da marca ${brandCode}:`, error.response ? error.response.data : error.message);
    throw new Error(`Erro ao listar modelos da marca ${brandCode}`);
  }
};
