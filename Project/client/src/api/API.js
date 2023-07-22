import { RestMethods } from './RestMethods.js';


const DOMAIN_URL = "http://localhost:8081";
const API_URL = DOMAIN_URL + "/API";

const rest = new RestMethods(API_URL);

const createNewTicket = async (ticket) => {
	const data = await rest.post({
		endpoint: "/tickets",
		body: ticket,
		authenticated: true,
	});

	return data;
};

const getProducts = async () => {
	const data = await rest.get({
		endpoint: "/products",
		authenticated: true,
	});

	return data;
};

const getProduct = async (ean) => {
	const data = await rest.get({
		endpoint: `/products/${ean}`,
	});

	return data;
};

const login = async (credentials) => {
	const data = await rest.post({
		baseUrl: DOMAIN_URL,
		endpoint: `/auth/login`,
		body: credentials,
	});

	return data;
};

const signUp = async (userInfo) => {
	const data = await rest.post({
		baseUrl: DOMAIN_URL,
		endpoint: `/auth/signup`,
		body: userInfo,
	});

	return data;
};

const getCustomer = async (email) => {
	const data = await rest.get({
		endpoint: `/customers/${email}`,
		authenticated: true,
	});

	return data;
};

// TODO: IMPLEMENT GET EXPERT ON BACKEND
const getExpert = async (email) => {
	const data = await rest.get({
		endpoint: `/experts/get/${email}`,
		authenticated: true,
	});

	return data;
};

export const authAPI = { login, signUp };

export const productsAPI = { getProducts, getProduct };

export const customersAPI = { getCustomer, getExpert };

export const ticketsAPI = { createNewTicket };
