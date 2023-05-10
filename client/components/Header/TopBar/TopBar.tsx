import React, { useState, useEffect } from "react";
import useCart from "../../../hooks/useCart";
import {
  Grid,
  Input,
  Icon,
  Container,
  Button,
  Menu,
  Label,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [searchStr, setSearchStr] = useState("" as any);
  const { productsCart } = useCart();

  const router = useRouter();

  useEffect(() => {
    if (load) {
      router.push(`/search?query=${searchStr}`);
      setOpen(true);
    }
    setLoad(true);
  }, [searchStr]);

  return (
    <div>
      <div className="top-bar">
        <Container className="top-bar-container">
          <Icon
            {...(open ? { name: "times" } : { name: "search" })}
            className={open ? "active-times" : ""}
            onClick={() => setOpen(!open)}
          />
          <Link href="#destacados">Destacados</Link>
          <Link href="#juegos">Juegos</Link>
          <Link href="/" className="logo">
            Inspired<span>Gamer</span>
          </Link>
          <Link href="#blog">Blog</Link>
          <Link href="#contacto">Contacto</Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="blue" circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
        </Container>
      </div>
      <Input
        id="search-game"
        icon={{ name: "search" }}
        className={open ? "active topBarSearch" : "topBarSearch"}
        value={router.query.query}
        onChange={(_, data) => setSearchStr(data.value)}
      />
    </div>
  );
}
