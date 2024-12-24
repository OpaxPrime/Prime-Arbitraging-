import axios from 'axios';

const walmartClient = axios.create({
  baseURL: 'https://marketplace.walmartapis.com/v3',
  headers: {
    'WM_SEC.ACCESS_TOKEN': import.meta.env.VITE_WALMART_ACCESS_TOKEN,
    'WM_QOS.CORRELATION_ID': 'test',
    'Accept': 'application/json',
  },
});

export async function searchWalmartProducts(query: string) {
  try {
    const response = await walmartClient.get('/items/search', {
      params: { query, limit: 50 }
    });
    return response.data.items;
  } catch (error) {
    console.error('Walmart API Error:', error);
    throw error;
  }
}

export async function getWalmartProductDetails(itemId: string) {
  try {
    const response = await walmartClient.get(`/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Walmart API Error:', error);
    throw error;
  }
}