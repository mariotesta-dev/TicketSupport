import Switch from "../utils/switchUtils";
import Customer from "./Customer";
import Warranty from "./Warranty";

const PRIMARY_ITEMS = [
	{
		label: "All",
	},
];

const SECONDARY_ITEMS = [
	{
		label: "Purchased",
		roles: ["manager"],
	},
	{
		label: "Unpurchased",
		roles: ["manager"],
	},
];

const TERTIARY_ITEMS = [
	{
		label: "Active Warranty",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "Expired Warranty",
		roles: ["customer", "expert", "manager"],
	},
	{
		label: "Not activated",
		roles: ["manager"],
	},
];

export default class Product {
	constructor(ean, name, brand, warranty) {
		this.ean = ean;
		this.name = name;
		this.brand = brand;
		this.warranty = warranty;
	}

	static fromCustomer(warranty, user) {
		return new Product(
			warranty.product.ean,
			warranty.product.name,
			warranty.product.brand,
			new Warranty(
				warranty.id,
				user
					? new Customer(user.id, user.email, user.name, user.surname)
					: null,
				warranty.dateOfPurchase,
				warranty.endOfWarranty
			)
		);
	}

	static fromManager(product) {
		return new Product(
			product.ean,
			product.name,
			product.brand,
			product.warranty
				? new Warranty(
						product.warranty.id,
						product.warranty.customer,
						product.warranty.dateOfPurchase,
						product.warranty.endOfWarranty
				  )
				: null
		);
	}

	static productsCallbacks = new Switch({
		All: (arg) => {
			return arg;
		},

		"Active Warranty": (arg) =>
			arg.filter(
				(product) =>
					product.warranty &&
					new Date(product.warranty.endOfWarranty) >= new Date()
			),

		"Expired Warranty": (arg) =>
			arg.filter(
				(product) =>
					product.warranty &&
					new Date(product.warranty.endOfWarranty) < new Date()
			),

		"Not activated": (arg) => arg.filter((product) => !product.warranty),
		Purchased: (arg) => arg.filter((product) => product.warranty),
		Unpurchased: (arg) => arg.filter((product) => !product.warranty),
	});

	static PRODUCT_ITEMS = [PRIMARY_ITEMS, SECONDARY_ITEMS, TERTIARY_ITEMS];
}
