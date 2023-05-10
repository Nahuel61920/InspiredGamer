import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { Grid, Button } from "semantic-ui-react";
import {
  getAddressesApi,
  deleteAddressesApi,
} from "../../../pages/api/address";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export default function ListAddress(props: any) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const authID: any = auth;
      const response = await getAddressesApi(authID.idUser, logout);
      setAddresses(response || []);
      setReloadAddresses(false);
    })();
  }, [reloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>Not addresses</h3>
      ) : (
        <Grid>
          {map(addresses, (address: any) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props: any) {
  const { address, logout, setReloadAddresses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    const response = await deleteAddressesApi(address._id, logout);
    setLoadingDelete(true);
    if (response) {
      setReloadAddresses(true);
      toast.success("Address removed successfully");
    }
    setLoadingDelete(true);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          onClick={() => openModal(`Update: ${address.title}`, address)}
          primary
        >
          Update
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
