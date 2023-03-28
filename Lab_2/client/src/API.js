const DOMAIN_URL = "/API";
const getProducts = async () => {
    const response = await fetch(DOMAIN_URL + "/products");
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
};

const getProduct = async (ean) => {
    const response = await fetch(DOMAIN_URL + `/products/${ean}`);
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw data;
    }
};

export const productsAPI = {getProducts, getProduct}