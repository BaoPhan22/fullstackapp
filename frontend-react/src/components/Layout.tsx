import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Menu>
          <MenuButton as={Button}>Actions</MenuButton>
          <MenuList>
            <MenuItem as='a' href='users'>Users</MenuItem>
            <MenuItem as='a' href='cars'>Cars</MenuItem>
          </MenuList>
        </Menu>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
