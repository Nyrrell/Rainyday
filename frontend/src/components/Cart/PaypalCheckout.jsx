import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { paypalOptions } from "../../services/paypal.js";
import orderStore from "../../store/orderStore.js";

const PaypalCheckout = ({ products }) => {
  const { createOrder, error, newOrder } = orderStore();
  const total = null
// TODO PRIX NE CE MET PAS A JOUR
  const orderItems = products.map(p => ({
    name: p['title'],
    unit_amount: {
      value: p['price'],
      currency_code: 'EUR'
    },
    quantity: p['quantity'],
  }))

  const handleClick = async (data, actions) => {
    const isValidCheckout = await createOrder(products);
    if (isValidCheckout) return actions.resolve();
    return actions.reject();
  }
  console.log(error)
  const handleOrder = async (data, actions) => {
    console.log(newOrder)
    console.log(data)
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
            breakdown: {
              item_total: {
                value: total,
                currency_code: 'EUR'
              }
            },
          },
          items: orderItems
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
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;