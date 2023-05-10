import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { getGameByUrlApi } from "./api/game";
import useCart from "../hooks/useCart";

export default function cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();
  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <div>There are no products in the cart</div>
    </BasicLayout>
  );
}

function FullCart(props: any) {
  const { products } = props;
  const [productsData, setproductsData] = useState(null);

  console.log(productsData);

  useEffect(() => {
    (async () => {
      const productsTemp: any | [] = [];
      for await (const product of products) {
        const data = await getGameByUrlApi(product);
        productsTemp.push(data);
      }
      setproductsData(productsTemp);
    })();
  }, []);

  return (
    <BasicLayout className="empty-cart">
      <div>Cart</div>
    </BasicLayout>
  );
}
