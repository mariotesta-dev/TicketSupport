export default class Switch {
	constructor(callbacks = {}) {
		this.callbacks = callbacks;
	}

	// create new entry with this function
	add(_case, fn) {
		this.callbacks[_case] = this.callbacks[_case] || [];
		this.callbacks[_case].push(fn);
	}

	// this function work like switch(value)
	doSwitch(value, arg) {
		if (this.callbacks[value]) {
			return this.callbacks[value](arg);
		}
	}
}
