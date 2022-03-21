import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { paypalOptions } from "../../services/paypal.js";
import orderStore from "../../store/orderStore.js";

const PaypalCheckout = ({ products }) => {
  const { createOrder } = orderStore();
  let checkout;

  const handleClick = async (data, actions) => {
    const getCheckout = await createOrder(products);
    if (!getCheckout) return actions.reject();
    checkout = getCheckout;
    return actions.resolve();
  }

  const handleOrder = async (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          reference_id: checkout['id'],
          amount: {
            value: checkout['total'],
            breakdown: {
              item_total: {
                value: checkout['total'],
                currency_code: 'EUR'
              }
            },
          },
          items: checkout['items']
        },
      ],
    });
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
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;