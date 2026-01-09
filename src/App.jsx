import "./index.css";
import Home from "./pages/Home";
import Navbar from "./components/ui/Navbar";
import CountryDetail from "./pages/CountryDetail";
import { Routes, Route } from "react-router-dom";
import MyTrips from "./pages/MyTrips";

function App() {
    return (
        <>
            <div className="min-h-screen bg-white">
                <Navbar />
                <Routes>
                    <Route path="/country/:code" element={<CountryDetail />} />
                    <Route path="/mytrips" element={<MyTrips />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
