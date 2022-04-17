import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

import { paypalOptions } from "./paypal.js";
import checkoutStore from "../../store/checkoutStore.js";
import discountStore from "../../store/discountStore.js";

const PaypalCheckout = ({ products }) => {
  const { createOrder, cancelOrder, approveOrder } = checkoutStore();
  const navigate = useNavigate();

  const handleClick = async (data, actions) => {
    if (!Boolean(products.length)) return actions.reject();
    const discount = discountStore.getState().discountCart;
    return createOrder({ products, discount }, actions);
  }

  const handleOrder = async () => {
    return checkoutStore.getState().orderId;
  };

  const handleApprove = async (data, actions) => {
    const approve = await approveOrder(data['orderID'], actions);
    if (!approve) return;
    navigate("/cart", { redirect: true, state: { approve } });
  }

  const handleShipping = (data, actions) => {
    if (data.shipping_address.country_code !== 'FR') return actions.reject();
    return actions.resolve();
  }
  const handleCancel = (data) => {
    return cancelOrder(data['orderID']);
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          tagline: false
        }}
        onClick={handleClick}
        createOrder={handleOrder}
        onApprove={handleApprove}
        onShippingChange={handleShipping}
        onCancel={handleCancel}
        disabled={!Boolean(products.length)}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;