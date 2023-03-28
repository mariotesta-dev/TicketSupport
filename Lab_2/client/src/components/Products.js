import {useState} from "react";

import {productsAPI} from "../API";

export default function Products() {

    const [ean, setEan] = useState("");
    const [products, setProducts] = useState({});

    const handleGetAllProducts = async () => {
        try {
            const products = await productsAPI.getProducts();
            setProducts(products);
        }catch (error) {
            console.log(error)
        }
    }

    const handleGetProduct = async (e) => {
        e.preventDefault();

        try {
            const product = await productsAPI.getProduct(ean);
            setProducts([product]);
        }catch (error) {
            console.log(error)
        }
    }

    const clearProducts = () => {
        setProducts([])
    }

    return (
        <div className="products-container">
            <div className="btn-container">
                <h1>Products API</h1>
                <button className="btn" onClick={() => handleGetAllProducts()}>Show all products</button>

                <form className="input-container" onSubmit={handleGetProduct}>
                    <input value={ean} onChange={(e) => setEan(e.target.value)} type="text" placeholder="EAN" className="textbox" />
                    <button className="btn" type={"submit"}>Search</button>
                </form>
            </div>
            <div className="list-container">
                <button className="clear-btn" onClick={() => clearProducts()}>Clear</button>
                {products.length > 0 && products.map((product, index) => {
                    return <Product product={product} key={index} />
                })}
            </div>
        </div>
    );
}

function Product({product}) {
    return (
        <div className="product-container">
            <h2>{product.ean}</h2>
            <p>{product.name}</p>
            <p>{product.brand}</p>
        </div>
    )
}