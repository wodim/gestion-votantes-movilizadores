import { Button } from "reactstrap";
import "./Mobilizer.css";
import MobilizerList from "./MobilizerList";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const MobilizerPage = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/");
  };
  return (
    <>
      <MobilizerList />
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <Button className="btn btn-danger mt-5" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default MobilizerPage;
