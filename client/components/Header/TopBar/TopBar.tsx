import React, { useState, useEffect } from "react";
import { Grid, Input, Icon, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [searchStr, setSearchStr] = useState("" as any);

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
          <Icon name="cart" />
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
