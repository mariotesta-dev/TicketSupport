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

const getProfile = async (email) => {
	const response = await fetch(DOMAIN_URL + `/profiles/${email}`);
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const updateProfile = async (email, profile) => {
	const response = await fetch(DOMAIN_URL + `/profiles/${email}`, {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(profile),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

const createProfile = async (profile) => {
	const response = await fetch(DOMAIN_URL + `/profiles`, {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify(profile),
	});
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

export const productsAPI = { getProducts, getProduct };

export const profilesAPI = { getProfile, updateProfile, createProfile };
