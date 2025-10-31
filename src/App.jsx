import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import Cart from "./pages/cart/Cart";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Navbar />
      <Routes>
        <Route element={<Dashboard />} path="/home" />
        <Route element={<Dashboard />} path="/" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<p>Not found</p>} path="*" />
      </Routes>
    </>
  );
}

export default App;
