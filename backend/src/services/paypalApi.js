import _axios from "axios";
import 'dotenv/config';

const { PAYPAL_ID, PAYPAL_SECRET, PAYPAL_URL } = process.env;

const axios = _axios.create({
  baseURL: PAYPAL_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

  //
  // auth = async () => {
  //   try {
  //     return this.access_token = await axios.post("v1/oauth2/token?grant_type=client_credentials", {}, {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Accept-Language': 'en_US',
  //         'content-type': 'application/x-www-form-urlencoded',
  //       },
  //       auth: {
  //         'username': this.paypal_id,
  //         'secret': this.paypal_secret
  //       }
  //     }).then(res => res['access_token']);
  //   } catch ({ response }) {
  //     console.log(response)
  //   }
  // }

  export const paypalCreateOrder = async (order) => {
    try {
      return axios.post("/v2/checkout/orders", order, {
        auth: {
          'username': PAYPAL_ID,
          'secret': PAYPAL_SECRET
        }
      });
    } catch ({ response }) {
      console.log(response)
    }
  }
  export const paypalGetOrder = async (id) => {
    try {
      return axios.get(`/v2/checkout/orders/${id}`, {
        auth: {
          'username': PAYPAL_ID,
          'password': PAYPAL_SECRET
        }
      }).then(res => res.data);
    } catch ({ response }) {
      console.log(response)
    }
  }