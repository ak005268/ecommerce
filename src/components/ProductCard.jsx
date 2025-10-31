import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleAddToCart = () => {
    const exists = items?.find((item) => item.id === product.id);

    if (exists) {
      toast.warning("Duplicate products are not allowed.");
    } else {
      dispatch(addToCart(product));
      toast.success(`${product.title} added to the cart successfully.`);
    }
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow hover:shadow-lg transition-all">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
      <p className="text-gray-700 font-medium mb-2">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
