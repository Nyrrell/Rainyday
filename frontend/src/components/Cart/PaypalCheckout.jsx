import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { paypalOptions } from "../../services/paypal.js";
import checkoutStore from "../../store/checkoutStore.js";

const PaypalCheckout = ({ products }) => {
  const { createOrder, cancelOrder, approveOrder } = checkoutStore();

  const handleClick = async (data, actions) => {
    return createOrder(products, actions);
  }

  const handleOrder = async () => {
    return checkoutStore.getState().orderId;
  };

  const handleApprove = (data) => {
    return approveOrder(data['orderID']);
  }

  const handleShipping = (data, actions) => {
    if (data.shipping_address.country_code !== 'FR') return actions.reject();
    return actions.resolve();
  }
  const handleCancel = (data) => {
    return cancelOrder(data['orderID']);
  }
  const handleError = (error) => {
    console.log('onError', error)
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
        onError={handleError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;