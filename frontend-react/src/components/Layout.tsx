import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useAuthStore from "../services/authStore";

const Layout = () => {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    isTokenExpired: state.isTokenExpired,
    currentUser: state.currentUser,
    // checkTokenExpired: state.checkTokenExpired,
  }));
  return (
    <>
      <Menu>
        <MenuButton as={Button}>Actions</MenuButton>
        <MenuList>
          <MenuItem as="a" href="users">
            Users
          </MenuItem>
          <MenuItem as="a" href="cars">
            Cars
          </MenuItem>
          {!isLoggedIn && (
            <>
              <MenuItem as="a" href="login">
                Login
              </MenuItem>
              <MenuItem as="a" href="register">
                Register
              </MenuItem>
            </>
          )}
          {isLoggedIn && (
            <MenuItem as="a" href="myaccount">
              My Account
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      {/* {isLoggedIn ? "Welcome" : "Please Login"} */}
      {/* <br /> */}
      <Outlet />
    </>
  );
};

export default Layout;
