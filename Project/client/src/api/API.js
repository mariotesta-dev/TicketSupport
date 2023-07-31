import { RestMethods } from "./RestMethods.js";
import { History } from "../entities/History.js";

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

const getManager = async (email) => {
	const data = await rest.get({
		endpoint: `/managers/${email}`,
		authenticated: true,
	});

	return data;
};

const getMessages = async (ticketId) => {
	const data = await rest.get({
		endpoint: `/tickets/${ticketId}/messages`,
		authenticated: true,
	});

	return data;
};

const getTickets = async () => {
	const data = await rest.get({
		endpoint: `/tickets`,
		authenticated: true,
	});

	return data;
};

const getTicketHistory = async (ticketId) => {
	const statusList = await rest.get({
		endpoint: `/history/${ticketId}`,
		authenticated: true,
	});

	const messages = await rest.get({
		endpoint: `/tickets/${ticketId}/messages`,
		authenticated: true,
	});

	const data = new History(messages, statusList);

	return data.getHistory();
};

const sendMessage = async (message) => {
	const data = await rest.post({
		endpoint: "/messages",
		body: message,
		authenticated: true,
	});

	return data;
};

const getAllExpertsByExpertise = async (expertise) => {
	const data = await rest.get({
		endpoint: `/experts/expertise/${expertise}`,
		authenticated: true,
	});

	return data;
};

const getAllExperts = async () => {
	const data = await rest.get({
		endpoint: `/experts`,
		authenticated: true,
	});

	return data;
};

const assignTicketToExpert = async (ticketId, expertId, priority) => {
	const data = await rest.put({
		endpoint: `/tickets/${ticketId}/expert`,
		body: { priority: priority, expert: { id: expertId } },
		authenticated: true,
	});
	return data;
};

const updateCustomer = async (email, customer) => {
	const data = await rest.put({
		endpoint: `/customers/${email}`,
		body: customer,
		authenticated: true,
	});
	return data;
};

// When a product gets bought, a warranty is created by a manager
const createWarranty = async (warranty) => {
	const data = await rest.post({
		endpoint: "/warranties",
		body: warranty,
		authenticated: true,
	});

	return data;
};

// When a product gets bought, a warranty is created by a manager
const createProduct = async (productInsertion) => {
	const data = await rest.post({
		endpoint: "/products",
		body: productInsertion,
		authenticated: true,
	});

	return data;
};

const subscribeProduct = async (ean, userId) => {
	const data = await rest.put({
		endpoint: `/warranties/${ean}/subscribe`,
		body: { id: userId },
		authenticated: true,
	});
	return data;
};

const extendWarranty = async (ean, newDate) => {
	const data = await rest.put({
		endpoint: `/warranties/${ean}/extend`,
		body: { newEndOfWarranty: newDate },
		authenticated: true,
	});
	return data;
};

const changeTicketStatus = async (ticketId, status) => {
	const data = await rest.post({
		endpoint: `/history/${status}/${ticketId}`,
		authenticated: true,
	});
	return data;
};

const changeTicketPriority = async (ticketId, priority) => {
	const data = await rest.post({
		endpoint: `/tickets/${ticketId}/priority/${priority}`,
		authenticated: true,
	});
	return data;
};

export const authAPI = { login, signUp };

export const productsAPI = { getProducts, getProduct, createProduct };

export const warrantiesAPI = {
	createWarranty,
	subscribeProduct,
	extendWarranty,
};

export const usersAPI = { getCustomer, getExpert, getManager, updateCustomer };

export const managersAPI = { getAllExpertsByExpertise, assignTicketToExpert };

export const ticketsAPI = {
	createNewTicket,
	getMessages,
	getTickets,
	sendMessage,
	getTicketHistory,
	changeTicketStatus,
	changeTicketPriority,
};
