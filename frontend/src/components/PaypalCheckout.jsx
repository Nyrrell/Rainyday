import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import { paypalOptions } from "../services/paypal.js";

const PaypalCheckout = ({ products, total }) => {

// TODO PRIX NE CE MET PAS A JOUR
  const orderItems = products.map(p => ({
    name: p['title'],
    unit_amount: {
      value: p['price'],
      currency_code: 'EUR'
    },
    quantity: p['quantity'],
  }))

  const handleOrder = (data, actions) => {
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
        createOrder={handleOrder}
        onApprove={handleApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;