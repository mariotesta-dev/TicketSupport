export default class Switch {
	constructor(callbacks = {}, searchConditions = []) {
		this.callbacks = callbacks;
		this.searchConditions = searchConditions;
	}

	// create new entry with this function
	add(_case, fn) {
		this.callbacks[_case] = this.callbacks[_case] || [];
		this.callbacks[_case].push(fn);
	}

	// this function work like switch(value)
	doSwitch(value, arg, searchValue) {
		if (this.callbacks[value]) {
			return this.callbacks[value](arg).filter((item) => {
				return this.searchConditions.every((f) => {
					return f(item, searchValue);
				});
			});
		}
	}
}
