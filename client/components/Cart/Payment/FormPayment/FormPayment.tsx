import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../pages/api/cart";

export default function FormPayment(props: any | {}) {
  const { products, address } = props;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement: any | {} = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      toast.error(result.error.message);
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );

      if (size(response) > 0) {
        toast.success("Order successfully completed");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("error when ordering");
      }
    }

    setLoading(false);
  };
  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pay
      </Button>
    </form>
  );
}
