export const paypalOptions = {
  "client-id": process.env.REACT_APP_PAYPAL_ID,
  currency: "EUR",
  intent: "capture",
  locale: 'fr_FR',
};