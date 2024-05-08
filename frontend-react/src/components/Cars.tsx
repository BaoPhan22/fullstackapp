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
  Select,
} from "@chakra-ui/react";
import userService, { User } from "../services/user-service";

function Cars() {
  const [users, setUsers] = useState<User[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [car, setCar] = useState<Car>(initCar);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // useEffect(() => {
  //   console.log(car);
  // }, [car]);
  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
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

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = CarService.getAll<Car>();
    request
      .then((res) => {
        console.log(res.data);
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
    const originialCars = [...cars];
    setCars(cars.filter((u) => u.id !== car.id));

    CarService.delete(car.id).catch((err) => {
      setErrors(err.message);
      setCars(originialCars);
    });
  }

  function handleFormSubmit() {
    car.id == 0 ? addCar() : updateCar();
  }

  function updateCar() {
    const originialCars = [...cars];
    const updatedCar = { ...car };
    console.log(updatedCar);
    setCars(cars.map((u) => (u.id === car.id ? updatedCar : u)));
    CarService.update(updatedCar)
      .catch((err) => {
        setErrors(err.message);
        setCars(originialCars);
      })
      .finally(() => {
        resetCarModalInput();
        closeCarModal();
      });
  }

  function addCar() {
    const originialCars = [...cars];
    const newCar = { ...car };
    setCars([newCar, ...cars]);

    CarService.add(newCar)
      .then((res) => setCars([res.data, ...cars]))
      .catch((err) => {
        setErrors(err.message);
        setCars(originialCars);
      })
      .finally(() => {
        resetCarModalInput();
        closeCarModal();
      });
  }

  function resetCarModalInput() {
    setCar(initCar);
  }

  function editCar(car: Car) {
    const editingCar = { ...car };
    setCar(editingCar);
  }

  function closeCarModal() {
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
                resetCarModalInput();
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
                    <Th>Color</Th>
                    <Th>Year</Th>
                    <Th>User</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cars.map((car) => (
                    <Tr key={car.id}>
                      <Td>{car.name}</Td>
                      <Td>{car.color}</Td>
                      <Td>{car.year}</Td>
                      <Td>{car.user_name}</Td>
                      <Td>
                        <Flex gap="2">
                          <Button
                            onClick={() => {
                              onOpen();
                              editCar(car);
                            }}
                          >
                            Update
                          </Button>
                          <Button onClick={() => deleteCar(car)}>Delete</Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Color</Th>
                    <Th>Year</Th>
                    <Th>User</Th>
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
              <FormLabel>Color</FormLabel>
              <Input
                placeholder="Color"
                value={car.color}
                onChange={(e) => setCar({ ...car, color: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Year</FormLabel>
              <Input
                placeholder="Year"
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>User</FormLabel>
              {/* <Input
                placeholder="User"
                value={car.user_id}
                onChange={(e) => setCar({ ...car, user_id: e.target.value })}
              /> */}
              <Select
                mt={3}
                placeholder="Select User"
                onChange={(e) =>
                  setCar({
                    ...car,
                    user_id: parseInt(e.target.value),
                    user_name:
                      e.target.options[e.target.selectedIndex].innerText,
                  })
                }
                value={car.user_id}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
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
