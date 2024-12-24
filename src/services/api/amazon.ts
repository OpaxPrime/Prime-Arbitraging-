import { AmazonProductApi } from 'amazon-product-api';

const amazonClient = new AmazonProductApi({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  region: 'US',
});

export async function searchAmazonProducts(query: string) {
  try {
    const response = await amazonClient.itemSearch({
      keywords: query,
      responseGroup: 'ItemAttributes,Offers,Images',
    });
    return response;
  } catch (error) {
    console.error('Amazon API Error:', error);
    throw error;
  }
}

export async function getAmazonProductDetails(asin: string) {
  try {
    const response = await amazonClient.itemLookup({
      itemId: asin,
      responseGroup: 'ItemAttributes,Offers,Images,Reviews',
    });
    return response;
  } catch (error) {
    console.error('Amazon API Error:', error);
    throw error;
  }
}