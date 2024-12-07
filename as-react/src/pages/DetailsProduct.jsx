import { useParams } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";
import Header from "../components/Header";

const DetailsProduct = () => {
    const { productId } = useParams();
    const { product, loading, error } = useProductDetails(productId);

    if (loading) return <p className="text-center text-gray-600">Carregando detalhes...</p>;
    if (error) return <p className="text-center text-red-500">Erro: {error}</p>;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="max-w-5xl mx-auto py-10 px-6">
                <button
                    onClick={() => window.history.back()}
                    className="mb-8 inline-flex items-center px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    &#8592; Voltar
                </button>

                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start border border-gray-200">
                    <div className="flex-shrink-0 mb-6 md:mb-0">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-80 h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-4 md:ml-8">
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <p className="text-lg text-gray-500">{product.brand}</p>
                        <p className="text-2xl font-semibold text-gray-900">
                            R$ {product.price.toFixed(2)}
                        </p>
                        <p className="text-md text-gray-600">Estoque: {product.stock}</p>
                        <p className="text-md text-gray-700 leading-relaxed">
                            {product.description || "Descrição do produto não disponível."}
                        </p>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800">Detalhes:</h3>
                            <ul className="list-disc ml-6 text-gray-600">
                                <li><strong>Categoria:</strong> {product.category}</li>
                                <li><strong>Tamanho:</strong> {product.size}</li>
                                <li>
                                    <strong>Outros tamanhos disponíveis:</strong>{" "}
                                    {Array.isArray(product.available_in_sizes) && product.available_in_sizes.length > 0
                                        ? product.available_in_sizes.join(", ")
                                        : "Não disponível"}
                                </li>
                                <li><strong>Data de lançamento:</strong> {new Date(product.launch_date).toLocaleDateString()}</li>
                                <li><strong>Avaliação:</strong> {product.rating} / 5</li>
                            </ul>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800">Notas de Fragrância:</h3>
                            <ul className="list-disc ml-6 text-gray-600">
                                {Array.isArray(product.fragrance_notes) && product.fragrance_notes.length > 0 ? (
                                    product.fragrance_notes.map((note, index) => <li key={index}>{note}</li>)
                                ) : (
                                    <li>Notas de fragrância não disponíveis.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsProduct;