import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <Link to="/" className="text-3xl font-serif font-bold text-black hover:text-gray-700">
                    PerfumeStore
                </Link>
                <nav className="flex space-x-6">
                    <Link
                        to="/"
                        className="text-lg text-gray-800 hover:text-black transition duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/produtos"
                        className="text-lg text-gray-800 hover:text-black transition duration-300"
                    >
                        Produtos
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
