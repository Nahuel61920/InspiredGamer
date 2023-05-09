import React from "react";
import { Container } from "semantic-ui-react";
import classNames from "classnames";

import Header from "../../components/Header/Header";

export default function BasicLayout(props: any) {
  const { children, className } = props;

  return (
    <Container fluid className={classNames("basic-layout", className)}>
      <Header />
      <Container className="content">{children}</Container>
    </Container>
  );
}
