import _axios from "axios";
import 'dotenv/config';

const { PAYPAL_ID, PAYPAL_SECRET } = process.env;
let paypalToken;

const axios = _axios.create({
  baseURL: "https://api-m.sandbox.paypal.com/",
  headers: {
    "accept-language": "fr_FR"
  }
});

const auth = async () => {
  try {
    const { data } = axios.post("v1/oauth2/token", {
      "grant_type": "client_credentials"
    }, {
      headers: {
        "withCredentials": true,
        "Authorization": `Basic ${PAYPAL_ID} ${PAYPAL_SECRET}`
      }
    });
  } catch (e) {
    console.log(e)
  }
}