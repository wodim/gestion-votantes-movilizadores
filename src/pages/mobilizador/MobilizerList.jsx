import React, { useState, useEffect } from "react";
import { Button, Card, CardBody } from "reactstrap";
import MobilizerCamera from "./MobilizerCamera";
import { axiosInstance } from "../../config/axiosInstance";
import jwtDecode from "jwt-decode";
import "./Mobilizer.css";

const MobilizerList = () => {
  const [userData, setUserData] = useState([]);
  const [movilizador, setMovilizador] = useState([]);

  const usuarios = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const user = decodedToken?.user_id; //localStorage.getItem('token');
    await axiosInstance
      .get(`users/votantes/${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const usuarioMovilizador = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const userMovilizador = decodedToken?.user_id;
    await axiosInstance
      .get(`users/${userMovilizador}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovilizador(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    usuarios();
    usuarioMovilizador();
  }, []);

  // const data = [
  //   {
  //     name: users.nombres,
  //     lastName: users.apellido,
  //     documento: users.documento,
  //     circuito: users.circuito,
  //     id: users.documento,
  //   },
  // ];

  return (
    <>
      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-3">
            <div className="titleMovilizador">MOVILIZADOR</div>
            <div className="table-responsive">
              <table className="table table-bordered border border-dark table__border">
                <thead className="border border-dark">
                  <tr className="datosMovilizador">{movilizador.nombres}</tr>
                  <tr className="datosMovilizador">{movilizador.documento}</tr>
                  <tr className="datosMovilizador">{movilizador.mesa} Mesa</tr>
                  <tr className="datosMovilizador">
                    {movilizador.escuela} Escuela
                  </tr>
                  <tr>
                    <Button>
                      <MobilizerCamera
                        documento={movilizador.documento}
                        usuarios={usuarios}
                      />
                    </Button>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div className="col">
            {userData.map((item) => {
              return (
                <>
                  <div className="col-lg-4 col-md-6 mb-3">
                    <Card className="cardMobilizer" key={item.id}>
                      <CardBody>
                        <p>
                          NOMBRE: <b>{item.nombres} </b>
                        </p>
                        <p>
                          APELLIDO: <b>{item.apellido} </b>{" "}
                        </p>
                        <p>
                          DNI: <b>{item.documento} </b>
                        </p>
                        <p>
                          Circuito: <b> {item.circuito} </b>{" "}
                        </p>
                        <p>
                          MESA: <b> {item.mesa} </b>{" "}
                        </p>
                        <p>
                          ESCUELA: <b> {item.escuela} </b>{" "}
                        </p>
                      </CardBody>
                      {item.vot_status === "true" ? (
                        <>
                          <div
                            style={{
                              backgroundColor: "blue",
                              color: "white",
                              textAlign: "center",
                              height: "50px",
                              fontSize: "30px",
                            }}
                          >
                            <p>CONFIRMADO</p>
                          </div>
                        </>
                      ) : (
                        <MobilizerCamera
                          documento={item.documento}
                          usuarios={usuarios}
                        />
                      )}
                    </Card>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilizerList;
