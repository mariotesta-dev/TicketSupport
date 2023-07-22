const DOMAIN_URL = "http://localhost:8081";
const API_URL = DOMAIN_URL + "/API";

const jwtToken = localStorage.getItem("jwtToken");

const createNewTicket = async (ticket) => {
	const response = await fetch(API_URL + "/tickets", {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(ticket),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const getProducts = async () => {
	const response = await fetch(API_URL + "/products");
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const getProduct = async (ean) => {
	const response = await fetch(API_URL + `/products/${ean}`);
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const login = async (credentials) => {
	const response = await fetch(DOMAIN_URL + `/auth/login`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(credentials),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const signUp = async (userInfo) => {
	const response = await fetch(DOMAIN_URL + `/auth/signup`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(userInfo),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const getCustomer = async (email) => {
	const response = await fetch(API_URL + `/customers/${email}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${jwtToken}`,
		},
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

// TODO: IMPLEMENT GET EXPERT ON BACKEND
const getExpert = async (email) => {
	const response = await fetch(API_URL + `/experts/get/${email}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${jwtToken}`,
		},
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

export const authAPI = { login, signUp };

export const productsAPI = { getProducts, getProduct };

export const customersAPI = { getCustomer, getExpert };

export const ticketsAPI = { createNewTicket };
