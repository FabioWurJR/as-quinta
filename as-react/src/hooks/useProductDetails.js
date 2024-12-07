import { useState, useEffect } from "react";
import { getProducts } from "../data/api";

const useProductDetails = (productId) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const products = await getProducts();

				const foundProduct = products.find((product) => product.id === productId);

				if (foundProduct) {
					setProduct(foundProduct);
				} else {
					throw new Error("Produto não encontrado");
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [productId]);

	return { product, loading, error };
};

export default useProductDetails;
