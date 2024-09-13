import Layout from "@/components/pages/layout";
import ProductDetails from "@/components/pages/product-details";
import ProductPage from "@/components/pages/product-page";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ProductPage />} />
          <Route path="/product-details" element={<ProductDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
