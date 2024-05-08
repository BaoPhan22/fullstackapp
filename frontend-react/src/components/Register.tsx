import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import userLoginService, {
  initUserLogin,
  UserLogin,
} from "../services/userLogin-service";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState<UserLogin>(initUserLogin);
  const [errors, setErrors] = useState("");

  function handleFormSubmit() {
    addUserLogin();
  }

  function addUserLogin() {
    const newUserLogin = { ...user };
    
    console.log(newUserLogin);

    userLoginService('register')
      .add(newUserLogin)
      .then((res) => console.log(res))
      .catch((err) => {
        setErrors(err.message);
        setUser(initUserLogin);
      });
  }
  return (
    <Container maxW="4xl" mt={5}>
      {errors && <p>{errors}</p>}
      <FormControl mt={3}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </FormControl>
      <FormControl mt={3}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </FormControl>
      <FormControl mt={3}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </FormControl>
      <FormControl mt={3}>
        <FormLabel>Password confirmation</FormLabel>
        <Input
          type="password"
          placeholder="Password confirmation"
          value={user.password_confirmation}
          onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
        />
      </FormControl>
      <Button mt={3} colorScheme="blue" onClick={handleFormSubmit}>
        Save
      </Button>
    </Container>
  );
};

export default Register;
