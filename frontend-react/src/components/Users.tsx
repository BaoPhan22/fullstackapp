import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { CanceledError } from "../services/api-client";
import UserService, { User, initUser } from "../services/user-service";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Flex,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Spinner,
} from "@chakra-ui/react";

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(initUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = UserService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors((err as AxiosError).message);
      });
    return () => cancel();
  }, []);

  function deleteUser(user: User) {
    const originialUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    UserService.delete(user.id).catch((err) => {
      setErrors(err.message);
      setUsers(originialUsers);
    });
  }

  function handleFormSubmit() {
    user.id == 0 ? addUser() : updateUser();
  }

  function updateUser() {
    const originialUsers = [...users];
    const updatedUser = { ...user };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    UserService.update(updatedUser)
      .catch((err) => {
        setErrors(err.message);
        setUsers(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }

  function addUser() {
    const originialUsers = [...users];
    const newUser = { ...user };
    setUsers([newUser, ...users]);

    UserService.add(newUser)
      .then((res) => setUsers([res.data, ...users]))
      .catch((err) => {
        setErrors(err.message);
        setUsers(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }

  function resetUserModalInput() {
    setUser(initUser);
  }

  function editUser(user: User) {
    const editingUser = { ...user };
    setUser(editingUser);
  }

  function closeUserModal() {
    onClose();
  }

  return (
    <>
      <Container maxW="4xl" mt={5}>
        {errors && <p>{errors}</p>}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Button
              onClick={() => {
                onOpen();
                resetUserModalInput();
              }}
            >
              Add User
            </Button>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>List Users</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Phone</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.address}</Td>
                      <Td>{user.phone}</Td>
                      <Td>
                        <Flex gap="2">
                          <Button
                            onClick={() => {
                              onOpen();
                              editUser(user);
                            }}
                          >
                            Update
                          </Button>
                          <Button onClick={() => deleteUser(user)}>
                            Delete
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Phone</Th>
                    <Th>Action</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
      {/* Modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {user.id == 0 ? "Add User" : `Update User #${user.id}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleFormSubmit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal */}
    </>
  );
}
export default Users;
