import { useState } from "react";

import { productsAPI } from "../API";

export default function Products() {
	const [ean, setEan] = useState("");
	const [products, setProducts] = useState({});
	const [error, setError] = useState(false);

	const handleGetAllProducts = async () => {
		try {
			const products = await productsAPI.getProducts();
			setError(false);
			setProducts(products);
		} catch (error) {
			setProducts([]);
			setError(error);
		}
	};

	const handleGetProduct = async (e) => {
		e.preventDefault();

		try {
			const product = await productsAPI.getProduct(ean);
			setError(false);
			setProducts([product]);
		} catch (error) {
			setProducts([]);
			setError(error);
		}
	};

	const clearProducts = () => {
		setProducts([]);
		setError(false);
	};

	return (
		<div className="products-container">
			<div className="btn-container">
				<h1>Products API</h1>
				<button className="btn" onClick={() => handleGetAllProducts()}>
					Show all products
				</button>

				<form className="input-container" onSubmit={handleGetProduct}>
					<input
						value={ean}
						onChange={(e) => setEan(e.target.value)}
						type="text"
						placeholder="EAN"
						className="textbox"
						required
					/>
					<button className="btn" type={"submit"}>
						Search
					</button>
				</form>
			</div>
			<div className="list-container">
				<button className="clear-btn" onClick={() => clearProducts()}>
					Clear
				</button>
				{error && <Error error={error} />}
				{products.length > 0 &&
					products.map((product, index) => {
						return <Product product={product} key={index} />;
					})}
			</div>
		</div>
	);
}

function Product({ product }) {
	return (
		<div className="product-container">
			<h2>{product.ean}</h2>
			<p>
				Name: <b>{product.name}</b>
			</p>
			<p>
				Brand: <b>{product.brand}</b>
			</p>
		</div>
	);
}

function Error({ error }) {
	const { detail, title } = error;

	return (
		<div className="error-container">
			<h2>{title}</h2>
			<p>{detail}</p>
		</div>
	);
}
