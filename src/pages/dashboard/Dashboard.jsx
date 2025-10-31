import { useEffect, useState, useDeferredValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../hooks/useApi";
import ProductCard from "../../components/ProductCard";
import { setInitialProducts } from "../../redux/slices/cartSlice";
import { Toaster } from "sonner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { initialProducts } = useSelector((state) => state.cart);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(deferredQuery);
    }, 800);

    return () => clearTimeout(handler);
  }, [deferredQuery]);

  const shouldFetch = initialProducts.length === 0 && debouncedQuery === "";

  const apiUrl = debouncedQuery
    ? `/search?q=${debouncedQuery}`
    : shouldFetch
    ? `?limit=20`
    : null;

  const { data, loading, error } = useApi(apiUrl);

  const products = debouncedQuery
    ? data?.products
    : shouldFetch
    ? data?.products
    : initialProducts;

  useEffect(() => {
    if (shouldFetch && data?.products?.length > 0) {
      dispatch(setInitialProducts(data.products));
    }
  }, [data, dispatch, shouldFetch]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-md shadow-sm"
          />
        </div>

        {loading && <p className="text-center mt-10">Loading...</p>}
        {error && <p className="text-center mt-10 text-red-500">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.length > 0
            ? products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : !loading && (
                <p className="text-center text-gray-500 w-full mt-10">
                  No products found.
                </p>
              )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
