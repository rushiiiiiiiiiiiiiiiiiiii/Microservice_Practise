import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import User from "./pages/User";
import ProtectedRoutes from "./pages/ProtectedRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Signin />} />

          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/createUser"
            element={
              <ProtectedRoutes>
                <CreateUser />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/user/:email"
            element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
