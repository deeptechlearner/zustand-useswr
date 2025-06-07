import { Routes, Route, Link } from "react-router-dom";
import AllCrypto from "./crypto/AllCrypto";
import {FavCrypto} from "./crypto/FavCrypto";

function AppRouter() {
  return (
    <>
      <nav className="flex justify-center space-x-4 py-4 bg-gray-100">
        <Link to="/" className="text-blue-600 hover:underline">All Crypto</Link>
        <br></br>
        <Link to="/favourites" className="text-blue-600 hover:underline">Favourites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AllCrypto />} />
        <Route path="/favourites" element={<FavCrypto />} />
      </Routes>
    </>
  );
}

export default AppRouter;
