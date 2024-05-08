import useAuthStore from "../services/authStore";
import {
  Button,
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const Myaccount = () => {
  const { logout } = useAuthStore();
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));
  console.log(currentUser);

  // useEffect(() => {
  //   console.log(currentUser);
  // }, []);

  function handleLogout() {
    logout();
    console.log(currentUser);
  }

  return (
    <div>
      <Container maxW="4xl" mt={5}>
        {currentUser && (
          <TableContainer>
            <Table variant="simple">
              <TableCaption>My Accounnt</TableCaption>
              <Thead>
                <Tr>
                  <Th>Email</Th>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{currentUser.email}</Td>
                  <Td>{currentUser.name}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
    </div>
  );
};

export default Myaccount;
