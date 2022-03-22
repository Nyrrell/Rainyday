import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { paypalOptions } from "../../services/paypal.js";
import checkoutStore from "../../store/checkoutStore.js";

const PaypalCheckout = ({ products }) => {
  const { createOrder } = checkoutStore();

  const handleClick = async (data, actions) => {
    return createOrder(products, actions);
  }

  const handleOrder = async () => {
    console.log(checkoutStore.getState().orderId)
    return checkoutStore.getState().orderId;
  };

  const handleApprove = (data, actions) => {
    console.log(data)
    return actions.order.capture().then((details) => {
      console.log(details)
    });
  }

  const handleShipping = (data, actions) => {
    if (data.shipping_address.country_code !== 'FR') return actions.reject();
    return actions.resolve();
  }
  const handleCancel = (data, actions) => {
    console.log('onCancel', data)
    console.log('onCancel', actions)
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