import { eBayApi } from 'ebay-api';

const ebayClient = new eBayApi({
  appId: import.meta.env.VITE_EBAY_APP_ID,
  certId: import.meta.env.VITE_EBAY_CERT_ID,
  sandbox: false,
});

export async function searchEbayProducts(query: string) {
  try {
    const response = await ebayClient.buy.browse.search({
      q: query,
      limit: 50,
    });
    return response.itemSummaries;
  } catch (error) {
    console.error('eBay API Error:', error);
    throw error;
  }
}

export async function getEbayProductDetails(itemId: string) {
  try {
    const response = await ebayClient.buy.browse.getItem(itemId);
    return response;
  } catch (error) {
    console.error('eBay API Error:', error);
    throw error;
  }
}