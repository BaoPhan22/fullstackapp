// import "./App.css";
import Cars from "./components/Cars";
import Layout from "./components/Layout";
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
          </Route>
          <Route path="/member" element={<Layout />}>
            <Route path="login" element={<Cars />}></Route>
            <Route path="register" element={<Users />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
