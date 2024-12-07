import { useState, useEffect } from "react";
import { getProducts, addProduct, updateProductById, deleteProductById } from "../data/api";

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError("Erro ao carregar os produtos.");
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (newProduct) => {
        try {
            const addedProduct = await addProduct(newProduct);
            setProducts((prev) => [...prev, addedProduct]);
        } catch (err) {
            setError("Erro ao adicionar produto.");
        }
    };

    const updateProduct = async (id, updatedProduct) => {
        try {
            const updated = await updateProductById(id, updatedProduct);
            setProducts((prev) =>
                prev.map((product) => (product.id === id ? updated : product))
            );
        } catch (err) {
            setError("Erro ao atualizar produto.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteProductById(id);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            setError("Erro ao excluir produto.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, createProduct, updateProduct, deleteProduct };
};

export default useProducts;
