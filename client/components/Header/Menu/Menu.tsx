import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Button } from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../pages/api/user";
import { getPlataformsApi } from "../../../pages/api/platform";

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Login");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlataformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatfomrs platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatfomrs(props: any) {
  const { platforms } = props;
  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform.id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
}

function MenuOptions(props: any) {
  const { onShowModal, user, logout } = props;
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              My orders
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item>
              <Icon name="heart outline" />
              Wishlist
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item>
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          My account
        </Menu.Item>
      )}
    </Menu>
  );
}
