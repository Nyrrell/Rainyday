import authStore from "../../store/authStore.js";
import { userRequest } from "../../services/requestApi.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Success = () => {
  const location = useLocation();
  console.log(location)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const { token } = authStore();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: token._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, token]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Votre commande a été créer. Le numéro de commande est ${orderId}`
        : `Votre commande est en cours de préparation`}
      <button style={{ padding: 10, marginTop: 20 }}>Retourner à l'accueil</button>
    </div>
  );
};

export default Success;
