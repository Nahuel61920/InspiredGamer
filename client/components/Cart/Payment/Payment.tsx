import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./FormPayment/FormPayment";

const stripeToken: string | any = process.env.STRIPE_TOKEN;

const stripePrimise = loadStripe(stripeToken);

export default function Payment(props: any | {}) {
  const { products, address } = props;
  return (
    <div className="payment">
      <div className="title">Pay</div>
      <div className="data">
        <Elements stripe={stripePrimise}>
          <FormPayment products={products} address={address} />
        </Elements>
      </div>
    </div>
  );
}
