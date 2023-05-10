import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { getGameByUrlApi } from "./api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping/AddressShipping";
import Payment from "../components/Cart/Payment/Payment";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>There are no products in the cart</h2>
    </BasicLayout>
  );
}

function FullCart(props: any) {
  const { products } = props;
  const [productsData, setproductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      const productsTemp: any | [] = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setproductsData(productsTemp);
    })();
    setReloadCart(false);
  }, [reloadCart]);

  return (
    <BasicLayout className="empty-cart">
      <SummaryCart
        products={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <AddressShipping setAddress={setAddress} />
      {address && <Payment products={productsData} address={address} />}
    </BasicLayout>
  );
}
