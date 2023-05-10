import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import { useRouter } from "next/router";
import { Icon, Button } from "semantic-ui-react";

import useAuth from "../hooks/useAuth";
import { getMeApi } from "../pages/api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal/BasicModal";
import AddressForm from "../components/Account/AddressForm/AddressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setRealoadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setRealoadUser={setRealoadUser}
      />
      <Address />
    </BasicLayout>
  );
}

function Configuration(props: any) {
  const { user, logout, setRealoadUser } = props;

  return (
    <div className="account__configuration">
      <h2 className="title">Configuration</h2>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setRealoadUser={setRealoadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setRealoadUser={setRealoadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}

function Address() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState({} as any);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const openModal = (title: string, address: any) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <h2 className="title">
        Addresses
        <Icon name="plus" link onClick={() => openModal("New Address", null)} />
      </h2>
      <div>
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
