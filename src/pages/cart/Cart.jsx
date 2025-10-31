import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, clearCart } from "../../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  if (cartItems?.length === 0) {
    return (
      <>
        <div className="flex justify-center items-center h-[80vh] text-gray-600">
          <p>Your cart is empty 🛒</p>
        </div>
      </>
    );
  }

  const total = cartItems?.reduce((sum, item) => sum + item?.price, 0)?.toFixed(2);

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-md transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {cartItems?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.thumbnail || item?.image}
                  alt={item?.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item?.title}</h3>
                  <p className="text-gray-600 text-sm">${item?.price}</p>
                </div>
              </div>
              <button
                onClick={() => dispatch(deleteFromCart(item?.id))}
                className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right text-lg font-semibold text-gray-800">
          Total: ${total}
        </div>
      </div>
    </>
  );
};

export default Cart;
