import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesApi } from "../../../pages/api/address";
import useAuth from "../../../hooks/useAuth";

export default function AddressShipping(props: any | {}) {
  const { setAddress } = props;
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Shipping address</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            no address created{" "}
            <Link href="/account">Add your first address</Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address: any | {}) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

function Address(props: any) {
  const { address, addressActive, setAddressActive, setAddress } = props;

  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
}
