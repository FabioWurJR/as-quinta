import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DetailsProduct from "./pages/DetailsProduct";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/product-details/:productId" element={<DetailsProduct />} />
            </Routes>
        </Router>
    );
};

export default App;
