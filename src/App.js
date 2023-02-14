import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import MobilizerPage from "./pages/mobilizador/MobilizerPage";
import PrivateRoutes from "./router/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<MobilizerPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
