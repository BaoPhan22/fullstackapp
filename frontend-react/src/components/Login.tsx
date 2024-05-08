import {
  Alert,
  AlertIcon,
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
import useAuthStore from "../services/authStore";

const Login = () => {
  const [user, setUser] = useState<UserLogin>(initUserLogin);
  const [errors, setErrors] = useState("");
  const [notifications, setNotifications] = useState("");
  const {login} = useAuthStore();

  function handleFormSubmit() {
    userLogin();
  }

  function userLogin() {
    const userLogin = { ...user };

    console.log(userLogin);
    userLoginService("login")
      .add(userLogin)
      .then((res) => {
        console.log(res.data.user);
        localStorage.setItem("access_token", res.data.access_token);
        login(res.data.user);
        setNotifications(res.data.message);
      })
      .catch((err) => {
        setErrors(err.response.data.error || err.message);
        setUser(initUserLogin);
      });
  }
  return (
    <Container maxW="4xl" mt={5}>
      {errors && (
        <Alert status="error">
          <AlertIcon />
          {errors}
        </Alert>
      )}
      {notifications && (
        <Alert status="info">
          <AlertIcon />
          {notifications}
        </Alert>
      )}
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
      <Button mt={3} colorScheme="blue" onClick={handleFormSubmit}>
        Save
      </Button>
    </Container>
  );
};

export default Login;
