import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import PrivateRoutes from "./router/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<h1>Home</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
