import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";
import { useState, useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const { products } = useProducts();
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, [products.length]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            <Header />

            <main className="flex flex-col items-center justify-center px-4 text-center pt-10">
                <h1 className="text-5xl font-serif font-bold text-black mb-6">
                    Bem-vindo à PerfumeStore
                </h1>
                <p className="text-lg max-w-2xl text-gray-600 mb-8">
                    Onde a sofisticação encontra o aroma perfeito. Explore fragrâncias
                    cuidadosamente selecionadas para realçar sua personalidade com estilo e elegância.
                </p>
                <button
                    className="px-8 py-3 text-white bg-black hover:bg-gray-800 rounded-full text-lg tracking-wide shadow-md transition-all"
                    onClick={() => navigate("/produtos")}
                >
                    Ver Produtos
                </button>
            </main>

            <div className="relative flex justify-center mt-8">
                <div className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={products[currentIndex]?.image || "https://via.placeholder.com/600x300.png?text=Sem+Imagem"}
                        alt={products[currentIndex]?.name || "Imagem do produto"}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition duration-300"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition duration-300"
                    >
                        &#10095;
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
