import _axios from "axios";
import 'dotenv/config';

const { PAYPAL_ID, PAYPAL_SECRET, PAYPAL_URL } = process.env;

const axios = _axios.create({
  baseURL: PAYPAL_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const paypalCreateOrder = async (checkout, id) => {
  const invoice = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: id,
        amount: {
          value: checkout['total'] - checkout['reduction'],
          currency_code: 'EUR',
          breakdown: {
            item_total: {
              value: checkout['total'],
              currency_code: 'EUR'
            },
            discount: {
              currency_code: "EUR",
              value: checkout['reduction']
            }
          },
        },
        items: checkout['items']
      },
    ],
  };

  try {
    return await axios.post("/v2/checkout/orders?return=minimal", invoice, {
      auth: {
        'username': PAYPAL_ID,
        'password': PAYPAL_SECRET
      }
    }).then(res => res['data']);
  } catch (e) {
    throw new Error('PAYPAL_ERROR');
  }
}

export const paypalCaptureOrder = async (id) => {
  try {
    return await axios.post(`/v2/checkout/orders/${id}/capture`, {}, {
      auth: {
        'username': PAYPAL_ID,
        'password': PAYPAL_SECRET
      }
    }).then(res => res['data']);
  } catch (e) {
    const errorDetail = Array.isArray(e.response.data.details) && e.response.data.details[0];
    if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") throw new Error('INSTRUMENT_DECLINED');
    throw new Error('PAYPAL_ERROR');
  }
}

export const paypalGetOrder = async (id) => {
  try {
    return await axios.get(`/v2/checkout/orders/${id}`, {
      auth: {
        'username': PAYPAL_ID,
        'password': PAYPAL_SECRET
      }
    }).then(res => res.data);
  } catch (e) {
    throw new Error('PAYPAL_ERROR');
  }
}