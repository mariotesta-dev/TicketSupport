import * as session from "../utils/SessionUtils.js";

export class RestMethods {
	constructor(apiUrl) {
		this.apiUrl = apiUrl;
		this.jwtToken = session.getJwtToken();
		this.header = {
			"Content-type": `application/json`,
		};
		this.authHeader = {
			Authorization: `Bearer ${this.jwtToken}`,
		};
	}

	/// Performs the check over possible errors:
	/// - 401 --> Logout
	_checkResponse = async (response) => {
		//TODO: uncomment this when we have figured out how to handle 401 for login errors
		/* if (response.status === 401) {
      session.cleanSession();
      throw new Error('Unauthorized');
    } */

		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw data;
		}
	};

	_fetchWrapper = async (url, options) => {
		console.log("----------------------");
		console.log(`Fetching URL: ${url}`);
		console.log("Options:", options);

		const response = await fetch(url, options);

		console.log(`Received response: ${response.status} ${response.statusText}`);
		console.log("Response headers:", response.headers);

		return this._checkResponse(response);
	};

	_getHeader = (authenticated = false) => {
		return {
			...this.header,
			...(authenticated ? this.authHeader : {}),
		};
	};

	get = async ({ endpoint, authenticated = false, baseUrl = null }) => {
		const options = {
			method: "GET",
			headers: this._getHeader(authenticated),
		};

		const url = baseUrl ? baseUrl + endpoint : this.apiUrl + endpoint;
		return this._fetchWrapper(url, options);
	};

	post = async ({ endpoint, body, authenticated = false, baseUrl = null }) => {
		const options = {
			method: "POST",
			headers: this._getHeader(authenticated),
			body: JSON.stringify(body),
		};

		const url = baseUrl ? baseUrl + endpoint : this.apiUrl + endpoint;
		return this._fetchWrapper(url, options);
	};

	put = async ({ endpoint, body, authenticated = false, baseUrl = null }) => {
		const options = {
			method: "PUT",
			headers: this._getHeader(authenticated),
			body: JSON.stringify(body),
		};

		const url = baseUrl ? baseUrl + endpoint : this.apiUrl + endpoint;
		return this._fetchWrapper(url, options);
	};
}
