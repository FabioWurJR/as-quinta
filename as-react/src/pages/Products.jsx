import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Header from "../components/Header";

const Products = () => {
    const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: "",
        brand: "",
        price: "",
        stock: "",
        image: "",
    });
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            updateProduct(editingProduct.id, productForm);
        } else {
            createProduct({
                ...productForm,
                price: parseFloat(productForm.price),
                stock: parseInt(productForm.stock),
            });
        }
        setProductForm({ name: "", brand: "", price: "", stock: "", image: "" });
        setEditingProduct(null);
        setShowForm(false);
    };

    const handleEdit = (product, e) => {
        e.stopPropagation();
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            brand: product.brand,
            price: product.price,
            stock: product.stock,
            image: product.image,
        });
        setShowForm(true);
    };

    const handleDelete = (productId, e) => {
        e.stopPropagation();
        deleteProduct(productId);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setProductForm({ name: "", brand: "", price: "", stock: "", image: "" });
        setShowForm(false);
    };

    const handleProductClick = (productId) => {
        navigate(`/product-details/${productId}`);
    };

    if (loading) return <p className="text-center text-gray-600">Carregando produtos...</p>;
    if (error) return <p className="text-center text-red-500">Erro: {error}</p>;

    return (
        <div className="bg-white min-h-screen">
            < Header />
            <div className="p-5">
                <div className="flex py-10 justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 text-white bg-black rounded-lg text-sm"
                    >
                        Voltar
                    </button>

                    <h1 className="text-4xl font-serif font-bold text-black text-center">
                        Gerenciar Produtos
                    </h1>

                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 text-white bg-black rounded-lg text-sm"
                    >
                        {showForm ? "Cancelar" : "Adicionar Novo Produto"}
                    </button>
                </div>

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-white shadow-lg p-6 rounded-lg mb-8 border border-gray-200">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome do produto *"
                                value={productForm.name}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="brand"
                                placeholder="Marca"
                                value={productForm.brand}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Preço *"
                                value={productForm.price}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Estoque *"
                                value={productForm.stock}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="URL da imagem"
                                value={productForm.image}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg shadow-sm md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <button
                                type="submit"
                                className="px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
                            >
                                {editingProduct ? "Atualizar" : "Adicionar"}
                            </button>
                            {editingProduct && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="ml-4 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-300"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)} 
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center border border-gray-200 cursor-pointer hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-cover mb-4 rounded-lg shadow-md"
                            />
                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-md text-gray-600">{product.brand}</p>
                            <p className="text-lg font-bold text-gray-900 mt-2">R$ {product.price.toFixed(2)}</p>
                            <p className="text-md text-gray-600">Estoque: {product.stock}</p>
                            <div className="flex mt-6 space-x-4">
                                <button
                                    onClick={(e) => handleEdit(product, e)}
                                    className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={(e) => handleDelete(product.id, e)}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
