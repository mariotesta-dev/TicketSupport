export default class Warranty {
	constructor(id, customer, dateOfPurchase, endOfWarranty, isActivated) {
		this.id = id;
		this.customer = customer;
		this.dateOfPurchase = dateOfPurchase;
		this.endOfWarranty = endOfWarranty;
		this.isActivated = isActivated;
	}
}
