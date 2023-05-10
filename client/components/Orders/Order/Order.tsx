import React, { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import BasicModal from "../../Modal/BasicModal/BasicModal";

export default function Order(props: any | {}) {
  const { order } = props;
  const { game, totalPayment, createdAt, addressShipping } = order;
  const { title, poster, url } = game;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <Image src={`http://localhost:1337${poster.url}`} alt={title} />
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")} - {moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal(props: any | {}) {
  const { showModal, setShowModal, addressShipping, title } = props;

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se envio a la siguiente dirreccion:</h3>
      <p>{addressShipping.name}</p>
      <p>{addressShipping.address}</p>
      <p>
        {addressShipping.city}, {addressShipping.state},{" "}
        {addressShipping.postalCode}
      </p>
      <p>{addressShipping.phone}</p>
    </BasicModal>
  );
}
