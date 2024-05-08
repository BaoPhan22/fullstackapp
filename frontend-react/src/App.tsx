// import "./App.css";
import Cars from "./components/Cars";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Myaccount from "./components/Myaccount";
import Register from "./components/Register";
import Users from "./components/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="cars" element={<Cars />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="myaccount" element={<Myaccount />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
