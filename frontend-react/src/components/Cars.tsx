import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { CanceledError } from "../services/api-client";
import CarService, { Car, initCar } from "../services/car-service";
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

function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [car, setCar] = useState<Car>(initCar);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    console.log(car);
  }, [car]);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = CarService.getAll<Car>();
    request
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors((err as AxiosError).message);
      });
    return () => cancel();
  }, []);

  function deleteCar(car: Car) {
    const originialUsers = [...cars];
    setCars(cars.filter((u) => u.id !== car.id));

    CarService.delete(car.id).catch((err) => {
      setErrors(err.message);
      setCars(originialUsers);
    });
  }

  function handleFormSubmit() {
    car.id == 0 ? addCar() : updateCar();
  }

  function updateCar() {
    const originialUsers = [...cars];
    const updatedUser = { ...car };
    setCars(cars.map((u) => (u.id === car.id ? updatedUser : u)));
    CarService.update(updatedUser)
      .catch((err) => {
        setErrors(err.message);
        setCars(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }

  function addCar() {
    const originialUsers = [...cars];
    const newUser = { ...car };
    setCars([newUser, ...cars]);

    CarService.add(newUser)
      .then((res) => setCars([res.data, ...cars]))
      .catch((err) => {
        setErrors(err.message);
        setCars(originialUsers);
      })
      .finally(() => {
        resetUserModalInput();
        closeUserModal();
      });
  }

  function resetUserModalInput() {
    setCar(initCar);
  }

  function editUser(car: Car) {
    const editingCar = { ...car };
    setCar(editingCar);
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
              Add Car
            </Button>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>List Cars</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Address</Th>
                    <Th>Phone</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cars.map((car) => (
                    <Tr key={car.id}>
                      <Td>{car.name}</Td>
                      <Td>{car.address}</Td>
                      <Td>{car.phone}</Td>
                      <Td>
                        <Flex gap="2">
                          <Button
                            onClick={() => {
                              onOpen();
                              editUser(car);
                            }}
                          >
                            Update
                          </Button>
                          <Button onClick={() => deleteUser(car)}>
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
            {car.id == 0 ? "Add Car" : `Update Car #${car.id}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Name"
                value={car.name}
                onChange={(e) => setCar({ ...car, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Phone</FormLabel>
              <Input
                placeholder="Phone"
                value={car.phone}
                onChange={(e) => setCar({ ...car, phone: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                value={car.address}
                onChange={(e) => setCar({ ...car, address: e.target.value })}
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
export default Cars;
